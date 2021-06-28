const User = require('../models/aspirant')
const ErrorResponse = require('../utils/errorResponse')

const register = async (req, res, next) => {
    const {
        firstname,
        lastname,
        middlename,
        email,
        state,
        party,
        position,
        password
    } = req.body;

    if(!firstname || !lastname || !party || !state || !position || !email || !password) {
        return next(new ErrorResponse("Please fill out all fields", 400));
    }

    try {
        const user = await User.create({
            firstname, lastname, middlename, email, state, party, position, password
        });
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400))
    }
    try {
        const user = await User.findOne({email}).select("+password");

        if(!user) {
            return next(new ErrorResponse("Invalid credentials", 404))
        }

        const isMatch = await user.matchPasswords(password)

        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }
        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    })
}

module.exports = {
    register,
    login
}
