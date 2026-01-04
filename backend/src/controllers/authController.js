import bcrypt, { hashSync } from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashPassword,
      isMfaActive: false,
    });
    console.log("new user", newUser);
    await newUser.save();
    res.status(201).json({ message: "User register successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", messsage: error });
  }
};
export const login = async (req, res) => {
  console.log("The authenticated user is : ", req.user);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User Auth successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "unauthorized user" });
  }
};
export const logout = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "unauthorized user" });
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      //clear cookies
      res.clearCookie("Connect.sid");
      res.status(200).json({ message: "Logout successfully" });
    });
  });
};
export const setup2FA = async (req, res) => {
  try {
    console.log("The req.user is: ", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("secret object", secret);
    user.twoFactorSecret = secret.base32;
    user.isMfsActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.chiranjibi.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({ secret: secret.base32, qrCode: qrImageUrl });
  } catch (error) {
    res.status(500).json({ error: "Error setting up 2FA", messsage: error });
  }
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });
  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      "process.env.JWT_SECRET",
      { expiresIn: "1hr" }
    );
    res.status(200).json({ message: "2FA SUCESSFULLY", token: jwtToken });
  } else {
    res.status(400).json({ message: "invalid 2fa token" });
  }
};
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    res.status(200).json({ message: "2fa reset successfully" });
  } catch (error) {
    res.status(500).json({
      error: "error reseting 2Fa",
      message: error,
    });
  }
};
