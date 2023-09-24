import { Router } from "express";
import { getUser } from "../controllers/users";
import { checkTokenStrict } from "../middleware/checkToken";

export const router = Router()


router.get('/:id?',checkTokenStrict , getUser)

