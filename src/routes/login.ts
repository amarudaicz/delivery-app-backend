import { Router } from "express";
import { login, register, verifyToken, sendEmailToResetPassword, resetPassword} from "../controllers/login";
import { checkToken } from "../middleware/checkToken";
const router = Router()


router.post('/', login)
router.post('/register', checkToken, register)
router.post('/send_reset_password', sendEmailToResetPassword) 
router.get('/verify_token', verifyToken) 
router.post('/reset_password', resetPassword) 


export {router}