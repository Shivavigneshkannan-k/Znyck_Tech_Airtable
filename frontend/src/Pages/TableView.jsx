import React, { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import { CirclePlus, Pencil } from "lucide-react";

const TableView = () => {
  const { fields, setActiveTab } = useFormContext();
  const [row, setRow] = useState([]);
  const [format, setFormat] = useState([]);
  console.log(fields)
  useEffect(() => {
    const rowData = fields.map((field) => {
      return {
        name: field.name,
        value: "",
        type: field.type,
        fieldId: field?.fieldId
      };
    });
    setFormat(rowData);
    
    
  }, [fields]);

  useEffect(()=>{
    setRow((prev) => {
      const state = [...prev];
      const newState = state.map((rows) => {
        const rowMap = new Map();
        rows.forEach((item) => {
          rowMap.set(item.fieldId, item);
        });
        format.forEach((item) => {
          if (!rowMap.has(item.fieldId)) {
            rowMap.set(item.fieldId,item);
            
          }
        });
        return Array.from(rowMap.values());
      });
      return newState;
    });
    ;
  },[format,fields])

  const updateRow = (e, rowIndex, fieldIndex) => {
    console.log(rowIndex, fieldIndex);
    setRow((prev) => {
      const state = [...prev];
      state[rowIndex][fieldIndex] = {
        ...state[rowIndex][fieldIndex],
        value: e.target.value
      };
      return state;
    });
  };
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
                        value={row[rowIndex][fieldIndex]?.value || ""}
                        onChange={(e) => updateRow(e, rowIndex, fieldIndex)}
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
          // if (
          //   fields.some(
          //     (field) => !field.name || (field.name && field.name.trim() === "")
          //   )
          // ) {
          //   const _message =
          //     "fill all field name and its type before trying to add any data";
          //   toast.error(_message);
          //   throw new Error(_message);
          // }
          setRow((prev) => [...prev, format.map((f) => ({ ...f }))]); //deep clone for reusing format
        }}>
        New Row
      </button>
    </div>
  );
};

export default TableView;
