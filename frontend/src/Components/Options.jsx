import { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import AddOptions, { AddOptionButton } from "./AddOptions";

const Options = ({ type, index }) => {
  const { fields, setFields, setActiveTab, setRow } = useFormContext();
  const [hide, setHide] = useState(true);
  const [choice, setChoice] = useState([]);

  //filtering attributes for different type of fields
  const isDropdown = ["multiple select", "single select"].includes(
    type.toLowerCase()
  );

  useEffect(() => {
    if (fields[index].options?.choices) {
      setChoice(fields[index].options.choices);
    }
  }, []);
  // setting attributes for the field
  useEffect(() => {
    setFields((prev) => {
      const state = [...prev];
      state[index] = {
        ...state[index],
        options: isDropdown ? { default: "", choices: [] } : { default: "" }
      };
      return state;
    });
  }, [type]);

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
    setActiveTab(null);
    setRow((prev)=>{
      const state = [...prev];
      console.log("state", state);
      const result = state.map((r)=>{
        return r.filter((_, i) => i !== index);
      })
      console.log("result", result);
      return result
    })
    setFields((prev) => prev.filter((_, i) => i !== index));

    
  };
  // not in use now but used in onclick of save button

  const saveField = () => {
    setFields((prev) => {
      const state = [...prev];
      state[index] = {
        ...state[index],
        options: {
          ...state[index].options,
          choices: [...choice]
        }
      };
      return state;
    });
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
        onClick={deleteField}>
        delete
      </button>
    </div>
  );
};

export default Options;
