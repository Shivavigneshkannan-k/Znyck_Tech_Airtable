import Table from "../models/table.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Row from "../models/row.model.js";
const createTable = async (req, res, next) => {
  const { name, fields } = req.body;
  const user = req.user;
  const newTable = await Table.create({
    name: name,
    fields: fields,
    userId: user._id
  });
  const response = new ApiResponse(
    "new Table is successfully created",
    newTable,
    200
  );
  res.status(201).json(response);
};

const getTables = async (req, res, next) => {
  const user = req.user;
  const tables = await Table.find({ userId: user._id });
  const response = new ApiResponse("successfully fetched tables", tables, 200);
  res.status(200).json(response);
};

const getTable = async (req, res, next) => {
  const user = req.user;
  const { tableId } = req.params;
  const tableData = await Table.findOne({ userId: user._id, _id: tableId });
  if (!tableData) {
    throw new ApiError("Table not found", 404, null);
  }
  const rows = await Row.find({ tableId: tableId });
  const response = new ApiResponse(
    "successfully fetched tables",
    { table: tableData, rows },
    200
  );
  res.status(200).json(response);
};

const addRow = async (req, res, next) => {
  const { tableId, values } = req.body;
  const user = req.user;
  if (!tableId) {
    throw new ApiError("tableId is required", null, 400);
  }
  const table = await Table.findOne({ userId: user._id, _id: tableId });
  if (!table) {
    throw new ApiError("Table not found", 404, null);
  }
  const newRow = await Row.create({ tableId, values });
  const response = new ApiResponse("Row added successfully", newRow, 201);
  res.status(201).json(response);
};

const removeRow = async (req, res, next) => {
  const { tableId, rowId } = req.params;
  const user = req.user;
  if (!tableId) {
    throw new ApiError("tableId is required", null, 400);
  }
  const table = await Table.findOne({ userId: user._id, _id: tableId });
  if (!table) {
    throw new ApiError("Table not found", 404, null);
  }
  const deletedRow = await Row.findOneAndDelete({ tableId, _id: rowId });
  const response = new ApiResponse("Row deleted successfully", deletedRow, 201);
  res.status(200).json(response);
};

const updateRow = async (req, res, next) => {
  const { tableId, rowId } = req.params;
  const { values } = req.body;
  console.log("values", values);
  const user = req.user;
  if (!tableId) {
    throw new ApiError("tableId is required", null, 400);
  }
  const table = await Table.findOne({ userId: user._id, _id: tableId });
  if (!table) {
    throw new ApiError("Table not found", 404, null);
  }
  const deletedRow = await Row.findOneAndUpdate(
    { tableId, _id: rowId },
    { $set: { values } },
    { new: true }
  );
  const response = new ApiResponse("Row updated successfully", deletedRow, 201);
  res.status(200).json(response);
};


// Exporting the functions to be used in routes
export { createTable, getTables, addRow, getTable, removeRow, updateRow };
