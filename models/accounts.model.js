const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const accountsSchema = new mongoose.Schema({
    username: { type: String, required: true, maxLength: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8, select: false },
    role: { type: String, default: 'user' },
    avatar: {
        url: { type: String },
        public_id: { type: String }
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date }

}, { timestamps: true });

/* Encrypt Password before saving Account */
accountsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

/* Generate JWT Token */
accountsSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY_TIME }
    );
}

/* Compare Password */
accountsSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

/* Generate Reset Password Token*/
accountsSchema.methods.getResetPasswordToken = function () {

    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash & Set as Reset Password Token
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set Token Expiry Time
    tokenExpiryTime = process.env.RESET_PASSWORD_TOKEN_EXPIRY_TIME || 10;
    this.resetPasswordExpiry = Date.now() + tokenExpiryTime * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('Account', accountsSchema);