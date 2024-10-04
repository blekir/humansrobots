import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import modelPath from '../assets/key1.fbx'; // Import the FBX model
import texture1 from '../assets/tarkov-woodland-01-RGB.jpg'; // Import the texture
import texture2 from '../assets/tarkov-woodland-02.jpg'; // Import the texture
const Model = () => {
  const { camera } = useThree();

  // Set the camera position closer to the model (zoomed-in by default)
  camera.position.set(0, 0, 1.3);
  const [currentTexture, setCurrentTexture] = useState(null);
  const [rotationY, setRotationY] = useState(0);
  const fbx = useLoader(FBXLoader, modelPath);
  // Load both textures
  const textures = useLoader(TextureLoader, [texture1, texture2]);

  useEffect(() => {
    // Set the initial texture
    setCurrentTexture(textures[0]);
  }, [textures]);

  // Reference to the model for animation
  const modelRef = useRef();

  // Apply the texture to the material
  if (fbx && currentTexture) {
    fbx.traverse((child) => {
      if (child.isMesh) {
        console.log(child);
        child.material[0].map = currentTexture;
        child.material.needsUpdate = true;
      }
    });
  }

  // Rotate the model and track its Y rotation
  useFrame(() => {
    if (modelRef.current) {
      // Rotate the model
      modelRef.current.rotation.x += 0.01;
      modelRef.current.rotation.y += 0.01;
      modelRef.current.rotation.z += 0.01;

      // Update rotationY state
      setRotationY((prev) => prev + 0.01);

      // Check if a full rotation (2π radians) has been completed
      if (rotationY >= Math.PI * 2) {
        // Reset rotation tracker
        setRotationY(0);

        // Toggle the texture
        setCurrentTexture((prevTexture) =>
          prevTexture === textures[0] ? textures[1] : textures[0]
        );
      }
    }
  });

  return <primitive ref={modelRef} object={fbx} scale={0.01} />;
};

export default function Keycap() {
  return (
    <Canvas>
      {/* OrbitControls allows the user to interact with the model */}
      <OrbitControls enableZoom={false} />

      {/* Lighting */}
      {/* <ambientLight intensity={3.5} /> */}
      <pointLight position={[1, 1, 1]} intensity={5} />

      {/* Load and render the FBX model */}
      <Model />
    </Canvas>
  );
}
