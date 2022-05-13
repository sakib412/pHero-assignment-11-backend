import { Inventory } from "../models/inventory.model"
import { successResponse } from "../utils/response"

export const addItem = async (req, res) => {
    const { name, image, quantity, supplier, price, description, email } = req.body
    const item = {
        name, image, quantity, supplier, price, description, email
    }
    const data = await Inventory.create(item)
    return res.json(successResponse(data))
}

export const getItems = async (req, res) => {
    let { page = 1, size = 10 } = req.query
    page = parseInt(page)
    size = parseInt(size)
    const query = {}
    const totalData = await Inventory.find().estimatedDocumentCount()
    const data = await Inventory.find(query).skip((page - 1) * size).limit(size).exec()

    const totalPage = Math.ceil(totalData / size)
    const results = {
        currentPage: page,
        totalPage,
        prevPage: page <= 1 ? null : page - 1,
        nextPage: page >= totalPage ? null : page + 1,
        data
    }
    res.json(successResponse(results))
}