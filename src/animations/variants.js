// Framer Motion animation variants for consistent animations across the app

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 32 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.92 },
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
};

export const slideInLeft = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 16px 40px rgba(33,150,243,0.15)',
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
  }
};

export const buttonTap = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.02 }
};

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: 'easeIn' } }
};

export const modalVariants = {
  initial: { opacity: 0, scale: 0.9, y: 24 },
  animate: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
  },
  exit: {
    opacity: 0, scale: 0.9, y: 24,
    transition: { duration: 0.25, ease: 'easeIn' }
  }
};

export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

export const sidebarVariants = {
  expanded: { width: 260, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  collapsed: { width: 72, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  mobileClosed: { width: 260, x: -280, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  mobileOpen: { width: 260, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export const sidebarLabelVariants = {
  expanded: { opacity: 1, x: 0, display: 'block', transition: { delay: 0.1, duration: 0.2 } },
  collapsed: { opacity: 0, x: -10, transitionEnd: { display: 'none' } }
};

export const counterVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
};
