import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.send("Hi");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errHandler(401, "Permission denied"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errHandler(401, "Permission denied"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie("access_token")
      .status(200)
      .json("User successfully deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errHandler(401, "Permission denied"));
  }
  try {
    const data = await Listing.find({ userRef: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
