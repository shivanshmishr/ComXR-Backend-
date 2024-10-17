const express = require('express');
const router = express.Router();

const TherapistController = require('../../controllers/therapist.controller.js');

router.get('/get-all', TherapistController.getAllTherapists);

module.exports = router;