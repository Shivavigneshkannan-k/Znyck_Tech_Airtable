import Options from "./Options";
import { fieldTypes, handleFieldChange } from "../utils/Table.util";
import { useFormContext } from "../context/form.context";

const FieldTab = ({ index }) => {
  const { setFields, fields } = useFormContext();
  const field = fields[index];

  return (
    <div className=' rounded-lg p-5 top-[1/2] right-[1/2] my-2 shadow-md '>
      <div className='flex gap-4 p-4 justify-between items-center my-2'>
        <input
          type='text'
          className='fieldset-legend border-0 outline-0'
          name='name'
          value={field.name}
          onChange={(e) => {
            handleFieldChange(e, index, setFields);
          }}
          placeholder={field.name || `Field ${index + 1}`}
        />
        <div>
          {fields[index].dropDown && <p className="text-center py-1">{fields[index].dropDown} </p>}
          
          <select
            className=' border px-4 py-1 bg-base-200'
            name='type'
            value={field.type}
            defaultValue={fields[index].type}
            onChange={(e) => {
              handleFieldChange(
                e,
                index,
                setFields
              );
            }}>
            <option value={fields[index].type} disabled>{fields[index].type}</option>
            {fieldTypes &&
              fieldTypes.map((type, idx) => (
                <option
                  key={idx + type}
                  value={type}>
                  {" "}
                  {type.toUpperCase()}{" "}
                </option>
              ))}
          </select>
        </div>
        <label>
          <input
            type='checkbox'
            name='required'
            value={field.required}
            onChange={(e) => {
              handleFieldChange(
                e,
                index,
                setFields
              );
            }}
          />{" "}
          required
        </label>
        <br />
        <label>
          <input
            type='checkbox'
            name='unique'
            value={field.unique}
            onChange={(e) => {
              handleFieldChange(
                e,
                index,
                setFields
              );
            }}
          />{" "}
          unique
        </label>
        <br />
      </div>
      <Options
        index={index}
        type={field?.type}
      />
    </div>
  );
};

export default FieldTab;
