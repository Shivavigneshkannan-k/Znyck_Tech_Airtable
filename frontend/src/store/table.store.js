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
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "deleting field failed"
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
    },
    updateActiveTableRows: (state, action) => {
      const { rowId } = action.payload;
      console.log("rowId", rowId);
      console.log(state.activeTable.rows);
      let rows = [...state.activeTable.rows];
      rows = rows.filter((row) => {
        return row._id != rowId;
      });
      state.activeTable.rows = rows;
    },
    updateActiveTableField: (state, action) => {
      const { fieldId } = action.payload;
      const tableId = state.activeTable.table._id;
      const tableIndex = state.tables.findIndex(
        (table) => table._id === tableId
      );
      if (tableIndex === -1) return;
      const tableData = {
        ...state.tables[tableIndex],
        fields: state.tables[tableIndex].fields.filter((field) => {
          return field._id !== fieldId;
        })
      };
      state.tables[tableIndex] = tableData;
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
      state.activeTable = action.payload;
      state.error = "";
    });
    builder.addCase(getTable.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "error in fetching active tables");
    });
    builder.addCase(addNewRow.fulfilled, (state, action) => {
      state.activeTable.rows.push(action.payload);
      state.error = "";
    });
    builder.addCase(addNewRow.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "error in adding new row");
    });
    builder.addCase(deleteTableRow.fulfilled, (state) => {
      toast.success("row is deleted successfully");
      state.error = "";
    });
    builder.addCase(deleteTableRow.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "deleting row failed");
    });
    builder.addCase(deleteTableField.fulfilled, (state) => {
      toast.success("field is deleted successfully");
      state.error = "";
    });
    builder.addCase(deleteTableField.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "deleting field failed");
    });
  }
});
export const { updateTable, updateActiveTableRows, updateActiveTableField } =
  tableSlice.actions;
export default tableSlice.reducer;
export {
  createNewTable,
  getTables,
  getTable,
  addNewRow,
  deleteTableRow,
  deleteTableField
};
