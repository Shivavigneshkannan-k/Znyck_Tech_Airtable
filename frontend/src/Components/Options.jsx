import { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import AddOptions, { AddOptionButton } from "./AddOptions";
import { useDispatch, useSelector } from "react-redux";
import { deleteTableField} from "../store/table.store";

const Options = ({ type, index }) => {
  const { fields, setFields, setActiveTab, setRow } = useFormContext();
  const activeTable = useSelector((store) => store.table.activeTable?.table);
  const [hide, setHide] = useState(true);
  const [choice, setChoice] = useState([]);
  const dispatch = useDispatch();
  //filtering attributes for different type of fields
  const isDropdown = ["multiple select", "single select"].includes(
    type.toLowerCase()
  );

  useEffect(() => {
    if (fields[index].choices) {
      setChoice(fields[index].choices);
    }
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFields((prev) => {
      const state = [...prev];
      state[index] = {
        ...state[index],
        options: {
          ...state[index].options,
          [name]: value
        }
      };
      return state;
    });
  };

  const deleteField = () => {
    if(activeTable!==null){
      dispatch(
        deleteTableField({
          tableId: activeTable?._id,
          fieldId: fields[index]?._id
        })
      );
      // dispatch(updateActiveTableField({ fieldId: fields[index]._id }));
    }

    // Correct default value assignment
    const val = {};
    fields.forEach((field) => {
      val[field.name] = val[field.default] ?? null;
    });

    setRow((prev) => {
      return prev.map((r) => {
        const updatedValues = {};
        Object.keys(val).forEach((fieldName) => {
          updatedValues[fieldName] = r.values[fieldName] || null;
        });
        return {
          ...r,
          values: updatedValues
        };
      });
    });
    setActiveTab(null);
  };
  // not in use now but used in onclick of save button

  const saveField = () => {
    setFields((prev) => {
      const state = [...prev];
      state[index] = {
        ...state[index],
        choices: [...choice]
      };
      return state;
    });
    console.log(fields);
    setActiveTab(null);
  };
  return (
    <div className='mx-2'>
      <button
        className='btn'
        onClick={() => {
          setHide((prev) => !prev);
        }}>
        {" "}
        {hide ? "show " : "hide"}{" "}
      </button>

      <div className={`${hide ? "hidden" : ""}`}>
        {/* default value input field */}
        <div className='flex justify-between w-full items-center p-2'>
          <p>default</p>
          <input
            type={type}
            placeholder={`default ${isDropdown ? "text" : type} value`}
            name='default'
            onChange={(e) => handleChange(e)}
            className='input-field'
          />
        </div>

        {isDropdown && (
          <div>
            <AddOptionButton setChoice={setChoice} />
            {choice &&
              choice.map((c, i) => {
                return (
                  <AddOptions
                    i={i}
                    choice={choice || []}
                    setChoice={setChoice}
                    key={i}
                  />
                );
              })}
          </div>
        )}
      </div>
      <button
        className='btn mx-2'
        onClick={() => {
          saveField();
        }}>
        Save
      </button>
      <button
        className='btn mx-2'
        onClick={()=>{deleteField()}}>
        delete
      </button>
    </div>
  );
};

export default Options;
