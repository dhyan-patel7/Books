import User from "../models/User.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";

export const getDashboardStats = async (_req, res) => {
  const [users, books, orders] = await Promise.all([
    User.countDocuments(),
    Book.countDocuments(),
    Order.find()
  ]);

  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  res.json({
    users,
    books,
    orders: orders.length,
    revenue
  });
};

export const getUsers = async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

export const getReports = async (_req, res) => {
  const orders = await Order.find();
  const byStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalOrders: orders.length,
    byStatus
  });
};
