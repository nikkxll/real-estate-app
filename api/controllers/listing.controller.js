import Listing from "../models/listing.model.js"

export const createListing = async (req, res, next) => {
    const newListing = new Listing(req.body);
    try {
        await newListing.save()
        res.status(201).json(newListing)
    } catch (error) {
        next(error);
    }
}