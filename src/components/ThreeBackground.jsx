import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import useScrollProgress from './useScrollProgress.jsx'
import * as THREE from 'three'

function TorusKnot({ scroll }) {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      const baseSpeed = 0.15 + scroll * 0.2
      const targetX = t * baseSpeed + mouse.y * 1.5
      const targetY = t * (baseSpeed + 0.05) + mouse.x * 1.5
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05
      const floatY = Math.sin(t * 0.3) * 0.15
      meshRef.current.position.y = floatY - scroll * 0.3

      const hue = 0.76 + Math.sin(t * 0.04 + scroll * 2) * 0.07
      meshRef.current.material.color.setHSL(hue, 0.7, 0.55)
      meshRef.current.scale.setScalar(1 + scroll * 0.15)
    }
    if (wireRef.current && meshRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation)
      wireRef.current.position.copy(meshRef.current.position)
      wireRef.current.scale.copy(meshRef.current.scale)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <meshPhysicalMaterial
          metalness={0.9}
          roughness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={3}
        />
      </mesh>
      <mesh ref={wireRef} scale={[1.015, 1.015, 1.015]}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  )
}

function OrbitalRing({ scroll }) {
  const ref = useRef()
  const [positions] = useMemo(() => {
    const count = 300
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 1.8 + Math.sin(i * 0.5) * 0.15
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * 0.15
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return [pos]
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      const speed = 0.08 + scroll * 0.05
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.3
      ref.current.rotation.y = clock.getElapsedTime() * speed
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={300} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#818cf8"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function StarField() {
  const ref = useRef()
  const count = 600
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2
      pos[i * 3] = Math.sin(theta) * Math.cos(phi) * r
      pos[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r
      pos[i * 3 + 2] = Math.cos(theta) * r
    }
    return [pos]
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#a78bfa"
        transparent
        opacity={0.15}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CameraController({ scroll }) {
  const { camera } = useThree()

  useFrame(() => {
    const targetZ = 4.5 - scroll * 1.5
    camera.position.z += (targetZ - camera.position.z) * 0.05
  })

  return null
}

function Scene({ scroll }) {
  return (
    <>
      <fog attach="fog" args={['#020617', 5, 15]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#a855f7" />
      <directionalLight position={[-3, -2, 4]} intensity={1} color="#3b82f6" />
      <CameraController scroll={scroll} />
      <TorusKnot scroll={scroll} />
      <OrbitalRing scroll={scroll} />
      <StarField />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={0.8} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>
    </>
  )
}

export default function ThreeBackground() {
  const scroll = useScrollProgress()

  return (
    <div class="w-full h-full min-h-[300px]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <Scene scroll={scroll} />
      </Canvas>
    </div>
  )
}
