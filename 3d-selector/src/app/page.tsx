// src/app/page.tsx
"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei'; // Import ContactShadows here
import Step from './components/3D/Step';
import Navigation from './components/UI/Navigation';
import Statistics from './components/UI/Statistics';
import { useProcess, ProcessProvider } from './context/ProcessContext'; // Import ProcessContext for step management

const HomePage = () => {
  const { currentStep } = useProcess(); // Use currentStep from context

  const processes = ["etching", "deposition", "baking", "oxidation"]; // Steps

  return (
    <div className="app-container">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }} gl={{ antialias: true }} style={{ width: '100%', height: '80vh' }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <Step process={processes[currentStep]} />
        <ContactShadows position={[0, -1, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={10} />
        <Environment preset="sunset" />
      </Canvas>

      <div className="ui-container">
        <Navigation /> {/* No need to pass handleNext/handlePrevious, as Navigation uses context */}
        <Statistics />
      </div>
    </div>
  );
};

const PageWrapper = () => (
  <ProcessProvider>
    <HomePage />
  </ProcessProvider>
);

export default PageWrapper;
