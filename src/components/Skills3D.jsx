import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, ContactShadows, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

const groups = [
  {
    title: 'Frontend',
    color: '#a855f7',
    skills: ['React', 'TypeScript', 'Next.js', 'Vue', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Mobile',
    color: '#3b82f6',
    skills: ['React Native', 'Tamagui', 'Expo'],
  },
  {
    title: 'Backend',
    color: '#22c55e',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Serverless'],
  },
  {
    title: 'DevOps',
    color: '#f97316',
    skills: ['AWS', 'Docker', 'Git', 'CI/CD', 'Linux'],
  },
]

const shapeTypes = ['box', 'sphere', 'icosahedron', 'octahedron']

function randomShape() {
  return shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
}

function SkillMesh({ label, color, index, total, groupIndex }) {
  const meshRef = useRef()
  const shape = useMemo(() => randomShape(), [])
  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere': return <sphereGeometry args={[0.2, 16, 16]} />
      case 'icosahedron': return <icosahedronGeometry args={[0.2, 0]} />
      case 'octahedron': return <octahedronGeometry args={[0.2, 0]} />
      default: return <boxGeometry args={[0.25, 0.25, 0.25]} />
    }
  }, [shape])

  const floatSpeed = 0.6 + Math.random() * 0.8
  const floatIntensity = 0.2 + Math.random() * 0.3

  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={floatIntensity}>
      <mesh ref={meshRef}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.15}
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      <Html center position={[0, -0.35, 0]}>
        <div style={{
          color: '#e4e4e7',
          fontSize: '10px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          fontFamily: 'Inter, sans-serif',
          textShadow: '0 0 8px rgba(0,0,0,0.8)',
          letterSpacing: '0.02em',
        }}>
          {label}
        </div>
      </Html>
    </Float>
  )
}

function SkillGroup({ group, index }) {
  const col = index % 2
  const row = Math.floor(index / 2)
  const centerX = (col - 0.5) * 4.5
  const centerZ = (row - 0.5) * 2.5 - 0.5
  const baseY = 0.5

  const skills = group.skills

  return (
    <group position={[centerX, baseY, centerZ]}>
      {/* Category label */}
      <Html position={[0, 1.2, 0]} center>
        <div style={{
          color: group.color,
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          fontFamily: 'Inter, sans-serif',
          textShadow: `0 0 20px ${group.color}44`,
        }}>
          {group.title}
        </div>
      </Html>

      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const radius = 0.7
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (i - (skills.length - 1) / 2) * 0.25

        return (
          <group position={[x, y, z]} key={skill}>
            <SkillMesh
              label={skill}
              color={group.color}
              index={i}
              total={skills.length}
              groupIndex={index}
            />
          </group>
        )
      })}
    </group>
  )
}

function Scene() {
  const groupRef = useRef()

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.02
      groupRef.current.rotation.x += (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.02
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, -2, 4]} intensity={0.6} color="#a855f7" />
      <pointLight position={[0, 4, 0]} intensity={0.8} color="#3b82f6" />

      <group ref={groupRef}>
        {groups.map((g, i) => (
          <SkillGroup key={g.title} group={g} index={i} />
        ))}
      </group>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4}
      />
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
    <div class="w-full h-[500px] md:h-[600px]" aria-label="3D skills visualization">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
