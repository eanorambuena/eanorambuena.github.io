import { AnimatePresence, motion } from 'motion/react'

export default function IconButton({ onClick, ariaLabel, animateKey, children, className = '', ...rest }) {
  const shared = {
    onClick,
    'aria-label': ariaLabel,
    ...rest,
  }

  if (animateKey === undefined) {
    return (
      <button
        {...shared}
        className={`p-2 rounded-lg text-secondary hover:text-primary transition-colors bg-surface-white/5 hover:bg-surface-white/10 ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      {...shared}
      className={`p-2 rounded-lg text-secondary hover:text-primary transition-colors bg-surface-white/5 hover:bg-surface-white/10 relative ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={animateKey}
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.75, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
