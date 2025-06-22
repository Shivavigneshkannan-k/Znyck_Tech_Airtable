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

const addField = async (req,res,next) =>{
    const {tableId,fieldData} = req.body;
    const user = req.user;

    const table = await Table.findOne({_id:tableId,userId:user._id});
    if (!table) {
      throw new ApiError("Table Not Found",404);
    }
    +



}