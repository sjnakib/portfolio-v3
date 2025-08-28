// Animation variants and utilities for Framer Motion

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 1, 1]
    }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 1, 1]
    }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 1, 1]
    }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 1, 1]
    }
  }
};

// Scale animations
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.18, 1.25, 0.4, 1] // Bounce effect
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 1, 1]
    }
  }
};

// Hero specific animations
export const heroTitle = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + (i * 0.15),
      duration: 0.8,
      ease: [0.18, 1.25, 0.4, 1] // Bounce effect
    }
  })
};

export const heroAvatar = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  visible: { 
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.18, 1.25, 0.4, 1] // Elastic easing
    }
  }
};

export const heroButton = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + (i * 0.2),
      duration: 0.5,
      ease: [0.18, 1.25, 0.4, 1]
    }
  })
};

export const heroTag = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.4 + (i * 0.1),
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

// Stagger helpers
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItems = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Scroll-triggered animations
export const scrollFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const parallaxEffect = (strength: number = 100) => ({
  initial: {},
  animate: (scrollY: number) => ({
    y: scrollY / strength,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    }
  })
});
