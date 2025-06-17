import { useEffect, useState } from "react";
import { useFormContext } from "../context/form.context";
import { CirclePlus, Trash } from 'lucide-react';

const Options = ({ type, index }) => {
  const { fields, setFields } = useFormContext();

  //filtering attributes for different type of fields
  let ops = {};
  const isDropdown = ["multiple select", "single select"].includes(type.toLowerCase());
  console.log(isDropdown)
  const [choice,setChoice] = useState([]);
  switch (type) {
    case isDropdown:
      ops = {
        default: "",
        choices: []
      };
      break;
    default:
      ops = { default: "" };
      break;
  }
  const addChoice = ()=>{
    setChoice(prev=>[...prev," "])
  }
  const editChoice = (e,index)=>{
    setChoice((prev)=>{
      const state = prev;
      state[index] = e.target.value;
      return state;
    })
  }
  const deleteChoice = (index)=>{
    setChoice((prev)=>{
      const state = prev.filter((c,i)=> index!=i);
      return state;
    })
  }
  // setting attributes for the field
  useEffect(() => {
    setFields((prev) => {
      const state = [...prev];
      state[index] = {
        ...state[index],
        options: ops
      };
      return state;
    });
  }, [type]);

  const [hide, setHide] = useState(true);

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

  return (
    <div className='mx-2'>
      <button
        className='btn'
        onClick={() => {
          setHide((prev) => !prev);
        }}>
        {" "}
        {hide ? "show" : "hide"}{" "}
      </button>

      <div className={`${hide ? "hidden" : ""}`}>

        {/* default value input field */}
        <div className="flex justify-between w-full items-center p-2">
          <lable>default</lable>
          <input
            type={type}
            placeholder={`${isDropdown?"text":type} value`}
            name='default'
            onChange={(e) => handleChange(e)}
            className='input-field'
          />
        </div>

        {isDropdown && <div >
          <button className="option-btn" onClick={addChoice}><CirclePlus size={15} />Add option</button>
          {choice && choice.map((c,i)=>{
              return (<div className="flex justify-start w-full items-center p-2" key={i}>
                <input type="text"  placeholder={`option ${i+1}`} onChange={(e)=>editChoice(e,i)} className="input-field"/>
                <Trash size={15} onClick={()=>{deleteChoice(i)}}/>
              </div>)
          })}
        </div>}

      </div>
    </div>
  );
};
// {fields[index].options &&
//           Object.keys(fields[index].options).map((data, key) => {
//             return (
//               <div
//                 className='flex justify-between items-center p-2'
//                 key={key}>
//                 <p className='px-2'>{data}</p>
//                 {
//                   <input
//                     type={type}
//                     placeholder={`${type} value`}
//                     name={data}
//                     value={fields[index].options[data] || ""}
//
//                     className='fieldset-legend py-1 px-2 outline-0'
//                   />
//                 }
//               </div>
//             );
//           })}
export default Options;
