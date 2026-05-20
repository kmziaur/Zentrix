import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

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

    const shipping = cart.items.reduce((total, item) => total + item.price * item.quantity, 0) >= 10000
      ? 0
      : distanceKm <= 5
      ? 40
      : distanceKm <= 15
      ? 80
      : 60;

    const totalAmount = Math.max(cart.items.reduce((total, item) => total + item.price * item.quantity, 0) + shipping - discount, 0);

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
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const paymentUrl = `${frontendUrl}/payment/gateway?orderId=${order._id}&paymentMethod=${encodeURIComponent(paymentMethod)}`;

    return res.status(200).json({
      success: true,
      paymentUrl,
      orderId: order._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
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

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.status = "processing";
    await order.save();

    await Cart.findOneAndDelete({ userId });

    return res.status(200).json({
      success: true,
      order,
      message: "Payment confirmed.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
