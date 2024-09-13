import express from "express";
import jwt from "jsonwebtoken";
import { userRoutes, authRoutes } from "./index";

const router = express.Router();

function verifyToken(req: any, res: any, next: any) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "No token provided." });
  }
  token = token.split(" ")[1];
  const salt = process.env.JWT || "secretKey";
  jwt.verify(token, salt, function (err: any, decoded: any) {
    if (err) {
      return res.status(401).send({ message: "Invalid token." });
    }
    req.userId = decoded.id;
    next();
  });
}
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to our API !",
  });
});

router.use("/auth", authRoutes);
router.use("/user", verifyToken, userRoutes);

export default router;