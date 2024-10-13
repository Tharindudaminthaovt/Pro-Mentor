import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v1 as uuidv1 } from 'uuid';

const fileUploadMiddleware = (uploadPath: string) => {
    const multerInstance = multer({
        limits: {
            fileSize: 500000
        },
        storage: multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, cb) => {
                cb(null, `assets/${uploadPath}`);
            },
            filename: (req: Request, file: Express.Multer.File, cb): void => {
                let ext: string;
                if (file.mimetype === 'image/png') {
                    ext = "png";
                } else if (file.mimetype === "image/jpg") {
                    ext = "jpg";
                } else {
                    ext = "jpeg"
                };
                cb(null, `${req.currentUser ? req.currentUser.username : "" }_${uuidv1()}.${ext}`);
            }
        }),
        fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    });

    const single = multerInstance.single.bind(multerInstance);

    return {
        single
    };
};

export default fileUploadMiddleware;