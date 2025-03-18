import { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../type/user";
import { ReactNode } from "react";

interface UserContextType {
  userContext: {
    entrenador: any;
    user: User | null;
  };
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: UserProviderProps) {
  // Recuperar el usuario desde localStorage al cargar la app
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Guardar en localStorage cuando el usuario cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const userContext = useMemo(() => ({ user }), [user]);

  return (
    <UserContext.Provider value={{ userContext, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
