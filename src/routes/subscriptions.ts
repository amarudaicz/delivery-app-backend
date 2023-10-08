import { Router } from "express";
import { getSubscription, postSubscription, putSubscription } from "../controllers/subscriptions";
import { checkTokenStrict } from "../middleware/checkToken";
import { checkUserState } from "../middleware/checkUserState";
const router = Router()


router.post('/', postSubscription)
router.get('/', checkTokenStrict, checkUserState, getSubscription)
router.put('/', checkTokenStrict, checkUserState, putSubscription)


export {router}