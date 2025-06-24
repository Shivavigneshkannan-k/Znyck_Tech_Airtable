import { useFormContext } from "../context/form.context";
import { useEffect, useState } from "react";

const SingleDropDown = ({ fieldIndex, rowIndex, updateRow }) => {
  const { fields } = useFormContext();
  const choices = fields[fieldIndex]?.choices;
  return (
    <div className='flex gap-2'>
      <select
        className='select'
        onChange={(e) => {
          e.target.name = fields[fieldIndex].name;
          updateRow(e, rowIndex);
        }}>
        <option value=''>select option</option>
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

const MultipleDropDown = ({ fieldIndex, rowIndex, setRow }) => {
  const { fields } = useFormContext();
  const choices = fields[fieldIndex]?.choices;
  const [multiChoice, setMultiChoice] = useState([]);
  useEffect(() => {
    console.log("multiple select");
    
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
        <div
          tabIndex={0}
          role='button'
          className='btn m-1 border-2 border-white relative'>
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
    <th key={fieldIndex}>
      <input
        type={fields[fieldIndex].type}
        placeholder={fields[fieldIndex].type + " value"}
        className='input'
        value={row[rowIndex].values[field?.name] || ""}
        name={fields[fieldIndex].name}
        onChange={(e) => updateRow(e, rowIndex)}
      />
    </th>
  );
};

export default TableInput;
