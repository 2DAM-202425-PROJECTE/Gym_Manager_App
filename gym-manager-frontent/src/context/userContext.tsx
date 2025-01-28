import { createContext, useMemo, useState } from "react";
import { User } from "../type/user";
import { ReactNode } from "react";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext({} as UserContextType);


interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const userContext = useMemo(() => ({ user }), [user]);
    
    return (
        <UserContext.Provider value={{ userContext, setUser }}>
          {children}
        </UserContext.Provider>
      );

}