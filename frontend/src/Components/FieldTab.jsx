import Options from "./Options";
import { fieldTypes, handleFieldChange} from "../utils/Table.util";
import { useFormContext } from "../context/form.context";

const FieldTab = ({index}) => {
  const {setFields,fields} = useFormContext();
  const field = fields[index];
  return (

    <div className=" rounded-lg p-5 top-[1/2] right-[1/2] my-2 shadow-md ">
      <div className='flex gap-4 p-4 justify-between items-center my-2'>

        <input type='text' className='fieldset-legend border-0 outline-0' name='name'
          onChange={(e) => { handleFieldChange(e, index, setFields)}}
          value={field.name} placeholder={`Field ${index + 1}`} />

        <select
          className=' border px-4 py-1'
          name='type'
          onChange={(e) => handleFieldChange(e, index, setFields)}>
          {fieldTypes &&
            fieldTypes.map((type, index) => (
              <option key={index} value={type}> {type.toUpperCase()} </option>
            ))
          }
        </select>

        <label >
          <input type='checkbox' name='required' value={field.required}
            onChange={(e) => handleFieldChange(e, index, setFields)}
          />{" "}
          required
        </label>
        <br />
        <label>
          <input type='checkbox' name='unique'value={field.unique}
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
