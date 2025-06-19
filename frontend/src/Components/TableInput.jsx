import { useFormContext } from "../context/form.context";
import { useEffect, useState } from "react";

const SingleDropDown = ({ fieldIndex, rowIndex, updateRow }) => {
  const { fields } = useFormContext();
  const choices = fields[fieldIndex]?.options?.choices;
  return (
    <div className='flex gap-2'>
      <select
        className='select '
        onChange={(e) => {
          updateRow(e, rowIndex, fieldIndex);
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
  const choices = fields[fieldIndex]?.options?.choices;
  const [multiChoice, setMultiChoice] = useState([]);
  useEffect(() => {
    setRow((prev) => {
      const state = [...prev];
      state[rowIndex][fieldIndex] = {
        ...state[rowIndex][fieldIndex],
        value: [...multiChoice]
      };
      return state;
    });
    
  }, [multiChoice]);
  const handleMultiChoice = (e) => {
    const checked = e.target.checked;
    setMultiChoice((prev) => {
      const state = [...prev];
      if (checked) {
        return [...state, e.target.value];
      } else {
        return state.filter((c) => c != e.target.value);
      }
    });
  };
  return (
    <div>
      <div className='dropdown dropdown-bottom'>
        <div
          tabIndex={0}
          role='button'
          className='btn m-1 border-2 border-white relative'>
          Multi Select ⬇️
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content menu rounded-box z-1 bg-base-300 shadow-sm absolute w-fit '>
          {choices &&
            choices.map((choice, idx) => {
              return (
                <p
                  className='flex gap-2 w-fit justify-center items-center my-2 '
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
            })}
        </ul>
      </div>
    </div>
  );
};

const TableInput = ({ rowIndex, fieldIndex, row, setRow }) => {
  const { fields } = useFormContext();
  console.log(row);
  const updateRow = (e, rowIndex, fieldIndex) => {
    setRow((prev) => {
      const state = [...prev];
      state[rowIndex][fieldIndex] = {
        ...state[rowIndex][fieldIndex],
        value: e.target.value
      };
      return state;
    });
  };
  return fields &&
    ["single select", "multiple select"].includes(fields[fieldIndex]?.type) ? (
    fields[fieldIndex]?.type === "single select" ? (
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
        value={row[rowIndex][fieldIndex]?.value || ""}
        onChange={(e) => updateRow(e, rowIndex, fieldIndex)}
      />
    </th>
  );
};

export default TableInput;
