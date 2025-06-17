export const handleFieldChange = (e, index, setFields) => {
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
  "integer",
  "text",
  "date",
  "boolean",
  "decimal",
  "multiple select",
  "single select",
  "email"
];

export const options = {
  min: "",
  max: "",
  default: ""
};
// each fieldFormat
export const fieldFormat = {
  name: "",
  type: "text",
  required: false,
  unique: false,
  options: {}
};

// adding new field into the table
export const addNewField = (fields, setFields) => {
  setFields((prev) => {
    console.log(prev);
    return [...prev, fieldFormat];
  });
};

export const filterOption = (type) =>
  Object.keys(options).filter((option) => {
    if (["email", "char", "boolean"].includes(type.toLowerCase())) {
      return option === "default";
    }
    // else if (["integer", "float", "date"].includes(type.toLowerCase())) {
    //   return !["minLength", "maxLength"].includes(option);
    // } else {
    //   return !["min", "max"].includes(option);
    // }
  });
