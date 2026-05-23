import Order from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const isSuperAdmin = req.user.role === "super-admin";
    let totalOrders;
    let totalProducts;
    let totalUsers;
    let totalRevenue;
    let recentOrders;

    if (isSuperAdmin) {
      totalOrders = await Order.countDocuments();
      totalProducts = await Product.countDocuments();
      totalUsers = await User.countDocuments();
      const revenueResult = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]);
      totalRevenue = revenueResult[0]?.totalRevenue || 0;
      recentOrders = await Order.find()
        .populate("user", "firstName lastName email role")
        .populate("items.productId", "productName")
        .sort({ createdAt: -1 })
        .limit(5);
    } else {
      const products = await Product.find({ userId: req.user.id }).select("_id");
      const productIds = products.map((product) => product._id);
      totalProducts = products.length;
      totalOrders = await Order.countDocuments({ "items.productId": { $in: productIds } });
      totalUsers = await Order.distinct("user", { "items.productId": { $in: productIds } }).then((users) => users.length);
      const revenueResult = await Order.aggregate([
        { $unwind: "$items" },
        { $match: { "items.productId": { $in: productIds } } },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: { $multiply: ["$items.price", "$items.quantity"] },
            },
          },
        },
      ]);
      totalRevenue = revenueResult[0]?.totalRevenue || 0;
      recentOrders = await Order.find({ "items.productId": { $in: productIds } })
        .populate("user", "firstName lastName email role")
        .populate("items.productId", "productName")
        .sort({ createdAt: -1 })
        .limit(5);
    }

    return res.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
      recentOrders,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Dashboard data fetch failed",
    });
  }
};