import { Router } from "express";
import { login, registerAdmin, register} from "../controllers/login";
import { checkToken } from "../middleware/checkToken";
const router = Router()


router.post('/', login)
router.post('/register', checkToken, register)
router.post('/post-admin', registerAdmin)



export {router}