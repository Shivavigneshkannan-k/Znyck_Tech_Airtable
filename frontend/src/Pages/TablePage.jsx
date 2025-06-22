import { useEffect, useState } from "react";
import { addNewField, tableTemplate } from "../utils/Table.util.js";
import FieldTab from "../Components/FieldTab.jsx";
import { FormContext } from "../context/form.context.js";
import TableView from "./TableView.jsx";
import { Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { createNewTable } from "../store/table.store.js";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

const TablePage = () => {
  const [tableMetaData, setTableMetaData] = useState({
    name: "New Table",
    id: nanoid()
  });
  const [activeTab, setActiveTab] = useState(null);
  const dispatch = useDispatch();
  const [row, setRow] = useState([]);
  const [fields, setFields] = useState([]);
  useEffect(() => {
    if (fields.length == 0) {
      setFields((prev) => {
        return tableTemplate.map((field) => ({ ...field, fieldId: nanoid() }));
      });
    }
  }, []);

  console.log("fields", fields);
  const saveTable = () => {
    toast("successfully added");
    dispatch(createNewTable({ tableMetaData, fields, tableData: row }));
  };
  return (
    <div className='p-5 '>
      <form
        className='m-5 p-4 rounded-lg shadow-2xl relative'
        onSubmit={(e) => e.preventDefault()}>
        <div className=' flex justify-center items-center '>
          <input
            className='fieldset-legend outline-0 text-2xl text-center'
            placeholder='New Table'
            value={tableMetaData.name.toUpperCase()}
            onChange={(e) =>
              setTableMetaData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <button
            className='btn btn-active absolute right-2'
            onClick={saveTable}>
            Save
          </button>
        </div>

        {activeTab !== null && (
          <FormContext.Provider
            value={{ setActiveTab, fields, setFields, row, setRow }}>
            <FieldTab index={activeTab} />
          </FormContext.Provider>
        )}

        <div className='flex'>
          <FormContext.Provider
            value={{ setActiveTab, fields, setFields, row, setRow }}>
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
