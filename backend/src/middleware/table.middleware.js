import Table from "../models/table.model.js";
import ApiError from "../utils/ApiError.js";

export const addRowMiddleware = async (req, res, next) => {
  const { tableData } = req.body;
  const { tableId } = req.params;
  const user = req.user;

  if (Array.isArray(tableData) && tableData.length === 0) {
    throw new ApiError("No rows are added", null, 400);
  }
  if (!tableId) {
    throw new ApiError("tableId is required", null, 400);
  }
  const table = await Table.findOne({ userId: user._id, _id: tableId });
  if (!table) {
    throw new ApiError("Table not found", 404, null);
  }

  const allowedFields = table.fields.map((field) => field.name);
  const fields = {};
  console.log(table.fields);
  if (table.fields && table.fields.length > 0) {
    table.fields.forEach((field) => {
      fields[field.name] = field.type;
    });
  }

  req.table = table;
  req.rows = tableData;
  req.allowedFields = allowedFields;
  req.tableFields = fields;
  req.tableId = tableId;
  next();
};

export const fieldMiddleware = async (req, res, next) => {
  const { tableId } = req.params;
  
  const user = req.user;
  if (!tableId) {
    throw new ApiError("tableId is required", null, 400);
  }
  const table = await Table.findOne({ userId: user._id, _id: tableId });
  if (!table) {
    throw new ApiError("Table not found", 404, null);
  }
  req.table = table;
  req.tableId = tableId;
  next();
};
