import React, { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import { CirclePlus, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import TableInput from "../Components/TableInput";

const TableView = () => {
  const { fields, setActiveTab,setRow,row } = useFormContext();
  

  const [format, setFormat] = useState([]);
  useEffect(() => {
    const rowData = fields.map((field) => {
      return {
        fieldName: field?.name,
        value: "",
        type: field.type,
        fieldId: field?.fieldId
      };
    });
    setFormat([...rowData]);
    console.log("render");
  }, [fields]);

  useEffect(() => {
    setRow((prev) => {
      const state = [...prev];
      const newState = state.map((rows) => {
        const rowMap = new Map();
        rows.forEach((item) => {
          rowMap.set(item.fieldId, item);
        });
        format.forEach((item) => {
          if (!rowMap.has(item.fieldId)) {
            rowMap.set(item.fieldId, item);
          } else {
            const existing = rowMap.get(item.fieldId);
            rowMap.set(item.fieldId, {
              ...existing,
              ...item,
              value: item.value ? item.value : existing.value
            });
          }
        });
        return Array.from(rowMap.values());
      });
      return newState;
    });
  }, [format, fields]);

  
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
                    <TableInput key={fieldIndex} fieldIndex={fieldIndex} rowIndex={rowIndex} row = {row} setRow={setRow}/>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      <button
        className='btn'
        onClick={(e) => {
          e.preventDefault();
          if (
            fields.some(
              (field) => !field.name || (field.name && field.name.trim() === "")
            )
          ) {
            const _message =
              "fill all field name and its type before trying to add any data";
            toast.error(_message);
            throw new Error(_message);
          }
          setRow((prev) => [...prev, format.map((f) => ({ ...f }))]); //deep clone for reusing format
        }}>
        New Row
      </button>
    </div>
  );
};

export default TableView;
