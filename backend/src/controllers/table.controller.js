import Table from "../models/table.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Row from "../models/row.model.js";
import { validateFields } from "../utils/Table.util.js";
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
// used to add single or multiple row
const addRows = async (req, res, next) => {
  const tableData = req.rows;
  const table = req.table;
  const tableId = req.tableId;
  const allowedFields = req.allowedFields;
  const tableFields = req.tableFields;

  let rows = [];
  // validate allowed fields and checking type of data match with field
  if (Array.isArray(tableData)) {
    tableData.forEach((row) => {
      console.log("row", row);
      validateFields(tableFields, allowedFields, row);
    });
    rows = tableData.map((row) => ({
      values: row,
      tableId: tableId
    }));
  } else {
    validateFields(tableFields, allowedFields, tableData);
    rows = { values: tableData, tableId };
  }
  console.log("row: ", rows);
  const newRow = await Row.create(rows);
  const response = new ApiResponse("Rows added successfully", newRow, 201);
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
// create,update,delete field
const createField = async (req, res, next) => {
  const { fieldData } = req.body;
  const updatedTable = await Table.findByIdAndUpdate(
    { _id: req.tableId },
    {
      $push: { fields: fieldData }
    },
    {
      new: true
    }
  );
  const response = new ApiResponse(
    "table field is successfully added",
    updatedTable,
    201
  );
  res.status(201).json(response);
};
const updateField = async (req, res, next) => {
  const { fieldData } = req.body;
  const { fieldId } = req.params;
  const updatedTable = await Table.findOneAndUpdate(
    { _id: req.tableId, "fields._id": fieldId },
    {
      $set: {
        "fields.$.name": fieldData.name,
        "fields.$.type": fieldData.type,
        "fields.$.choices": fieldData.choices || [],
        "fields.$.default": fieldData.default || null,
        "fields.$.updatedAt": new Date(),
        "fields.$.required": fieldData.required || false,
        "fields.$.unique": fieldData.unique || false
      }
    },
    {
      new: true
    }
  );
  if (!updatedTable) {
    return res.status(404).json({ success: false, message: "Field not found" });
  }
  const response = new ApiResponse(
    "table field is successfully updated",
    updatedTable,
    201
  );
  res.status(201).json(response);
};

const deleteField = async (req, res, next) => {
  const { fieldId } = req.params;
  const table = await Table.findOne({
    _id: req.tableId,
    "fields._id": fieldId
  });
  if (!table) {
    throw new ApiError("Field not found in table", 404, null);
  }

  const fieldName = table.fields.id(fieldId).name;

  const updatedField = await Table.findOneAndUpdate(
    { _id: req.tableId, "fields._id": fieldId },
    {
      $pull: { fields: { _id: fieldId } }
    },
    { new: true }
  );

  if (!updatedField) {
    throw new ApiError("Field not found", 404, null);
  }
  await Row.updateMany(
    { tableId: req.tableId },
    { $unset: { [`values.${fieldName}`]: "" } }
  );

  const updatedRows = await Row.find({ tableId: req.tableId });
  const response = new ApiResponse(
    "field is deleted successfully",
    { fields: updatedField, rows: updatedRows },
    200
  );
  res.status(200).json(response);
};

// Exporting the functions to be used in routes
export {
  createTable,
  getTables,
  getTable,
  removeRow,
  updateRow,
  addRows,
  createField,
  deleteField,
  updateField
};
