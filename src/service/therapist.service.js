const db = require('../config/my-sql');

const getAllTherapists = async () => {
    try {
        const query = `
            SELECT t.id, t.name, a.selected_slot, a.booking_completion_time
            FROM therapists t
            LEFT JOIN appointments a ON t.id = a.therapist_id
            ORDER BY t.id, a.selected_slot;
        `;
        const [results] = await db.query(query);

        if (!results.length) {
            return {
                success: false,
                message: 'No therapists found'
            };
        }

        // Group results by therapist
        const therapists = results.reduce((acc, item) => {
            const { id, name, selected_slot, booking_completion_time } = item;
            if (!acc[id]) {
                acc[id] = { id, name, appointments: [] };
            }
            if (selected_slot && booking_completion_time) { // ensuring that only valid appointments are added
                acc[id].appointments.push({ selected_slot, booking_completion_time });
            }
            return acc;
        }, {});

        return {
            success: true,
            message: 'Therapists and booked slots found successfully!',
            data: Object.values(therapists) // Convert the object back into an array
        };
    } catch (error) {
        console.log('Error: ', error);
        return {
            success: false,
            message: 'Internal Server Error',
            error
        };
    }
}

module.exports = {
    getAllTherapists
};
