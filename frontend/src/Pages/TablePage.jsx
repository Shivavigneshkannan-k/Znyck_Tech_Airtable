import { useState } from "react";
import { addNewField} from "../utils/Table.util.js";
import FieldTab from "../Components/FieldTab.jsx";
import { FormContext } from "../context/form.context.js";

const TablePage = () => {
  const [tableName, setTableName] = useState("New Table");
  useState(()=>{
    console.log("rendered")
  })
  const [fields, setFields] = useState([
    {
      name: "",
      type: "text",
      required: false,
      unique: false,
      options: {}
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
          className='fieldset-legend outline-0 text-2xl text-center w-full'
          placeholder='New Table'
          value={tableName.toUpperCase()}
          onChange={(e) => setTableName(e.target.value)}
        />

        <FormContext.Provider value={{ fields, setFields }}>
          {fields &&
            fields.map((field, index) => (
              <FieldTab
                key={index}
                field={field}
                index={index}
              />
            ))}
        </FormContext.Provider>

        <button
          className='btn my-2'
          onClick={() => addNewField(fields,setFields)}>
          Add Field
        </button>
      </form>
    </div>
  );
};

export default TablePage;
