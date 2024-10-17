const { TherapistService} = require("../service");

const asyncHandler = require("../middleware/asyncHandler");

const getAllTherapists = asyncHandler(async (req, res) => {
    try {
        const therapists = await TherapistService.getAllTherapists();
        return res.status(200).json(therapists);
    } catch (error) {
        console.log("Error in getAllTherapists: ", error);
        return res.status(500).json(error);
    }
});

module.exports = {
    getAllTherapists,
}