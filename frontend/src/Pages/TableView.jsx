import React, { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import TableInput from "../Components/TableInput";
import { useDispatch } from "react-redux";
import { addNewRow, deleteTableRow, updateActiveTableRows } from "../store/table.store";

const TableView = () => {
  const { fields, setActiveTab, setRow, row, activeTable } = useFormContext();
  const [format, setFormat] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const val = {};
    fields.forEach((field) => {
      val[field.name] = val[field.default] ?? null;
    });

    if (activeTable) {
      setFormat({ tableId: activeTable?.table?._id, values: val });
    }
  }, [fields, activeTable]);

  useEffect(() => {
    if (!row) return;
    setRow((prev) => {
      const updatedRows = prev.map((r) => {
        const updatedValues = {};
        Object.keys(format.values).forEach((fieldName) => {
          updatedValues[fieldName] = r.values[fieldName] || null;
        });
        console.log("updated", updatedValues);
        return {
          ...r,
          values: updatedValues
        };
      });
      return updatedRows;
    });
    // setRow((prev) => {
    //   const state = [...prev];
    //   while (state.length < 5) {
    //     state.push({ ...format, values: { ...format.values } });
    //   }
    //   return state;
    // });
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
                  fields.map((field, fieldIndex) => (
                    <TableInput
                      key={fieldIndex}
                      fieldIndex={fieldIndex}
                      field={field}
                      rowIndex={rowIndex}
                      row={row}
                      setRow={setRow}
                    />
                  ))}

                <td>
                  <Trash
                    size={20}
                    onClick={() => {
                      dispatch(
                        deleteTableRow({
                          tableId: activeTable?.table?._id,
                          rowId: rowData._id
                        })
                      );
                      dispatch(updateActiveTableRows({rowId:rowData._id}))
                    }}
                    className='mt-auto cursor-pointer text-red-500 hover:text-red-700'
                  />
                </td>
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
          if (activeTable) {
            console.log(format.values);
            dispatch(addNewRow({ tableId: activeTable?.table?._id, format }));
          }
          // setRow((prev) => [...prev, {...format,values:{...format.values}}]); //deep clone for reusing format
        }}>
        New Row
      </button>
    </div>
  );
};

export default TableView;
