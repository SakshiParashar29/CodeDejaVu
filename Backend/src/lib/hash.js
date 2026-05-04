const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashKey = await bcrypt.hash(password, salt);

        return hashKey;
    } catch (error) {
        console.log('Error in hashPassword -> ', error);
    }
}

module.exports = hashPassword;