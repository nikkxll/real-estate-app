import Listing from "../models/listing.model.js";
import { errHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  const newListing = new Listing(req.body);
  try {
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errHandler(404, "Listing does not exist"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errHandler(401, "Permission denied"));
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing successfully deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errHandler(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errHandler(401, "Permission denied"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
