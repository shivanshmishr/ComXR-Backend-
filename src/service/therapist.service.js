const db = require('../config/my-sql');

const getAllTherapists = async () => {
    try {
        const therapists = await db.query('SELECT * FROM therapists');
        console.log('Therapists: ', therapists[0]);

        if (!therapists) {
            return {
                success: false,
                message: 'No therapists found'
            };
        }

        return {
            success: true,
            message: 'Therapists found successfully!',
            data: therapists[0]
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
}