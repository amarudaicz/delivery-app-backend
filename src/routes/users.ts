import { Router } from "express";
import { getUser, updateUser } from "../controllers/users";
import { checkTokenStrict } from "../middleware/checkToken";
import { checkUserState } from "../middleware/checkUserState";

export const router = Router()


router.get('/:id?',checkTokenStrict , getUser)
router.put('/',checkTokenStrict, checkUserState, updateUser)

