const { Router } = require('express');
const router = new Router();

const establishmentsController = require('./controllers/establishments');
const ordersController = require('./controllers/orders');
const couriersController = require('./controllers/couriers');

router.get('/loginEstablishment', establishmentsController.loginEstablishments);
router.post('/delivery', establishmentsController.delivery);

router.get('/orders/:establishment_id', ordersController.listOrders);

router.get('/loginCourier', couriersController.loginCouriers);

module.exports = router;