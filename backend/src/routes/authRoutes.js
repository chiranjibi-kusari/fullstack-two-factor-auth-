import { Router } from "express";
import passport from "passport";

import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";
const router = Router();

//registeration route
router.post("/register", register);
//login route
router.post("/login", passport.authenticate("local"), login);
//auth status route
router.get("/status", authStatus);

//logout route
router.post("/logout", logout);

//2fa route
router.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  setup2FA,
);
//Verify route
router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  verify2FA,
);

//Reset route
router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  reset2FA,
);

export default router;
