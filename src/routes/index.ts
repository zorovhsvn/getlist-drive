import {
    Router,
    Request,
    Response
} from "express";
import { getlist, getinfo } from "../gapis";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.render("index");
});

router.post("/list", (req: Request, res: Response) => {
    const id = req.body.id;
    getlist(id).then((data: any) => {
        res.json({
            status: 1,
            data
        })
    }).catch(() => {
        res.json({
            status: 0
        })
    })
});

router.post("/get", (req: Request, res: Response) => {
    const id = req.body.id;
    getinfo(id).then((data: any) => {
        res.json({
            status: 1,
            data
        })
    }).catch(() => {
        res.json({
            status: 0
        })
    })
});

export default router;