import express from "express";

import {
  addProductController,
  listProductController,
  removeProductController,
  singleProductController,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import authAdminMiddleware from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  authAdminMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProductController
);
productRouter.get("/list", listProductController);
productRouter.delete("/remove/:id",authAdminMiddleware, removeProductController);
productRouter.get("/single/:id", singleProductController);

export default productRouter;
