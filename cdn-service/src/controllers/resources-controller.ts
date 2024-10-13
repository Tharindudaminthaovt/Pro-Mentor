import { ImagePathNotFoundException } from "@promentor-app/shared-lib";
import { NextFunction, Request, Response } from "express"

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    
    console.debug("reserved file ", req.file)

    if (!(req.file?.path)) {
        return next(new ImagePathNotFoundException());
    };

    return res.status(201).json({
        path: `${req.file?.destination}/${req.file?.filename}`
    });
}

export {
    uploadImage
}