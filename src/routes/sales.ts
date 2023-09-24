import Router, { Request, Response } from 'express'
import { getSales, postSale } from '../controllers/sales'
import { checkTokenStrict } from '../middleware/checkToken'
import { checkUserState } from '../middleware/checkUserState'

 const router = Router()


router.get('/', checkTokenStrict, checkUserState, getSales)
router.post('/', postSale)

export {router}

