import { useFormContext } from "../context/form.context";
import { useEffect, useState } from "react";

const SingleDropDown = ({ fieldIndex, rowIndex, updateRow, row }) => {
  const { fields } = useFormContext();
  const choices = fields[fieldIndex]?.choices;
  const fieldName = fields[fieldIndex].name;
  let selectedValue = row?.values?.[fieldName] || "";
  return (
    <div className='flex gap-2'>
      <select
        className='bg-base-100 px-2 py-1 w-fit'
        value={selectedValue}
        onChange={(e) => {
          e.target.name = fields[fieldIndex].name;
          updateRow(e, rowIndex);
        }}>
        <option
          value={""}
          disabled>
          {row[rowIndex].values[fieldName] || "select option"}
        </option>
        {choices &&
          choices.map((choice, idx) => {
            return (
              <option
                key={idx}
                value={choice}>
                {choice}
              </option>
            );
          })}
      </select>
    </div>
  );
};

const MultipleDropDown = ({ fieldIndex, rowIndex, setRow, row }) => {
  const { fields } = useFormContext();
  const choices = fields[fieldIndex]?.choices;
  const fieldName = fields[fieldIndex].name;
  const selectedValues = row[rowIndex].values[fieldName]
  const [multiChoice, setMultiChoice] = useState(selectedValues||[]);
  console.log("multi",multiChoice)
  useEffect(() => {
    const fieldName = fields[fieldIndex].name;
    setRow((prev) => {
      const state = [...prev];
      const row = { ...state[rowIndex] };
      row.values = { ...row.values, [fieldName]: multiChoice };
      state[rowIndex] = row;
      return state;
    });
  }, [multiChoice]);

  const handleMultiChoice = (e) => {
    const { checked, value } = e.target;
    setMultiChoice((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  return (
    <div>
      <div className='dropdown dropdown-bottom'>
        <div>
          
        {multiChoice&& multiChoice.map(choice=><span className="text-xs bg-amber-500 m-0.5 mx-1 w-fit py-0.5 px-1 text-">{choice}</span>)}
        </div>
        <div
          tabIndex={0}
          role='button'
          className='btn m-1 border-2 border-white relative w-fit'>
          Multi Select
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content menu rounded-box z-1 bg-base-200 w-full shadow-sm absolute '>
          {choices && choices.length > 0 ? (
            choices.map((choice, idx) => {
              return (
                <p
                  className='flex gap-2 w-fit justify-center items-center my-2'
                  key={idx}>
                  <input
                    type='checkbox'
                    checked={row[rowIndex]?.values[fieldName]?.includes(choice) }
                    className='checkbox'
                    value={choice}
                    onChange={(e) => {
                      handleMultiChoice(e);
                    }}
                  />
                  {choice}
                </p>
              );
            })
          ) : (
            <p>add options</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const TableInput = ({ rowIndex, fieldIndex, row, setRow, field }) => {
  const { fields } = useFormContext();
  const updateRow = (e, rowIndex) => {
    console.log("name", e.target.name);
    console.log("value", e.target.value);
    console.log("current row", row[rowIndex]);

    setRow((prev) => {
      const state = [...prev];

      state[rowIndex].values = {
        ...state[rowIndex].values,
        [e.target.name]: e.target.value
      };
      return state;
    });
  };

  return fields &&
    ["single select", "multiple select"].includes(
      fields[fieldIndex]?.dropDown
    ) ? (
    fields[fieldIndex]?.dropDown === "single select" ? (
      <th key={fieldIndex}>
        <SingleDropDown
          fieldIndex={fieldIndex}
          rowIndex={rowIndex}
          updateRow={updateRow}
          row={row}
        />
      </th>
    ) : (
      <th key={fieldIndex}>
        <MultipleDropDown
          fieldIndex={fieldIndex}
          rowIndex={rowIndex}
          updateRow={updateRow}
          setRow={setRow}
          row={row}
        />
      </th>
    )
  ) : (
    <th
      key={fieldIndex}
      className=' w-fit p-1'>
      <input
        type={fields[fieldIndex].type}
        placeholder={fields[fieldIndex].type + " value"}
        className='outline-0 border-0 p-1'
        value={row[rowIndex].values[field?.name] || ""}
        name={fields[fieldIndex].name}
        onChange={(e) => updateRow(e, rowIndex)}
      />
    </th>
  );
};

export default TableInput;
