import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState } from 'react'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import useScrollProgress from './useScrollProgress.jsx'
import * as THREE from 'three'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function TorusKnot({ scroll }) {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      const s = Math.min(scroll * 1.2, 1)
      const phase = easeOutCubic(s)

      const scale = 1 + phase * 18
      meshRef.current.scale.setScalar(scale)

      const opacity = Math.min(1, Math.max(0, 1 - easeOutCubic(Math.max(0, (scroll - 0.78) / 0.22))))
      meshRef.current.material.opacity = opacity
      meshRef.current.material.transparent = true

      const baseSpeed = 0.15 + phase * 0.6
      const targetX = t * baseSpeed + mouse.y * 2 * (1 + phase * 2)
      const targetY = t * (baseSpeed + 0.05) + mouse.x * 2 * (1 + phase * 2)
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05

      const floatY = Math.sin(t * 0.3) * 0.15
      meshRef.current.position.y = floatY - scroll * 0.5

      const hue = 0.76 + Math.sin(t * 0.04 + scroll * 3) * 0.07
      meshRef.current.material.color.setHSL(hue, 0.7, 0.55)
    }
    if (wireRef.current && meshRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation)
      wireRef.current.position.copy(meshRef.current.position)
      wireRef.current.scale.copy(meshRef.current.scale)
      const wireOpacity = Math.min(1, Math.max(0, (scroll - 0.7) / 0.3))
      wireRef.current.material.opacity = wireOpacity * 0.5
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
          opacity={0}
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
      const speed = 0.08 + scroll * 0.15
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15 + scroll * 2) * 0.5
      ref.current.rotation.y = clock.getElapsedTime() * speed
      ref.current.material.size = 0.025 + scroll * 0.04
      ref.current.material.opacity = 0.5 * (1 - easeOutCubic(Math.min(scroll * 1.4, 1)))
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
    const targetZ = 5 + scroll * 3
    camera.position.z += (targetZ - camera.position.z) * 0.05
  })

  return null
}

function Scene({ scroll }) {
  return (
    <>
      <fog attach="fog" args={['#000000', 5, 30]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#a855f7" />
      <directionalLight position={[-3, -2, 4]} intensity={1} color="#3b82f6" />
      <CameraController scroll={scroll} />
      <TorusKnot scroll={scroll} />
      <OrbitalRing scroll={scroll} />
      <StarField />
      <EffectComposer>
        <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.9} intensity={0.6 + scroll * 1.4} />
        <ChromaticAberration offset={[0.0005 + scroll * 0.001, 0.0005 + scroll * 0.001]} />
      </EffectComposer>
    </>
  )
}

export default function ThreeBackground() {
  const scroll = useScrollProgress()
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
        <Scene scroll={scroll} />
      </Canvas>
    </div>
  )
}
