const db = require('../config/my-sql');

const addAppointment = async (data) => {
    try {
        // Insert into `users` table
        const [addUser] = await db.query(`INSERT INTO users (name, mobile, city, pincode, address)
                                           VALUES (?, ?, ?, ?, ?)`,
            [data.name, data.mobile, data.city, data.pincode, data.address]);

        console.log('Add User Response: ', addUser);

        // Insert into `appointments` table
        const [addAppointment] = await db.query(`INSERT INTO appointments (user_id, therapist_id, booking_completion_time, selected_slot)
                                                 VALUES (?, ?, ?, ?)`,
            [addUser.insertId, data.therapistId, data.bookingCompletionTime, data.selectedSlot]);

        console.log('Add Appointment Response: ', addAppointment);

        return {
            success: true,
            message: 'User and Appointment Added Successfully!',
            data: {
                userId: addUser.insertId,
                appointmentId: addAppointment.insertId
            }
        };
    } catch (error) {
        console.error('Error: ', error);
        return {
            success: false,
            message: 'Internal Server Error',
            error
        };
    }
};

module.exports = {
    addAppointment
};
