// src/context/ProcessContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProcessContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

export const ProcessProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0); // Starting at step 0

  return (
    <ProcessContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcess = () => {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error('useProcess must be used within a ProcessProvider');
  }
  return context;
};
