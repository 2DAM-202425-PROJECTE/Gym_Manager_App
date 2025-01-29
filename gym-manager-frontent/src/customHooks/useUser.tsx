import { UserContext } from '../context/userContext';
import { useContext } from 'react';

export function UseUser() {
    const context = useContext(UserContext);
    
    if (!context) {
      throw new Error('useUser must be used within an UserProvider');
    }
    return context;
  }