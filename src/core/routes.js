const { Router } = require('express');
const router = new Router();

const establishmentsController = require('./controllers/establishments');
const ordersController = require('./controllers/orders');
const couriersController = require('./controllers/couriers');

router.post('/loginEstablishment', establishmentsController.loginEstablishments);
router.post('/delivery', establishmentsController.delivery);

router.get('/orders/:establishment_id', ordersController.listOrders);
router.post('/createOrder', ordersController.createOrders);
router.delete('/deleteOrder/:id', ordersController.deleteOrders);

router.post('/loginCourier', couriersController.loginCouriers);
router.post('/createCourier', couriersController.createCouriers);
router.delete('/deleteCourier/:id', couriersController.deleteCouriers);
router.get('/listCouriers/:id', couriersController.listCouriers);

module.exports = router;