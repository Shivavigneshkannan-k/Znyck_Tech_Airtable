import React, { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import { CirclePlus, Pencil } from "lucide-react";

const TableView = () => {
  const { fields, setActiveTab } = useFormContext();
  const [row, setRow] = useState([]);
  const [format, setFormat] = useState([]);
  useEffect(() => {
    const rowData = fields.map((field) => {
      return { name: field.name, value: "", type: field.type };
    });
    setFormat(rowData);
  }, [fields]);
  const updateRow = (e, rowIndex, fieldIndex) => {
    setRow((prev) => {
      const rows = [...prev];
      rows[rowIndex][fieldIndex] = {...rows[rowIndex][fieldIndex],value:e.target.value};
      return rows
    });
  };
  console.log(row);
  return (
    <div className='overflow-x-auto mx-4'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            {fields &&
              fields.map((field, i) => {
                return (
                  <th
                    key={field.name + i}
                    onClick={() => {
                      setActiveTab(i);
                    }}>
                    <span className='flex gap-2 items-center justify-center'>
                      {field.name || "Field " + (i + 1)} <Pencil size={15} />
                    </span>
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {row &&
            row.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {fields &&
                  fields.map((_, fieldIndex) => (
                    <th
                      className=' '
                      key={fieldIndex}>
                      <input
                        type={fields[fieldIndex].type}
                        placeholder={fields[fieldIndex].type + " value"}
                        className='input'
                        value={row[rowIndex][fieldIndex]["value"]}
                        onChange={(e)=>updateRow(e,rowIndex,fieldIndex)}
                      />
                    </th>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      <button
        className='btn'
        onClick={(e) => {
          e.preventDefault();
          setRow((prev) => [...prev, format]);
        }}>
        New Row
      </button>
    </div>
  );
};

export default TableView;
