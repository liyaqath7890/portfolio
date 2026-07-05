import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import tunnel from 'tunnel-rat';
import type { ReactNode } from 'react';

// Create a global tunnel for injecting 3D elements from anywhere in the React tree
export const global3DTunnel = tunnel();

interface Global3DEngineProps {
  children: ReactNode;
}

const Global3DEngine = ({ children }: Global3DEngineProps) => {
  return (
    <div className="relative w-full min-h-screen">
      {/* 
        The global canvas sits behind everything.
      */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020617]">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#38BDF8" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#7C3AED" />

          {/* HDRI Environment for realistic glass reflections */}
          <Environment preset="city" />

          {/* Global Space/Nebula Background */}
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {/* Floating Dust Particles */}
          <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.2} color="#38BDF8" />

          {/* This renders anything sent to the tunnel from the pages */}
          <global3DTunnel.Out />

          {/* Postprocessing Bloom */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.5} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* The main DOM application renders on top */}
      <div className="relative z-0 min-h-screen pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default Global3DEngine;
