import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Float, TorusKnot, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { global3DTunnel } from '../3d/Global3DEngine';

const FloatingObjects = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Abstract Tech Shape */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <TorusKnot args={[1, 0.3, 256, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial 
            color="#38BDF8" 
            emissive="#0EA5E9" 
            emissiveIntensity={0.5} 
            distort={0.4} 
            speed={2} 
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </TorusKnot>
      </Float>

      {/* Orbiting Nodes (Representing Tech Stack) */}
      {[
        { pos: [3, 2, -2], color: '#61DAFB' }, // React
        { pos: [-3, -1, 2], color: '#339933' }, // Node
        { pos: [2, -2, 3], color: '#336791' }, // PostgreSQL
        { pos: [-2, 2, -3], color: '#2496ED' }, // Docker
        { pos: [0, 3, 1], color: '#F7DF1E' }, // JS
      ].map((node, i) => (
        <Float key={i} speed={3} rotationIntensity={2} floatIntensity={3} position={node.pos as [number, number, number]}>
          <Sphere args={[0.4, 32, 32]}>
            <meshStandardMaterial 
              color={node.color} 
              emissive={node.color}
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

const HeroScene = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 -z-10 pointer-events-none">
      <global3DTunnel.In>
        <group position={[3, 0, 0]}>
          <FloatingObjects />
          <Environment preset="city" />
          {/* Subtle mouse interaction */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 2.5}
          />
        </group>
      </global3DTunnel.In>
    </div>
  );
};

export default HeroScene;
