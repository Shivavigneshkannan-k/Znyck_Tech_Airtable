import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNewTable, deleteTable } from "../store/tableThunk";
import { Trash } from "lucide-react";

const ViewTables = () => {
  const tables = useSelector((store) => store.table.tables);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCreateTable = () => {
    dispatch(createNewTable());
    navigate(`/table/${tables.length}`);
  };
  return (
    <div className='p-5 flex flex-wrap gap-4'>
      <div
        className='bg-amber-300 size-1/5 rounded-md shadow-lg'
        onClick={() => {
          handleCreateTable();
        }}>
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
            className='bg-amber-300 size-1/5 rounded-md shadow-lg relative'>
            
            <div
              onClick={() => {
                navigate(`/table/${index}`);
              }}>
              <p className='w-full text-center text-lg py-1 text-black'>
                {table.name || "Untitled"}
              </p>
              <img
                src='https://res.cloudinary.com/dhsiaedxk/image/upload/v1750569515/Screenshot_2025-06-22_104138_gxswkz.png'
                className='rounded-b-md'
              />
            </div>
            <button className=' btn size-fit m-1 py-1 bg-red-500 rounded-t-md' onClick={()=>{dispatch(deleteTable({tableId:table._id}))}}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default ViewTables;
