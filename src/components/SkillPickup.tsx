import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, Cpu, Zap } from "lucide-react";

interface SkillPickupProps {
  skill: string;
  position: { x: number; y: number };
  playerPosition: { x: number; y: number };
  onCollect: (skill: string) => void;
  isCollected: boolean;
  color: string;
}

const iconMap: Record<string, any> = {
  default: Code2,
  iot: Cpu,
  ai: Zap,
};

export const SkillPickup = ({ 
  skill, 
  position, 
  playerPosition, 
  onCollect, 
  isCollected,
  color 
}: SkillPickupProps) => {
  const [collected, setCollected] = useState(false);

  const getIcon = () => {
    if (skill.toLowerCase().includes('iot')) return iconMap.iot;
    if (skill.toLowerCase().includes('ai') || skill.toLowerCase().includes('ml')) return iconMap.ai;
    return iconMap.default;
  };

  const Icon = getIcon();

  useEffect(() => {
    if (collected || isCollected) return;

    const distance = Math.sqrt(
      Math.pow(playerPosition.x - position.x, 2) +
      Math.pow(playerPosition.y - position.y, 2)
    );

    if (distance < 60) {
      setCollected(true);
      onCollect(skill);
    }
  }, [playerPosition, position, collected, isCollected, skill, onCollect]);

  if (collected || isCollected) {
    return (
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 0, opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="absolute"
        style={{ left: position.x, top: position.y }}
      >
        <div className="text-primary font-bold text-lg">+1</div>
      </motion.div>
    );
  }

  const colorClass = color === 'cyan' ? 'neon-cyan' : color === 'purple' ? 'neon-purple' : 'neon-magenta';

  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative"
      >
        {/* Outer glow ring */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-${colorClass}`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{ 
            filter: `blur(8px)`,
          }}
        />

        {/* Skill icon */}
        <div
          className={`w-12 h-12 rounded-lg bg-card border-2 border-${colorClass} flex items-center justify-center relative`}
          style={{
            boxShadow: `0 0 20px hsl(var(--neon-${color}))`,
          }}
        >
          <Icon className={`w-6 h-6 text-${colorClass}`} />
        </div>
      </motion.div>

      {/* Skill label */}
      <div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold bg-card/90 px-2 py-1 rounded border border-current"
        style={{
          color: `hsl(var(--neon-${color}))`,
          boxShadow: `0 0 10px hsl(var(--neon-${color}) / 0.3)`,
        }}
      >
        {skill}
      </div>
    </motion.div>
  );
};
