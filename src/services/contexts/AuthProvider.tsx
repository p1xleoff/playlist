// // AuthProvider.tsx
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
// import { auth } from '../auth/firebase'; // Ensure `auth` is correctly imported from your Firebase initialization

// interface AuthContextProps {
//   currentUser: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<UserCredential>;
//   signup: (email: string, password: string) => Promise<UserCredential>;
//   logout: () => Promise<void>;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (email: string, password: string) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       setCurrentUser(userCredential.user);
//       return userCredential;
//     } catch (error) {
//       console.error('Error logging in:', error);
//       throw error;
//     }
//   };

//   const signup = async (email: string, password: string) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       setCurrentUser(userCredential.user);
//       return userCredential;
//     } catch (error) {
//       console.error('Error signing up:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setCurrentUser(null);
//     } catch (error) {
//       console.error('Error logging out:', error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     loading,
//     login,
//     signup,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
