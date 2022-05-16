import { Inventory } from "../models/inventory.model"
import { errorResponse, successResponse } from "../utils/response"

export const addItem = async (req, res) => {
    try {
        const { name, image, quantity, supplier, price, description, email } = req.body
        const item = {
            name, image, quantity, supplier, price, description, email
        }
        const data = await Inventory.create(item)
        return res.status(201).json(successResponse(data))
    } catch (err) {
        return res.status(500).json(errorResponse(err));
    }
}

export const getItems = async (req, res) => {
    try {
        let { page = 1, size = 10 } = req.query
        page = parseInt(page)
        size = parseInt(size)
        const query = {}
        const totalData = await Inventory.find().estimatedDocumentCount()
        const data = await Inventory.find(query).skip((page - 1) * size).limit(size).exec()

        const totalPage = Math.ceil(totalData / size)
        const results = {
            currentPage: page,
            totalData,
            totalPage,
            prevPage: page <= 1 ? null : page - 1,
            nextPage: page >= totalPage ? null : page + 1,
            data
        }
        return res.json(successResponse(results))
    } catch (err) {
        return res.status(500).json(errorResponse(err));
    }
}

export const getLoggedInUserItems = async (req, res) => {
    try {
        const { email } = req.decoded;
        let { page = 1, size = 10 } = req.query
        page = parseInt(page)
        size = parseInt(size)
        const query = { email }
        const totalData = await Inventory.countDocuments(query)
        const data = await Inventory.find(query).skip((page - 1) * size).limit(size).exec()

        const totalPage = Math.ceil(totalData / size)
        const results = {
            currentPage: page,
            totalPage,
            totalData,
            prevPage: page <= 1 ? null : page - 1,
            nextPage: page >= totalPage ? null : page + 1,
            data
        }
        return res.json(successResponse(results))
    } catch (err) {
        return res.status(500).json(errorResponse(err));
    }
}

export const getSingleItem = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id).exec();
        if (!item) return res.status(404).json(errorResponse("Not found"));
        return res.json(successResponse(item));
    } catch (err) {
        return res.status(500).json(errorResponse(err));
    }
}


export const updateItemStock = async (req, res) => {
    try {
        const id = req.params.id;
        const { quantity } = req.body;
        const result = await Inventory.findByIdAndUpdate(
            id,
            { $inc: { quantity: Number(quantity) } },
            { new: true }
        )
        return res.json(successResponse(result))

    } catch (err) {
        return res.status(500).json(errorResponse(err));
    }
}

export const deleteItem = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventory) return res.status(400).json(errorResponse("The item you are trying to delete is not found."));
        return res.status(204).json(successResponse("Succesfully deleted."));
    } catch (err) {
        return res.status(500).json(errorResponse(err))
    }
}