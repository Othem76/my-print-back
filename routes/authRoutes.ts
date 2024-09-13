import express from "express";
const router = express.Router();

import controller from "../controllers/index";

// Route pour se connecter
router.post("/login", controller.login);
// Route pour créer un utilisateur
router.post("/register", controller.register);

export default router;
