import express from "express";
import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
} from "../controller/notification.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, getNotifications);
router.get("/unread-count", protectedRoute, getUnreadCount);
router.patch("/mark-read", protectedRoute, markAllAsRead);

export default router;