import Notification from "../models/notification.js";

export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate("sender", "fullName profilePic")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getNotifications:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUnreadCount(req, res) {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      read: false,
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error in getUnreadCount:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function markAllAsRead(req, res) {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { read: true }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error in markAllAsRead:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}