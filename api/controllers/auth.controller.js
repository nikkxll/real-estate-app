import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { errHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json("User successfully created!")
    } catch (e) {
        next(e);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const isValidUser = await User.findOne({ email });
        if (!isValidUser) {
            return next(errHandler(404, 'User not found!'))
        }
        const isValidPass = bcryptjs.compareSync(password, isValidUser.password)
        if (!isValidPass) {
            return next(errHandler(401, 'Wrong credentials!'))
        }
        const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = isValidUser._doc;
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (e) {
        next(e);
    }
}

export const google = async (req, res, next) => {
    const { email, name, photo } = req.body

    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        } else {
            const generatePass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPass = bcryptjs.hashSync(generatePass, 10);
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.random()
                .toString(36).slice(-4),
                email,
                password: hashedPass,
                photo: photo
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
    } catch (e) {
        next(e)
    }
}

export const signout = async (req, res, next) => {
    try {
        res
        .clearCookie('access_token')
        .status(200)
        .json('User has been successfully logged out')
    } catch (error) {
        next(error)
    }

}