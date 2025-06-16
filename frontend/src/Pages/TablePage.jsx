import React, { useState } from "react";
import { addNewField, handleFieldChange } from "../utils/Table.util.js";
import FieldTab from "../Components/FieldTab.jsx";

const TablePage = () => {
  const [tableName, setTableName] = useState("New Table");
  const [fields, setFields] = useState([
    {
      name: "",
      type: "text",
      options: [],
      required: false,
      unique: false
    }
  ]);
  console.log(fields);
  return (
    <div className='p-5 '>
      <button className='btn btn-primary'>Create New Table</button>
      <form
        className='m-5 p-4 w-fit rounded-lg shadow-2xl '
        onSubmit={(e) => e.preventDefault()}>
        <input
          className='fieldset-legend outline-0 text-2xl mx-auto'
          placeholder='New Table'
          value={tableName.toUpperCase()}
          onChange={(e) => setTableName(e.target.value)}
        />
        {fields &&
          fields.map((field, index) => (
            <FieldTab
              key={index}
              field={field}
              index={index}
              handleFieldChange={handleFieldChange}
              setFields={setFields}
            />
          ))}
        <button
          className='btn my-2'
          onClick={() => addNewField(setFields)}>
          Add Field
        </button>
      </form>
    </div>
  );
};

export default TablePage;
