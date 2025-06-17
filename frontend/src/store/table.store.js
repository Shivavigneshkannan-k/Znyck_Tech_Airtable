import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
    tableFormat: {
      name: "New Table",
      fields: [
        {
          name: "",
          type: "text",
          required: false,
          unique: false,
          default: "",
          min: "",
          max: ""
        }
      ]
    },
    tableField: {
      name: "",
      type: "text",
      required: false,
      unique: false,
      default: "",
      min: "",
      max: ""
    },
    fieldTypes: [
      "integer",
      "text",
      "char",
      "date",
      "boolean",
      "decimal",
      "drop down",
      "email"
    ]
  },
  reducers: {
    createNewTable: (state, action) => {
        state.tables.push(action.payload);
    }
  }
});
export const {createNewTable} = tableSlice.actions;
export default tableSlice.reducer;
