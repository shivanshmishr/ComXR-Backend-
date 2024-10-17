const express = require('express');
const router = express.Router();

const appointment = require("./appointment.route");
const therapist = require("./therapist.route");

const defaultRoutes = [
	{
		path: '/appointment',
		route: appointment
	},
	{
		path: '/therapist',
		route: therapist
	}
];

const devRoutes = [
	// routes available only in development mode
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

if (process.env.NODE_ENV === 'development') {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;
