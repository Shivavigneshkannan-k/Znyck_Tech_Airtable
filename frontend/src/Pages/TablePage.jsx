import { useState } from "react";
import { addNewField } from "../utils/Table.util.js";
import FieldTab from "../Components/FieldTab.jsx";
import { FormContext} from "../context/form.context.js";
import TableView from "./TableView.jsx";
import { Pencil } from "lucide-react";
import {useDispatch} from "react-redux"
import { createNewTable } from "../store/table.store.js";
import toast from "react-hot-toast"

const TablePage = () => {
  const [tableName, setTableName] = useState("New Table");
  const [activeTab, setActiveTab] = useState(null);
  const dispatch = useDispatch()
  const [fields, setFields] = useState([
    {
      name: "",
      type: "text",
      required: false,
      unique: false,
      options: {}
    }
  ]);
  const saveTable = ()=>{
    toast("successfully added")
    dispatch(createNewTable({tableName,fields}));
  }
  return (
    <div className='p-5 '>
      <form
        className='m-5 p-4 rounded-lg shadow-2xl relative'
        onSubmit={(e) => e.preventDefault()}>
          <div className=" flex justify-center items-center ">

        <input
          className='fieldset-legend outline-0 text-2xl text-center'
          placeholder='New Table'
          value={tableName.toUpperCase()}
          onChange={(e) => setTableName(e.target.value)}
          />
        <Pencil className=""/>
        <button className="btn btn-active absolute right-2" onClick={saveTable}>Save</button>
          </div>

        {activeTab!==null  && (
          <FormContext.Provider value={{ setActiveTab, fields, setFields }}>
            <FieldTab index={activeTab} />
          </FormContext.Provider>
        )}

        <div className='flex'>
          <FormContext.Provider value={{ setActiveTab, fields, setFields }}>
            <TableView />
          </FormContext.Provider>

          <button
            className='btn my-2'
            onClick={() => addNewField(fields, setFields)}>
            Add Field
          </button>
        </div>
      </form>
    </div>
  );
};

export default TablePage;
