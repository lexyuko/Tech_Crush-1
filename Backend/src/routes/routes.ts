import express from "express"
import { login, logout, signup } from "../controllers/controller";
const router = express.Router();

// Example route
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;