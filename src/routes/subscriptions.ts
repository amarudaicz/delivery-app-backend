import { Router } from "express";
import { postSubscription } from "../controllers/subscriptions";
const router = Router()


router.post('/', postSubscription)


export {router}