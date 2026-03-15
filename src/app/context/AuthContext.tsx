import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "member" | "coordinator" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district: string;
  area?: string;
  avatar?: string;
  mustChangePassword: boolean;
  joinDate: string;
  bio?: string;
  phone?: string;
  twoFAEnabled?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (newPassword: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users database
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "James Okoye",
    email: "member@example.com",
    password: "Temp1234!",
    role: "member",
    district: "District 3",
    area: "Westlands",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    mustChangePassword: true,
    joinDate: "2024-01-15",
    bio: "Technology entrepreneur and community enthusiast.",
    phone: "+1 555-0101",
  },
  {
    id: "2",
    name: "Sarah Kimani",
    email: "coordinator@example.com",
    password: "Temp1234!",
    role: "coordinator",
    district: "District 1",
    area: "Nairobi Central",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    mustChangePassword: false,
    joinDate: "2023-06-10",
    bio: "District Coordinator for District 1. Passionate about community development.",
    phone: "+1 555-0102",
    twoFAEnabled: true,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin@2024!",
    role: "admin",
    district: "HQ",
    area: "Headquarters",
    mustChangePassword: false,
    joinDate: "2022-01-01",
  },
  {
    id: "4",
    name: "Michael Otieno",
    email: "michael@example.com",
    password: "Temp1234!",
    role: "member",
    district: "District 2",
    area: "Eastlands",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    mustChangePassword: false,
    joinDate: "2024-02-20",
    bio: "Finance professional. Loves basketball and giving back.",
    phone: "+1 555-0103",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password." };
    }
    const { password: _pwd, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    return { success: true };
  };

  const logout = () => setUser(null);

  const changePassword = (_newPassword: string) => {
    if (user) {
      setUser({ ...user, mustChangePassword: false });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
