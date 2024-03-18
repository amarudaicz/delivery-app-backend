import { Router } from "express";
import { MysqlRepository } from "../orders/infraestructure/repository/mysql-repository";
import { OrderUseCase } from "../orders/aplication/orderUseCase";
import { OrderController } from "../orders/infraestructure/controllers/order-controlers";
import { checkTokenStrict } from "../middleware/checkToken";
import { checkUserState } from "../middleware/checkUserState";

const router = Router()

//INICIAR REPOSITORIO
const orderMysqlRepository = new MysqlRepository()

//INICIAR USES CASES
const orderUsesCases = new OrderUseCase(orderMysqlRepository)

//INICIAR USER CONTROLER
const orderController = new OrderController(orderUsesCases)


//RUTAS 
router.post('/', orderController.postOrder)
router.get('/all', checkTokenStrict, checkUserState, orderController.getOrdersByLocalId)
router.put('/', checkTokenStrict, checkUserState, orderController.putOrder)
router.delete('/:order_id', checkTokenStrict, checkUserState, orderController.deleteById)

export {router}