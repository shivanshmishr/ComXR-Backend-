const { AppointmentService } = require("../service");

const asyncHandler = require("../middleware/asyncHandler");

const addAppointment = asyncHandler(async (req, res) => {
    try {
        const addAppointmentResponse = await AppointmentService.addAppointment(req.body);
        return res.status(200).send(addAppointmentResponse);
    } catch (error) {
        console.error("Error while adding appointment:", error); // Log the error
        return res.status(500).send({ success: false, message: "Internal Server Error", error: error.message });
    }
});

module.exports = {
    addAppointment,
}