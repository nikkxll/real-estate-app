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

export const searchListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let petsAllowed = req.query.petsAllowed;
    let type = req.query.type;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] }
    }

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] }
    }

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] }
    }

    if (petsAllowed === undefined || petsAllowed === 'false') {
      petsAllowed = { $in: [false, true] }
    }

    if (type === undefined || type === 'all') {
      type = { $in: ['rent', 'sale'] }
    }

    const listings = await Listing.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ],
      offer,
      furnished,
      parking,
      petsAllowed,
      type
    }).sort({
      [sort]: order
    }).limit(limit).skip(startIndex)

    return res.status(200).json(listings)

  } catch (error) {
    next(error)
  }
}