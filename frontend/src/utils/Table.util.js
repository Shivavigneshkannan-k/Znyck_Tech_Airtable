import { nanoid } from "nanoid";
export const handleFieldChange = (e, index, setFields) => {
  const { name, type, value, checked } = e.target;
  setFields((prev) => {
    const state = [...prev];
    if (
      name === "type" &&
      ["multiple select", "single select"].includes(value)
    ) {
      state[index] = state[index] = {
        ...state[index],
        [name]: "string",
        dropDown: value
      };
    } else {
      state[index] = {
        ...state[index],
        [name]: type === "checkbox" ? checked : value,
        dropDown: null
      };
    }
    return state;
  });
};

export const fieldTypes = [
  "text",
  "integer",
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
  fieldId: nanoid(),
  options: {}
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

export const tableTemplate = [
  {
    name: "Name",
    type: "text",
    required: false,
    unique: false,
    options: {}
  },
  {
    name: "Note",
    type: "text",
    required: false,
    unique: false,
    options: {}
  },
  {
    name: "Email",
    type: "email",
    required: false,
    unique: false,
    options: {}
  },
  {
    name: "Status",
    type: "single select",
    required: false,
    unique: false,
    options: {
      choices: ["pending", "done", "in-progress"],
      default: "pending"
    }
  }
];
