import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, ContactShadows } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

const categories = [
  { title: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Vue', 'Tailwind CSS', 'Vite'], color: '#a855f7', border: '#c084fc' },
  { title: 'Mobile', skills: ['React Native', 'Tamagui', 'Expo'], color: '#3b82f6', border: '#60a5fa' },
  { title: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Serverless'], color: '#22c55e', border: '#4ade80' },
  { title: 'DevOps', skills: ['AWS', 'Docker', 'Git', 'CI/CD', 'Linux'], color: '#f97316', border: '#fb923c' },
]

function Drawer({ category, position, index }) {
  const [hovered, setHovered] = useState(false)
  const panelRef = useRef()
  const targetY = useRef(0)
  const targetZ = useRef(0)

  useEffect(() => {
    targetY.current = hovered ? -0.55 : 0
    targetZ.current = hovered ? 0.15 : 0
  }, [hovered])

  useFrame(() => {
    if (panelRef.current) {
      const dy = (targetY.current - panelRef.current.position.y) * 0.1
      const dz = (targetZ.current - panelRef.current.position.z) * 0.1
      if (Math.abs(dy) > 0.0001 || Math.abs(dz) > 0.0001) {
        panelRef.current.position.y += dy
        panelRef.current.position.z += dz
      }
    }
  })

  const bw = 2.4
  const bh = 0.7
  const bd = 0.6
  const corner = 0.06

  const cols = 2
  const rows = Math.ceil(category.skills.length / cols)

  return (
    <group position={position}>
      <Float speed={0.8 + index * 0.15} rotationIntensity={0.06} floatIntensity={0.25}>
        <group>
          {/* Shadow plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
            <planeGeometry args={[bw + 0.5, bd + 0.5]} />
            <meshBasicMaterial transparent opacity={0.15} color="#a855f7" />
          </mesh>

          {/* Drawer body */}
          <mesh>
            <boxGeometry args={[bw, bh, bd]} />
            <meshPhysicalMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} envMapIntensity={0.5} />
          </mesh>

          {/* Edge glow */}
          <mesh>
            <boxGeometry args={[bw + 0.01, bh + 0.01, bd + 0.01]} />
            <meshBasicMaterial color={category.border} transparent opacity={0.08} wireframe />
          </mesh>

          {/* Front panel */}
          <mesh
            ref={panelRef}
            position={[0, 0, bd / 2]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <boxGeometry args={[bw - 0.04, bh - 0.04, 0.04]} />
            <meshPhysicalMaterial
              color={category.color}
              metalness={0.3}
              roughness={0.3}
              envMapIntensity={1}
            />
          </mesh>

          {/* Front panel border */}
          <mesh position={[0, 0, bd / 2]}>
            <boxGeometry args={[bw - 0.02, bh - 0.02, 0.03]} />
            <meshBasicMaterial color={category.border} transparent opacity={0.2} wireframe />
          </mesh>

          {/* Category title */}
          <Html position={[0, 0, bd / 2 + 0.03]} center>
            <div style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              textAlign: 'center',
              width: '140px',
              pointerEvents: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontFamily: 'Inter, sans-serif',
            }}>
              {category.title}
            </div>
          </Html>

          {/* Skills inside drawer */}
          <group position={[0, -0.05, 0]} key={`skills-${hovered}`}>
            {hovered && category.skills.map((skill, i) => {
              const row = Math.floor(i / cols)
              const col = i % cols
              const x = (col - (cols - 1) / 2) * 0.8
              const y = (rows - 1) / 2 * 0.28 - row * 0.28
              return (
                <Html position={[x, y, 0]} center key={skill}>
                  <div style={{
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    transitionDelay: `${i * 60}ms`,
                    opacity: 1,
                    transform: 'scale(1)',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#e4e4e7',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    backdropFilter: 'blur(4px)',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {skill}
                  </div>
                </Html>
              )
            })}
          </group>
        </group>
      </Float>
    </group>
  )
}

function Scene() {
  const positions = [
    [-2.8, 1.3, 0],
    [2.8, 1.3, 0],
    [-2.8, -1.3, 0],
    [2.8, -1.3, 0],
  ]

  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, -2, 4]} intensity={0.6} color="#a855f7" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#3b82f6" />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={12} blur={2} far={5} />
      {categories.map((cat, i) => (
        <Drawer key={cat.title} category={cat} position={positions[i]} index={i} />
      ))}
    </>
  )
}

export default function Skills3D() {
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
    <div class="w-full h-[520px] md:h-[580px]" aria-label="3D skills toolbox">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
