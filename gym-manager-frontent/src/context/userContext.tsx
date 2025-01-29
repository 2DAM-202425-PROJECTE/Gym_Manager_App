import { createContext, useMemo, useState } from "react";
import { User } from "../type/user";
import { ReactNode } from "react";

interface UserContextType {
  userContext: {
    user: User | null;
  };  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: ReactNode;
}


export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const userContext = useMemo(() => ({ user }), [user]);
    
    return (
        <UserContext.Provider value={{ userContext, setUser }}>
          {children}
        </UserContext.Provider>
      );

}

