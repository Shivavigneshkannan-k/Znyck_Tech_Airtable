import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
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
  async ({tableId}, { rejectWithValue }) => {
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


const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
    activeTable: null
  },
  reducers: {
    updateTable: (state, action) => {
      const tableData = action.payload;
      const tableIndex = tableData?.tableIndex;
      if (tableIndex != -1 && tableIndex < state.tables.length) {
        state.tables[tableIndex] = tableData;
      } else {
        state.tables.push(tableData);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createNewTable.fulfilled, (state, action) => {
      state.tables.push(action.payload);
      state.error = "";
    });
    builder.addCase(createNewTable.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "error in creating new table");
    });
    builder.addCase(getTables.fulfilled, (state, action) => {
      state.tables = action.payload;
      state.error = "";
    });
    builder.addCase(getTables.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "error in fetching all tables");
    });
    builder.addCase(getTable.fulfilled, (state, action) => {
      state.activeTable= action.payload;
      state.error = "";
    });
    builder.addCase(getTable.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "error in fetching active tables");
    });
  }
});
export const { updateTable } = tableSlice.actions;
export default tableSlice.reducer;
export { createNewTable,getTables,getTable };
