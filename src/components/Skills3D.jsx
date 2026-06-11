import { Canvas, useFrame } from '@react-three/fiber'
import { Html, ContactShadows, Edges, RoundedBox } from '@react-three/drei'
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

function Drawer({ label, color, yPosition, index }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (groupRef.current) {
      const targetZ = hovered ? 0.55 : 0
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
      <RoundedBox
        args={[0.72, 0.17, 0.3]}
        radius={0.025}
        smoothness={4}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? color : '#181828'}
          metalness={0.75}
          roughness={0.2}
          envMapIntensity={1.2}
        />
        <Edges
          color={hovered ? '#ffffff' : color}
          opacity={hovered ? 0.6 : 0.2}
          transparent
          threshold={15}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.152]}>
        <planeGeometry args={[0.62, 0.1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.06}
        />
      </mesh>
      <Html
        position={[0, 0, hovered ? 0.22 : 0.16]}
        center
      >
        <div style={{
          color: hovered ? '#fff' : '#a1a1aa',
          fontSize: '10px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.03em',
          textShadow: hovered ? `0 0 14px ${color}88` : 'none',
          transition: 'color 0.3s',
          pointerEvents: 'none',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

function Cabinet({ group, column, row }) {
  const n = group.skills.length
  const drawerPitch = 0.25
  const cabH = n * drawerPitch + 0.1
  const cabW = 0.85
  const cabD = 0.45

  const x = (column - 0.5) * 4.5
  const z = (row - 0.5) * 2.5 - 0.5

  return (
    <group position={[x, 0, z]}>
      <mesh>
        <boxGeometry args={[cabW, cabH, cabD]} />
        <meshStandardMaterial
          color="#080808"
          metalness={0.9}
          roughness={0.3}
          transparent
          opacity={0.12}
        />
        <Edges color={group.color} opacity={0.3} transparent threshold={15} />
      </mesh>

      <Html position={[0, cabH / 2 + 0.35, 0]} center>
        <div style={{
          color: group.color,
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontFamily: 'Inter, sans-serif',
          textShadow: `0 0 20px ${group.color}44`,
          pointerEvents: 'none',
        }}>
          {group.title}
        </div>
      </Html>

      {group.skills.map((skill, i) => {
        const y = (i - (n - 1) / 2) * drawerPitch
        return (
          <Drawer
            key={skill}
            label={skill}
            color={group.color}
            yPosition={y}
            index={i}
          />
        )
      })}
    </group>
  )
}

function Scene() {
  const groupRef = useRef()
  const autoRotate = useRef(0)

  useFrame(({ clock, mouse }) => {
    autoRotate.current = clock.elapsedTime * 0.15
    if (groupRef.current) {
      const targetY = mouse.x * 0.25 + Math.sin(autoRotate.current) * 0.15
      const targetX = -mouse.y * 0.1 + Math.sin(autoRotate.current * 0.5) * 0.05
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, 4]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#3b82f6" />
      <spotLight position={[0, 4, 4]} angle={0.4} penumbra={0.8} intensity={0.8} color="#ffffff" />

      <group position={[0, 0.4, 0]} ref={groupRef}>
        {groups.map((g, i) => (
          <Cabinet key={g.title} group={g} column={i % 2} row={Math.floor(i / 2)} />
        ))}
      </group>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.35}
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
