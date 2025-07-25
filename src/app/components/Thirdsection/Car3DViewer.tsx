'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, useProgress, useGLTF } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)} % loaded</Html>;
}

interface CarModelProps {
  url: string;
}

function CarModel({ url }: CarModelProps) {
  const gltf = useGLTF(url);
  const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
  return <primitive object={scene} />;
}

interface Car3DViewerProps {
  modelUrl: string;
}

export default function Car3DViewer({ modelUrl }: Car3DViewerProps) {
  return (
    <div style={{ width: '100%', height: 350, background: '#f3f4f6', borderRadius: 16, overflow: 'hidden' }}>
      <Canvas camera={{ position: [2, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <Stage environment="city" intensity={0.6} shadows={false}>
          <Suspense fallback={<Loader />}>
            <CarModel url={modelUrl} />
          </Suspense>
        </Stage>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
