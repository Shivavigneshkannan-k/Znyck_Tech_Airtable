import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
  },
  reducers: {
    updateTable: (state, action) => {
        const tableData = action.payload;
        const tableIndex = tableData?.tableIndex;
        if(tableIndex!=-1 && tableIndex<state.tables.length){
          state.tables[tableIndex] = tableData;
        }
        else{
          state.tables.push(tableData);
        }
    }
  }
});
export const {updateTable} = tableSlice.actions;
export default tableSlice.reducer;

// tableFormat: {
    //   name: "New Table",
    //   fields: [
    //     {
    //       name: "",
    //       type: "text",
    //       required: false,
    //       unique: false,
    //       default: "",
    //       min: "",
    //       max: ""
    //     }
    //   ]
    // },
    // tableField: {
    //   name: "",
    //   type: "text",
    //   required: false,
    //   unique: false,
    //   default: "",
    //   min: "",
    //   max: ""
    // },
    // fieldTypes: [
    //   "integer",
    //   "text",
    //   "char",
    //   "date",
    //   "boolean",
    //   "decimal",
    //   "drop down",
    //   "email"
    // ]