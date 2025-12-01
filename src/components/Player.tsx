import { motion } from "framer-motion";
import { User } from "lucide-react";

interface PlayerProps {
  position: { x: number; y: number };
  isMoving: boolean;
}

export const Player = ({ position, isMoving }: PlayerProps) => {
  return (
    <motion.div
      className="absolute"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{ type: "tween", duration: 0.05 }}
      style={{ zIndex: 20 }}
    >
      <motion.div
        animate={{
          rotate: isMoving ? [-2, 2, -2] : 0,
        }}
        transition={{
          duration: 0.3,
          repeat: isMoving ? Infinity : 0,
        }}
        className="relative"
      >
        {/* Character body */}
        <div 
          className="w-16 h-16 rounded-lg bg-primary border-4 border-primary flex items-center justify-center relative overflow-hidden"
          style={{ 
            boxShadow: '0 0 30px hsl(var(--neon-cyan)), 0 5px 15px rgba(0,0,0,0.5)',
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-foreground/20" />
          
          <User className="w-8 h-8 text-primary-foreground relative z-10" />
        </div>

        {/* Shadow */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-black/40 blur-sm"
        />

        {/* Movement particles */}
        {isMoving && (
          <>
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-primary"
              animate={{
                x: [-20, 20],
                y: [0, -20],
                opacity: [0.6, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-primary"
              animate={{
                x: [20, -20],
                y: [0, -20],
                opacity: [0.6, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: 0.2,
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
