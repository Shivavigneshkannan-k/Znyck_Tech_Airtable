import { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import TableInput from "../Components/TableInput";
import { useDispatch } from "react-redux";
import { addNewRow, deleteTableRow } from "../store/tableThunk";
import { updateActiveTableRows } from "../store/table.store";

const TableView = () => {
  const { fields, setActiveTab, setRow, row, activeTable } = useFormContext();
  const [format, setFormat] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const val = {};
    fields.forEach((field) => {
      val[field.name] = field.default ?? null;
    });
    if (activeTable) {
      setFormat({ tableId: activeTable?.table?._id, values: val });
    }
  }, [fields, activeTable]);

  useEffect(() => {
    if (!format?.values || !Array.isArray(row)) return;

    setRow((prev) => {
      return prev.map((r) => {
        const updatedValues = { ...r.values }; // don't discard existing values
        Object.keys(format.values).forEach((fieldName) => {
          if (!(fieldName in updatedValues)) {
            updatedValues[fieldName] = null; // add only missing fields
          }
        });
        return {
          ...r,
          values: updatedValues
        };
      });
    });
  }, [format]);

  return (
    <div className='overflow-x-auto mx-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th></th>
            {fields &&
              fields.map((field, i) => {
                return (
                  <th
                    key={field.name + i}
                    onClick={() => {
                      setActiveTab(i);
                    }}>
                    <span className='flex gap-2 items-center'>
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
                      dispatch(updateActiveTableRows({ rowId: rowData._id }));
                    }}
                    className='mt-auto cursor-pointer text-red-500 hover:text-red-700'
                  />
                </td>
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
              </tr>
            ))}
        </tbody>
      </table>
      <button
        className='btn my-2 bg-blue-600 active:bg-blue-500'
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
            dispatch(addNewRow({ tableId: activeTable?.table?._id, format }));
          }
        }}>
        New Row
      </button>
    </div>
  );
};

export default TableView;
