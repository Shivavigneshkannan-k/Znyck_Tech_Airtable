import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNewTable } from "../store/tableThunk";

const ViewTables = () => {
  const tables = useSelector((store) => store.table.tables);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCreateTable = () => {
    dispatch(createNewTable());
    navigate(`/table/${tables.length-1}`);
  };
  return (
    <div className='p-5 flex flex-wrap gap-4'>
      <div
        className='bg-amber-300 size-1/5 rounded-md shadow-lg'
        onClick={() => {handleCreateTable()}}>
        <p className='w-full text-center text-lg py-1 text-black'>
          Create New Table
        </p>
        <img
          src='https://res.cloudinary.com/dhsiaedxk/image/upload/v1750569515/Screenshot_2025-06-22_104138_gxswkz.png'
          className='rounded-b-md'
        />
      </div>
      {tables &&
        tables.length > 0 &&
        tables.map((table, index) => (
          <div
           key={table._id}
            className='bg-amber-300 size-1/5 rounded-md shadow-lg'
            onClick={() => {
              navigate(`/table/${index}`);
            }}>
            <p className='w-full text-center text-lg py-1 text-black'>
              {/* {!table.tableMetaData.name ||
              table.tableMetaData.name.toLowerCase() === "new table"
                ? `Untitled ${index + 1}`
                : table.tableMetaData.name.toUpperCase()} */}
                {table.name || "Untitled"}
            </p>
            <img
              src='https://res.cloudinary.com/dhsiaedxk/image/upload/v1750569515/Screenshot_2025-06-22_104138_gxswkz.png'
              className='rounded-b-md'
            />
          </div>
        ))}
    </div>
  );
};

export default ViewTables;
