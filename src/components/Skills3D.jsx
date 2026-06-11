import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, ContactShadows, Edges } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'

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

function SkillItem({ label, color, index, total, isOpen }) {
  const groupRef = useRef()

  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const spreadR = 0.9
  const spreadX = Math.cos(angle) * spreadR
  const spreadZ = Math.sin(angle) * spreadR * 0.5
  const spreadY = (index - (total - 1) / 2) * 0.35
  const restY = (index - (total - 1) / 2) * 0.18

  useFrame(() => {
    if (groupRef.current) {
      const speed = 0.065
      const tx = isOpen ? spreadX : 0
      const ty = isOpen ? spreadY : restY
      const tz = isOpen ? 0.9 : 0
      const ts = isOpen ? 1.0 : 0.3

      groupRef.current.position.x += (tx - groupRef.current.position.x) * speed
      groupRef.current.position.y += (ty - groupRef.current.position.y) * speed
      groupRef.current.position.z += (tz - groupRef.current.position.z) * speed

      const s = groupRef.current.scale.x + (ts - groupRef.current.scale.x) * speed
      groupRef.current.scale.set(s, s, s)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.32, 0.1, 0.16]} />
        <meshStandardMaterial
          color={isOpen ? color : '#181828'}
          metalness={0.75}
          roughness={0.2}
          envMapIntensity={1.2}
        />
        <Edges
          color={isOpen ? '#ffffff' : color}
          opacity={isOpen ? 0.5 : 0.12}
          transparent
          threshold={15}
        />
      </mesh>
      <mesh position={[0, 0, 0.082]}>
        <planeGeometry args={[0.26, 0.07]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isOpen ? 0.2 : 0.04}
        />
      </mesh>
      <Html
        position={[0, 0, isOpen ? 0.14 : 0.09]}
        center
      >
        <div style={{
          color: isOpen ? '#fff' : '#a1a1aa',
          fontSize: '8px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.02em',
          textShadow: isOpen ? `0 0 12px ${color}88` : 'none',
          transition: 'color 0.25s',
          pointerEvents: 'none',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

function Cabinet({ group, column, row }) {
  const [hovered, setHovered] = useState(false)
  const n = group.skills.length
  const cabH = n * 0.2 + 0.3
  const cabW = 0.5
  const cabD = 0.4

  const x = (column - 0.5) * 4.5
  const z = (row - 0.5) * 2.5 - 0.5

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
      <group
        position={[x, 0.2, z]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <mesh>
          <boxGeometry args={[cabW, cabH, cabD]} />
          <meshStandardMaterial
            color="#080808"
            metalness={0.9}
            roughness={0.3}
            transparent
            opacity={hovered ? 0.2 : 0.1}
          />
          <Edges
            color={group.color}
            opacity={hovered ? 0.7 : 0.25}
            transparent
            threshold={15}
          />
        </mesh>

        <Html position={[0, cabH / 2 + 0.4, 0]} center>
          <div style={{
            color: group.color,
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontFamily: 'Inter, sans-serif',
            textShadow: `0 0 20px ${group.color}66`,
            pointerEvents: 'none',
          }}>
            {hovered ? `~ ${group.title} ~` : group.title}
          </div>
        </Html>

        {group.skills.map((skill, i) => (
          <SkillItem
            key={skill}
            label={skill}
            color={group.color}
            index={i}
            total={n}
            isOpen={hovered}
          />
        ))}
      </group>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef()
  const autoRotate = useRef(0)

  useFrame(({ clock, mouse }) => {
    autoRotate.current = clock.elapsedTime * 0.12
    if (groupRef.current) {
      const targetY = mouse.x * 0.2 + Math.sin(autoRotate.current) * 0.12
      const targetX = -mouse.y * 0.08 + Math.sin(autoRotate.current * 0.5) * 0.04
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, 4]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#3b82f6" />

      <group position={[0, 0.4, 0]} ref={groupRef}>
        {groups.map((g, i) => (
          <Cabinet key={g.title} group={g} column={i % 2} row={Math.floor(i / 2)} />
        ))}
      </group>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.3}
        scale={20}
        blur={2.5}
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
    <div class="w-full h-[500px] md:h-[600px]" aria-label="3D skills cabinets">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = 3
          gl.toneMappingExposure = 1.2
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
