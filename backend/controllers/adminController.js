import Order from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

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

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    const recentOrders = await Order.find()
      .populate("user", "fullname")
      .populate("items.productId", "productName")
      .sort({ createdAt: -1 })
      .limit(5);

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