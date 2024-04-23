import { Dispatch, SetStateAction, createContext } from "react";

interface ContextType{
    inputHeader:string;
    setInputHeader: Dispatch<SetStateAction<string>>
}

export const InputHeaderContext = createContext<ContextType | undefined>(undefined)