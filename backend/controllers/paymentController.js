import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod, shippingAddress, coupon, discount = 0, distanceKm = 5 } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || !cart.items.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Stripe secret key is not configured. Set STRIPE_SECRET_KEY in backend/.env.",
      });
    }

    const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal >= 10000
      ? 0
      : distanceKm <= 5
      ? 40
      : distanceKm <= 15
      ? 80
      : 60;

    const totalAmount = Math.max(subtotal + shipping - discount, 0);

    const user = await User.findById(userId);
    const customerName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Zentrix Customer";
    const customerEmail = user?.email || "no-reply@zentrix.app";

    // Create order in database
    const order = await Order.create({
      user: userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      shippingAddress: shippingAddress || "",
      paymentMethod,
      status: "pending",
      stripePaymentIntentId: null,
      stripeStatus: "pending",
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      success_url: `${frontendUrl}/#/payment/success?orderId=${order._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/#/payment?orderId=${order._id}&cancelled=true`,
      line_items: cart.items.map((item) => ({
        price_data: {
          currency: "bdt",
          product_data: {
            name: item.productId?.productName || "Product",
            description: `Quantity: ${item.quantity}`,
          },
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
        shippingAddress,
        paymentMethod,
      },
    });

    if (!session.id) {
      throw new Error("Failed to create Stripe checkout session.");
    }

    // Save Stripe session info to order
    order.stripePaymentIntentId = session.id;
    order.stripeStatus = "initiated";
    await order.save();

    return res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      orderId: order._id,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Payment session creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Payment session creation failed.",
    });
  }
};

export const getPaymentOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "items.productId",
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const { sessionId } = req.body;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.status === "processing" || order.status === "shipped" || order.status === "delivered") {
      return res.status(200).json({
        success: true,
        order,
        message: "Payment already confirmed.",
      });
    }

    // Verify session with Stripe
    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        order.status = "processing";
        order.stripeStatus = "paid";
        order.stripePaymentIntentId = session.payment_intent;
        await order.save();

        await Cart.findOneAndDelete({ userId });

        return res.status(200).json({
          success: true,
          order,
          message: "Payment confirmed.",
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "Payment not yet confirmed.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.warn("STRIPE_WEBHOOK_SECRET not configured. Webhook verification skipped.");
  }

  try {
    let event;

    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      // Fallback for development (not recommended for production)
      event = JSON.parse(req.body);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.status = "processing";
          order.stripeStatus = "completed";
          order.stripePaymentIntentId = session.payment_intent;
          order.stripeAmount = session.amount_total / 100; // Convert from cents
          order.stripeCurrency = session.currency;
          await order.save();

          await Cart.findOneAndDelete({ userId: order.user });
        }
      }
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
