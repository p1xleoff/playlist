// import { View, Text } from 'react-native'
// import React, { FC, PropsWithChildren, createContext, useState, useEffect, useContext } from 'react'

// import { createUser, loginUser, getCurrentUser, logOut, User } from '../api/appwrite';

// type AuthContextType = {
//   isLoggedIn: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   signup: (email: string, password: string, name: string) => Promise<void>;
//   user: User | null;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const currentUser = await getCurrentUser();
//         if (currentUser) {
//           setIsLoggedIn(true);
//           setUser(currentUser);
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       } catch (error) {
//         setIsLoggedIn(false);
//         setUser(null);
//         console.error('failed to check session', error);
//       }
//     };

//     checkSession();
//   }, []);
  
//   const login = async (email: string, password: string) => {
//     await loginUser({ email, password });
//     const currentUser = await getCurrentUser();
//     if (currentUser) {
//       setIsLoggedIn(true);
//       setUser(currentUser);
//     }
//   };

//   const logout = async () => {
//     await logOut();
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   const signup = async (email: string, password: string, name: string) => {
//     await createUser({ email, password, name });
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, signup, user }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// }

// export default AuthContext;