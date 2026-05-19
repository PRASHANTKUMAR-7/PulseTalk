import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/",            protectRoute, getNotifications);
router.get("/unread-count",protectRoute, getUnreadCount);
router.patch("/mark-read", protectRoute, markAllAsRead);

export default router;