// src/app/page.tsx
"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei'; // Import ContactShadows here
import Step from './components/3D/Step';
import Navigation from './components/UI/Navigation';
import Statistics from './components/UI/Statistics';
import { ProcessProvider, useProcess } from './context/ProcessContext';

const HomePage = () => {
  const shapes = ['box', 'sphere', 'cylinder']; // Geometric shapes for each step
  const { currentStep } = useProcess();

  return (
    <div className="app-container">
      <Canvas
        shadows
        camera={{ position: [0, 1, 5], fov: 50 }} // Adjusted camera position and FOV for better view
        gl={{ antialias: true }} // Enable anti-aliasing for smoother edges
        style={{ width: '100%', height: '80vh' }}
      >
        {/* Global ambient light */}
        <ambientLight intensity={0.3} />

        {/* Directional light for strong sunlight-like lighting */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}  // Higher shadow map resolution for better quality shadows
          shadow-mapSize-height={2048}
        />

        {/* Render the current step */}
        <Step shape={shapes[currentStep]} />

        {/* High-quality soft shadows on the ground */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.25}
          width={10}
          height={10}
          blur={1.5}
          far={10}
        />

        {/* Environment map for reflections (requires HDRI or texture environment) */}
        <Environment preset="sunset" />
      </Canvas>

      <div className="ui-container">
        <Navigation />
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