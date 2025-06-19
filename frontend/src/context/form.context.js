import { createContext, useContext } from "react";

export const FormContext = createContext(undefined);
export const useFormContext = ()=>{
    const context = useContext(FormContext);
    if(!context){
        throw new Error("useFormContext must be wrapped with in <formContext.Provider>");
    }
    return context;
}