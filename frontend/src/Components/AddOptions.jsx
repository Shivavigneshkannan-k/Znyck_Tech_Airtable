import { CirclePlus, Trash } from "lucide-react";
export const AddOptionButton = ({ setChoice }) => {
  const addChoice = () => {
    setChoice((prev) => [...prev, " "]);
  };
  return (
    <button
      className='option-btn'
      onClick={(e) => {
        e.preventDefault();
        addChoice();
      }}>
      <CirclePlus size={15} />
      Add option
    </button>
  );
};
const AddOptions = ({ setChoice, i, choice }) => {
  const editChoice = (e, index) => {
    setChoice((prev) => {
      const state = [...prev];
      state[index] = e.target.value;
      return state;
    });
  };
  const deleteChoice = (index) => {
    setChoice((prev) => {
      const state = prev.filter((c, i) => index != i);
      return state;
    });
  };
  return (
    <div
      className='flex justify-start w-full items-center p-2'
      key={i}>
      <input
        type='text'
        placeholder="option"
        onChange={(e) => editChoice(e, i)}
        className='input-field'
        value={(choice[i]!==' ' || !choice[i])?choice[i]: ""}
      />
      <Trash
        size={15}
        onClick={() => {
          deleteChoice(i);
        }}
      />
    </div>
  );
};

export default AddOptions;
