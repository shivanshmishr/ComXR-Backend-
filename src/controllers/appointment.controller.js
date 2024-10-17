const {AppointmentService} = require("../service");

const asyncHandler = require("../middleware/asyncHandler");

const addAppointment = asyncHandler(async (req, res) => {
    const addAppointmentResponse = await AppointmentService.addAppointment(req.body);
    return res.status(200).send(addAppointmentResponse);
});

module.exports = {
    addAppointment,
}