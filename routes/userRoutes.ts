import { Router } from "express";
const router = Router();
import controller from "../controllers/index";

router.route('/').get(controller.getUser);

export default router;
