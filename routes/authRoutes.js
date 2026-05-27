import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import { registerUser , loginUser} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login" , loginUser);

router.get("/profile", authMiddleware, (req, res) =>{
  res.json({
    message:"Protected Route Accessed",
    user:req.user
  })
})

router.get("/admin",authMiddleware,roleMiddleware("admin"),(req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);
export default router;