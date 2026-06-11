import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useMemo, useEffect, useState } from 'react'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

function TorusKnot() {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.15 + mouse.y * 0.5
      meshRef.current.rotation.y = t * 0.12 + mouse.x * 0.5

      const hue = 0.76 + Math.sin(t * 0.03) * 0.07
      meshRef.current.material.color.setHSL(hue, 0.7, 0.55)
    }
    if (wireRef.current && meshRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation)
      wireRef.current.position.copy(meshRef.current.position)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.35, 128, 16]} />
          <meshPhysicalMaterial
            metalness={0.9}
            roughness={0.1}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
            envMapIntensity={3}
          />
        </mesh>
        <mesh ref={wireRef} scale={[1.015, 1.015, 1.015]}>
          <torusKnotGeometry args={[1, 0.35, 128, 16]} />
          <meshBasicMaterial
            color="#a855f7"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </group>
    </Float>
  )
}

function OrbitalRing() {
  const ref = useRef()
  const [positions] = useMemo(() => {
    const count = 200
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2 + Math.sin(i * 0.5) * 0.15
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * 0.15
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return [pos]
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.3
      ref.current.rotation.y = clock.getElapsedTime() * 0.08
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#818cf8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function StarField() {
  const ref = useRef()
  const count = 300
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
        opacity={0.12}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#000000', 5, 30]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#a855f7" />
      <directionalLight position={[-3, -2, 4]} intensity={1} color="#3b82f6" />
      <TorusKnot />
      <OrbitalRing />
      <StarField />
      <EffectComposer>
        <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.9} intensity={0.4} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>
    </>
  )
}

export default function Hero3D() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (reduced) return null

  return (
    <div class="w-full h-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
