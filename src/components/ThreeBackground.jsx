import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function TorusKnot() {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      meshRef.current.rotation.x = t * 0.15 + mouse.y * 0.5
      meshRef.current.rotation.y = t * 0.2 + mouse.x * 0.5
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.15
    }
    if (glowRef.current && meshRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation)
      glowRef.current.position.copy(meshRef.current.position)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <meshPhysicalMaterial
          color="#a855f7"
          metalness={0.8}
          roughness={0.15}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          envMapIntensity={2}
        />
      </mesh>
      <mesh ref={glowRef} scale={[1.06, 1.06, 1.06]}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

function Particles() {
  const count = 100
  const mesh = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2
      pos[i * 3] = Math.sin(theta) * Math.cos(phi) * r
      pos[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r
      pos[i * 3 + 2] = Math.cos(theta) * r
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#818cf8"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div class="w-full h-full min-h-[300px]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
        <directionalLight position={[-3, -2, 4]} intensity={0.8} color="#3b82f6" />
        <TorusKnot />
        <Particles />
      </Canvas>
    </div>
  )
}
