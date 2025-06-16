import Options from "./Options";
import { fieldTypes} from "../utils/Table.util";

const FieldTab = ({ field, index, handleFieldChange, setFields }) => {
  return (
    <div key={index}>
      <div className='flex gap-4 p-4 justify-between items-center my-2'>
        <input
          type='text'
          className='fieldset-legend border-0 outline-0'
          name='name'
          onChange={(e) => {
            handleFieldChange(e, index, setFields);
          }}
          value={field.name}
          placeholder={`Field ${index + 1}`}
        />
        <select
          className='bg-base-200 border px-4 py-1'
          name='type'
          onChange={(e) => handleFieldChange(e, index, setFields)}>
          {fieldTypes &&
            fieldTypes.map((t, index) => (
              <option
                key={index}
                value={t.toLowerCase()}>
                {t}
              </option>
            ))}
        </select>

        <label>
          <input
            type='checkbox'
            name='required'
            value={field.required}
            onChange={(e) => handleFieldChange(e, index, setFields)}
          />{" "}
          required
        </label>
        <br />
        <label>
          <input
            type='checkbox'
            name='unique'
            value={field.unique}
            onChange={(e) => handleFieldChange(e, index, setFields)}
          />{" "}
          unique
        </label>
        <br />
      </div>
      <Options index={index} type={field?.type} />
    </div>
  );
};

export default FieldTab;
