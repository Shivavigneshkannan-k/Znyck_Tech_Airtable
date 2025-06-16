
export const handleFieldChange = (e, index,setFields) => {
    const { name, type, value, checked } = e.target;
    setFields((prev) => {
      const state = [...prev];
      state[index] = {
        ...state[index],
        [name]: type === "checkbox" ? checked : value
      };
      return state;
    });
  };

export const fieldTypes = [
    "INTEGER",
    "TEXT",
    "CHAR",
    "DATE",
    "BOOLEAN",
    "DECIMAL",
    "DROP DOWN",
    "EMAIL"
  ];

export const options = {
    min: "",
    max: "",
    default: "",
  };
export const fieldTemplate = {
    name: "",
    type: "text",
    options,
    required: false,
    unique: false
  };

export const addNewField = (setFields) => {
    setFields((prev) => [...prev, fieldTemplate]);
  };

export const filterOption =(type) => Object.keys(options).filter((option) => {
      if (["email",'char','boolean'].includes(type.toLowerCase())) {
          return option==='default';
      }
      // else if (["integer", "float", "date"].includes(type.toLowerCase())) {
      //   return !["minLength", "maxLength"].includes(option);
      // } else {
      //   return !["min", "max"].includes(option);
      // }
    });