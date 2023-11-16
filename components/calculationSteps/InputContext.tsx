import { createContext, Dispatch, SetStateAction } from "react";

interface ContextType {
  userData: any;
  setUserData: Dispatch<SetStateAction<any>>;
  finalData: any[];
  setFinalData: Dispatch<SetStateAction<any[]>>;
}

export const InputContext = createContext<ContextType | null>(null);
