const express = require('express');
const router = express.Router();

const AppointmentController = require('../../controllers/appointment.controller.js');

router.post('/add', AppointmentController.addAppointment);

module.exports = router;