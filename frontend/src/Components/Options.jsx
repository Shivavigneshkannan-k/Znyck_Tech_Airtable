import React, { useEffect, useState } from "react";
import { options } from "../utils/Table.util";

const Options = ({ type,index }) => {
  const [attribute,setAttribute] = useState({}); 

  useEffect(()=>{
    if (["email",'char','boolean'].includes(type.toLowerCase())) {
      setAttribute({default:""});
    }
    else{
      setAttribute(options)
    }

  },[type])

  console.log(attribute);

  const [hide, setHide] = useState(true);
  const handleChange = (e)=>{
    let {name,value} = e.target
    setAttribute(prev=>({
      ...prev,[name]:value
    }))
  }
  return (
    <div className='mx-2'>
      <button
        className='btn'
        onClick={() => {
          setHide((prev) => !prev);
        }}>
        {hide ? "show" : "hide"}
      </button>
      <div className={`${hide ? "hidden" : ""}`}>
        {attribute &&
          Object.keys(attribute).map((data, index) => {
            return (
              <div
                className='flex justify-between items-center p-2'
                key={index}>
                <p className='px-2'>{data}</p>
                {
                  <input
                    type={type}
                    placeholder='value'
                    name={data}
                    value={attribute[data]||""}
                    onChange={(e)=>handleChange(e)}
                    className='fieldset-legend py-1 px-2 outline-0'
                  />
                }
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Options;
