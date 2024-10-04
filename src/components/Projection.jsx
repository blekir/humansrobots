import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';
import texturePath from '../assets/tarkov-woodland-02.jpg';

// Shader code for texture projection
const vertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 projectorPosition;
  varying vec3 vWorldPosition;

  void main() {
    vec3 direction = normalize(vWorldPosition - projectorPosition);
    vec2 uv = direction.xy * 0.5 + 0.5;
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

const ProjectedTextureMesh = () => {
  const meshRef = useRef();
  const texture = useTexture(texturePath);
  const projectorPosition = new Vector3(13, 13, 15);

  useEffect(() => {
    // Ensure the texture wraps correctly
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }, [texture]);

  //   // Animation and movement
  //   useFrame(() => {
  //     if (meshRef.current) {
  //       meshRef.current.rotation.y += 0.01;
  //     }
  //   });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <shaderMaterial
        uniforms={{
          uTexture: { value: texture },
          projectorPosition: { value: projectorPosition },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default function Scene() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <ProjectedTextureMesh />
    </Canvas>
  );
}
