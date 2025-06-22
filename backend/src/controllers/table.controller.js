import Table from "../models/table.model";
import ApiResponse from "../utils/ApiResponse";
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


