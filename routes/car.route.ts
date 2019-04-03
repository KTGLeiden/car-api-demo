import express = require('express');
const router = express.Router();

// Require the controllers
import * as CarController from '../controllers/car.controller';

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', CarController.test);
router.get('/count', CarController.count);
router.get('', CarController.cars);
router.get('/:id', CarController.getCar);
router.delete('/:id', CarController.deleteCar);
router.put('/:id', CarController.updateCar);
router.post('', CarController.addCar);
module.exports = router;
