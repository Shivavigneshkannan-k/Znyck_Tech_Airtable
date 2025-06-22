import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ViewTables = () => {
  const tables = useSelector((store) => store.table.tables);
    const navigate = useNavigate();
  return (
    <div className='p-5 flex flex-wrap gap-4'>
      <div className='bg-amber-300 size-1/5 rounded-md shadow-lg' onClick={()=>{navigate(`/table/${-1}`)}}>
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
          <div className='bg-amber-300 size-1/5 rounded-md shadow-lg' onClick={()=>{navigate(`/table/${index}`)}}>
            <p className='w-full text-center text-lg py-1 text-black'>
              {(!table.tableMetaData.name || table.tableMetaData.name.toLowerCase() === "new table")
                ? `Untitled ${index + 1}`
                : table.tableMetaData.name.toUpperCase()}
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
