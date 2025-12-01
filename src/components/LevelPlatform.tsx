import { motion } from "framer-motion";

export const LevelPlatform = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      {/* Ground */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        className="h-24 bg-gradient-to-t from-game-ground to-game-ground/50 border-t-2 border-primary/50 relative overflow-hidden"
        style={{
          boxShadow: '0 -5px 30px hsl(var(--neon-cyan) / 0.2)',
        }}
      >
        {/* Grid pattern on ground */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Glowing line on top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-primary"
          animate={{
            boxShadow: [
              '0 0 10px hsl(var(--neon-cyan))',
              '0 0 20px hsl(var(--neon-cyan))',
              '0 0 10px hsl(var(--neon-cyan))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Moving particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary"
            initial={{ x: `${i * 25}%`, opacity: 0 }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
