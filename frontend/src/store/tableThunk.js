import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const tableTemp = {
  name: "untitled",
  fields: [
    {
      name: "Name",
      type: "text",
      required: false,
      unique: false,
      choices: [],
      default: null
    },
    {
      name: "Note",
      type: "text",
      required: false,
      unique: false,
      choices: [],
      default: null
    },
    {
      name: "Email",
      type: "email",
      required: false,
      unique: false,
      choices: [],
      default: null
    },
    {
      name: "Status",
      type: "single select",
      required: false,
      unique: false,
      choices: ["pending", "done", "in-progress"],
      default: "pending"
    }
  ]
};
const createNewTable = createAsyncThunk(
  "table/newTable",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/table/create", tableTemp);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "failed in table creation"
      );
    }
  }
);
const getTables = createAsyncThunk(
  "table/getAllTables",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/table/get");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "fetching all tables failed"
      );
    }
  }
);
const getTable = createAsyncThunk(
  "table/getTable",
  async ({ tableId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/table/get/${tableId}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "fetching all tables failed"
      );
    }
  }
);
const addNewRow = createAsyncThunk(
  "table/addNewRow",
  async ({ tableId, format }, { rejectWithValue }) => {
    console.log(format);
    try {
      const response = await axiosInstance.post(`/table/add/rows/${tableId}`, {
        tableData: [{ ...format.values }]
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "add new row failed"
      );
    }
  }
);
const addNewField = createAsyncThunk(
  "table/addNewField",
  async ({ tableId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/table/add/field/${tableId}`, {
        fieldData: {
          name: "new Field",
          type: "string",
          default: null,
          choices: [],
          unique: false,
          required: false
        }
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "add new field failed"
      );
    }
  }
);
const deleteTableRow = createAsyncThunk(
  "table/deleteTableRow",
  async ({ tableId, rowId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/table/delete/row/${tableId}/${rowId}`
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "deleting row failed"
      );
    }
  }
);
const deleteTableField = createAsyncThunk(
  "table/deleteTableField",
  async ({ tableId, fieldId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/table/delete/field/${tableId}/${fieldId}`
      );
      console.log("after deletion data ", response.data.data);
      return { fieldId };
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "deleting field failed"
      );
    }
  }
);
const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async ({ tableId,}, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/table/delete/${tableId}`
      );
      return {tableId}
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "deleting table failed"
      );
    }
  }
);
const saveAll = createAsyncThunk("table/saveAll",
  async({tableId,fields,rows,tableName},{rejectWithValue})=>{
    try{
       await axiosInstance.patch(
        `/table/edit/tableName/${tableId}`,{
          tableName:tableName
        }
      );
       await axiosInstance.patch(
        `/table/edit/field/${tableId}`,{
          toUpdateFields:fields
        }
      );
       await axiosInstance.patch(
        `/table/edit/row/${tableId}`,{
          toUpdateRows:rows
        }
      );
      const response = await axiosInstance.get(`/table/get/${tableId}`);
      return response.data.data;
    }catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "deleting field failed"
      );
    }
  }
)

export {
  createNewTable,
  getTables,
  getTable,
  addNewRow,
  deleteTableRow,
  addNewField,
  deleteTableField,
  deleteTable,
  saveAll
};
