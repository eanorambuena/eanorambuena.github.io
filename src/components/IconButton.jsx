import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const IconButton = forwardRef(({ onClick, ariaLabel, animateKey, children, className = '', ...rest }, ref) => {
  const shared = {
    onClick,
    'aria-label': ariaLabel,
    ...rest,
  }

  if (animateKey === undefined) {
    return (
      <button
        ref={ref}
        {...shared}
        className={`p-2 rounded-lg text-secondary hover:text-primary transition-colors bg-surface-white/5 hover:bg-surface-white/10 ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      ref={ref}
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
})

export default IconButton
