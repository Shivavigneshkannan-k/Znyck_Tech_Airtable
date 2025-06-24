import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  createNewTable,
  getTables,
  getTable,
  addNewRow,
  deleteTableRow,
  deleteTableField,
  addNewField
} from "./tableThunk";

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
    builder.addCase(addNewField.fulfilled, (state, action) => {
      const table = action.payload
      console.log("updated table",table);
      const tableIndex = state.tables.findIndex(t => t._id === table._id);
      console.log("table Index",tableIndex);
      state.activeTable.table.fields = table.fields;
      state.tables[tableIndex].fields = table.fields;
      toast.success("new field is added successfully");
      state.error = "";
    });
    builder.addCase(addNewField.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "error in adding new field");
    });
    builder.addCase(deleteTableRow.fulfilled, (state) => {
      toast.success("row is deleted successfully");
      state.error = "";
    });
    builder.addCase(deleteTableRow.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "deleting row failed");
    });
    builder.addCase(deleteTableField.fulfilled, (state, action) => {
      const { fieldId } = action.payload;
      const tableId = state.activeTable.table._id;
      const tableIndex = state.tables.findIndex(
        (table) => table._id === tableId
      );
      const updatedFields = state.tables[tableIndex].fields.filter((field) => {
        return field._id !== fieldId;
      });
      state.activeTable.table.fields = updatedFields;
      state.tables[tableIndex].fields = updatedFields;
      state.error = "";
      toast.success("field is deleted successfully");
    });
    builder.addCase(deleteTableField.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "deleting field failed");
    });
  }
});

export const { updateTable, updateActiveTableRows } = tableSlice.actions;
export default tableSlice.reducer;
