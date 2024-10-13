import { Router } from "express";
import { requireAuthMiddleware } from "@promentor-app/shared-lib";

import fileUploadMiddleware from "../middleware/file-upload-middleware";

import { uploadImage } from "../controllers/resources-controller";

const router = Router();

router.use(requireAuthMiddleware);

router.post(
    "/profile",
    fileUploadMiddleware("profile").single("image"),
    uploadImage
);

router.post(
    "/post",
    fileUploadMiddleware("post").single("image"),
    uploadImage
);

export default router;
