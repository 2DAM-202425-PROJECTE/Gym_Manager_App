import { createContext } from "react";
import { User } from "../type/user";

interface UserContextType {
    userContext: {
      user: User | null;
    };  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
  
export const UserContext = createContext({} as UserContextType);
