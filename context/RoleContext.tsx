'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_WHOLESALE_APPLICATIONS, WholesaleApplication } from '@/data/customers';

export type UserRole = 'guest' | 'retail' | 'wholesale_pending' | 'wholesale_approved' | 'admin';

export interface UserDetails {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  gstNumber?: string;
}

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: UserDetails;
  wholesaleApplications: WholesaleApplication[];
  submitWholesaleApplication: (data: Omit<WholesaleApplication, 'id' | 'appliedDate' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: 'approved' | 'rejected') => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('guest');
  const [wholesaleApplications, setWholesaleApplications] = useState<WholesaleApplication[]>(MOCK_WHOLESALE_APPLICATIONS);
  const [userState, setUserState] = useState<UserDetails>({
    name: 'Guest Visitor',
    email: '',
  });

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('mudra_user_role') as UserRole;
      if (savedRole) {
        setRoleState(savedRole);
      }

      const savedApps = localStorage.getItem('mudra_applications');
      if (savedApps) {
        setWholesaleApplications(JSON.parse(savedApps));
      }

      const savedUser = localStorage.getItem('mudra_user_details');
      if (savedUser) {
        setUserState(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error loading role context from localStorage', e);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('mudra_user_role', newRole);

    // Default details based on role if no custom user profile
    let defaultUser: UserDetails = { name: 'Guest Visitor', email: '' };
    if (newRole === 'admin') {
      defaultUser = { name: 'Mudra Admin Portal', email: 'admin@mudrafashions.com', companyName: 'MUDRA FASHIONS HQ' };
    } else if (newRole === 'wholesale_approved') {
      defaultUser = { name: 'Apex Corporate Garments', email: 'procurement@apexcorp.com', companyName: 'Apex Corporate Garments Ltd', gstNumber: '29ABCDE1234F1Z5' };
    } else if (newRole === 'wholesale_pending') {
      defaultUser = { name: 'Vanguard Hospitality', email: 'rohan@vanguardhospitality.in', companyName: 'Vanguard Hospitality Uniforms', gstNumber: '07AAAAA0000A1Z5' };
    } else if (newRole === 'retail') {
      defaultUser = { name: 'Vikramaditya Sharma', email: 'vikram.sharma@example.com' };
    }

    setUserState(defaultUser);
    localStorage.setItem('mudra_user_details', JSON.stringify(defaultUser));
  };

  const submitWholesaleApplication = (
    data: Omit<WholesaleApplication, 'id' | 'appliedDate' | 'status'>
  ) => {
    const newApp: WholesaleApplication = {
      ...data,
      id: `wa-${Date.now().toString().slice(-4)}`,
      appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'pending',
    };

    const updated = [newApp, ...wholesaleApplications];
    setWholesaleApplications(updated);
    localStorage.setItem('mudra_applications', JSON.stringify(updated));

    // Update current user to wholesale_pending role with submitted data
    const newUser: UserDetails = {
      name: data.contactPerson,
      email: data.email,
      phone: data.phone,
      companyName: data.businessName,
      gstNumber: data.gstNumber,
    };

    setUserState(newUser);
    localStorage.setItem('mudra_user_details', JSON.stringify(newUser));

    setRoleState('wholesale_pending');
    localStorage.setItem('mudra_user_role', 'wholesale_pending');
  };

  const updateApplicationStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = wholesaleApplications.map((app) =>
      app.id === id ? { ...app, status } : app
    );

    setWholesaleApplications(updated);
    localStorage.setItem('mudra_applications', JSON.stringify(updated));

    // If approved application matches active user email/business name, transition role to wholesale_approved!
    const targetApp = wholesaleApplications.find((app) => app.id === id);
    if (status === 'approved' && targetApp) {
      if (userState.email === targetApp.email || userState.companyName === targetApp.businessName || role === 'wholesale_pending') {
        setRoleState('wholesale_approved');
        localStorage.setItem('mudra_user_role', 'wholesale_approved');

        const updatedUser: UserDetails = {
          name: targetApp.contactPerson,
          email: targetApp.email,
          phone: targetApp.phone,
          companyName: targetApp.businessName,
          gstNumber: targetApp.gstNumber,
        };
        setUserState(updatedUser);
        localStorage.setItem('mudra_user_details', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        user: userState,
        wholesaleApplications,
        submitWholesaleApplication,
        updateApplicationStatus,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
