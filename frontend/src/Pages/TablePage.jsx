import { useEffect, useState } from "react";
import FieldTab from "../Components/FieldTab.jsx";
import { FormContext } from "../context/form.context.js";
import TableView from "./TableView.jsx";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { getTable, addNewField, saveAll } from "../store/tableThunk.js";

const TablePage = () => {
  const { tableIndex } = useParams();
  const tables = useSelector((store) => store.table.tables);
  const activeTable = useSelector((store) => store.table.activeTable);
  const [activeTab, setActiveTab] = useState(null);
  const [row, setRow] = useState([]);
  const [fields, setFields] = useState([]);
  const [tableName, setTableName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (tableIndex !== undefined && tables[tableIndex]?._id) {
      dispatch(getTable({ tableId: tables[tableIndex]._id }));
    }
  }, [dispatch, tableIndex, tables]);

  useEffect(() => {
    if (activeTable) {
      setRow(activeTable?.rows || []);
      setFields(activeTable?.table?.fields || []);
      setTableName(activeTable?.table.name || "");
    }
    
  }, [activeTable, activeTab?.table?.fields]);

  const saveTable = () => {
    dispatch(
      saveAll({ tableId: activeTable.table._id, fields, rows: row, tableName })
    );
    toast.success("Table saved successfully");
  };
  return (
    <div className='p-5 '>
      <form
        className='m-5 p-4 rounded-lg shadow-2xl relative'
        onSubmit={(e) => e.preventDefault()}>
        <div className=' flex justify-center items-center '>
          <input
            className='fieldset-legend outline-0 text-2xl text-center'
            placeholder='Table Name'
            value={tableName.toUpperCase()}
            onChange={(e) => setTableName(e.target.value)}
          />
          <button
            className='btn btn-active absolute right-2'
            onClick={() => {
              saveTable();
            }}>
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
            value={{
              setActiveTab,
              fields,
              setFields,
              row,
              setRow,
              activeTable
            }}>
            <TableView />
          </FormContext.Provider>

          <button
            className='btn my-2'
            onClick={() => {
              dispatch(addNewField({ tableId: activeTable?.table?._id }));
            }}>
            Add Field
          </button>
        </div>
      </form>
    </div>
  );
};

export default TablePage;
