'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Package, PackageOpen } from 'lucide-react'

const groups = [
  {
    title: 'Frontend',
    color: '#a855f7',
    skills: ['React', 'TypeScript', 'Next.js', 'Vue', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Mobile',
    color: '#3b82f6',
    skills: ['React Native', 'Tamagui', 'Expo', 'Zustand', 'Reanimated', 'Expo Router', 'MMKV', 'Skia'],
  },
  {
    title: 'Backend',
    color: '#22c55e',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Hono', 'Drizzle ORM'],
  },
  {
    title: 'Cloud & DevOps',
    color: '#f97316',
    skills: ['AWS', 'Azure', 'Docker', 'SST', 'Serverless', 'Pulumi', 'Git', 'CI/CD', 'Linux'],
  },
]

const floatAnimation = (i) => ({
  y: [0, -6, 0],
  transition: {
    duration: 3 + i * 0.5,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: i * 0.3,
  },
})

function BoxCard({ group, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative flex flex-col items-center py-5 px-3 rounded-2xl bg-surface-elevated/40 border cursor-pointer select-none"
      style={{
        borderColor: isHovered ? `${group.color}44` : 'var(--border)',
      }}
      animate={floatAnimation(index)}
      whileHover={{
        scale: 1.08,
        transition: { type: 'spring', stiffness: 300, damping: 12 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTap={() => setIsHovered((v) => !v)}
      whileTap={{ scale: 0.95 }}
      tabIndex={0}
      role="button"
      aria-label={`${group.title} skills`}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center justify-center mb-1"
        animate={{
          scale: isHovered ? 1.12 : 1,
          rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{ duration: isHovered ? 0.4 : 0.3 }}
      >
        {isHovered ? (
          <PackageOpen size={56} strokeWidth={1.5} color={group.color} />
        ) : (
          <Package size={56} strokeWidth={1.5} color={group.color} />
        )}
      </motion.div>

      <motion.span
        className="text-xs font-bold uppercase tracking-[0.18em] mb-2"
        animate={{
          color: isHovered ? group.color : 'var(--muted)',
          textShadow: isHovered ? `0 0 20px ${group.color}44` : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {group.title}
      </motion.span>

      <div className="flex flex-wrap justify-center gap-1.5 min-h-[52px]">
        {group.skills.map((s, i) => (
          <motion.span
            key={s}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            initial={{ opacity: 0, y: -8, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              color: 'var(--primary)',
              backgroundColor: `${group.color}18`,
              border: `1px solid ${group.color}44`,
            }}
            transition={{
              delay: 0.1 + i * 0.05,
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            whileHover={{
              scale: 1.15,
              backgroundColor: `${group.color}30`,
              transition: { duration: 0.2 },
            }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills3D() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
      {groups.map((g, i) => (
        <BoxCard key={g.title} group={g} index={i} />
      ))}
    </div>
  )
}
