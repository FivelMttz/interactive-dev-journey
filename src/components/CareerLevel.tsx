import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Level } from "./GameCanvas";
import { Player } from "./Player";
import { SkillPickup } from "./SkillPickup";
import { LevelPlatform } from "./LevelPlatform";

interface CareerLevelProps {
  level: Level;
  onComplete: (skills: string[]) => void;
}

export const CareerLevel = ({ level, onComplete }: CareerLevelProps) => {
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 400 });
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [keys, setKeys] = useState({ left: false, right: false, up: false, space: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") setKeys(k => ({ ...k, left: true }));
      if (e.key === "ArrowRight" || e.key === "d") setKeys(k => ({ ...k, right: true }));
      if (e.key === "ArrowUp" || e.key === "w") setKeys(k => ({ ...k, up: true }));
      if (e.key === " ") setKeys(k => ({ ...k, space: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") setKeys(k => ({ ...k, left: false }));
      if (e.key === "ArrowRight" || e.key === "d") setKeys(k => ({ ...k, right: false }));
      if (e.key === "ArrowUp" || e.key === "w") setKeys(k => ({ ...k, up: false }));
      if (e.key === " ") setKeys(k => ({ ...k, space: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Simple physics
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPosition(pos => {
        let newX = pos.x;
        let newY = pos.y;

        if (keys.left) newX -= 5;
        if (keys.right) newX += 5;
        if (keys.up && pos.y >= 400) newY -= 100; // Jump

        // Gravity
        if (newY < 400) newY += 5;
        if (newY > 400) newY = 400;

        // Boundaries
        newX = Math.max(50, Math.min(window.innerWidth - 100, newX));

        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [keys]);

  const handleSkillCollect = (skill: string) => {
    if (!collectedSkills.includes(skill)) {
      const newSkills = [...collectedSkills, skill];
      setCollectedSkills(newSkills);
      
      if (newSkills.length === level.skills.length) {
        setTimeout(() => onComplete(newSkills), 1000);
      }
    }
  };

  return (
    <div className="absolute inset-0">
      {/* Level description banner */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 100, opacity: 1 }}
        className="absolute left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border-2 border-primary rounded-lg px-6 py-3 max-w-xl text-center"
        style={{ boxShadow: '0 0 30px hsl(var(--neon-cyan) / 0.4)' }}
      >
        <p className="text-sm text-muted-foreground">{level.description}</p>
      </motion.div>

      {/* Ground platform */}
      <LevelPlatform />

      {/* Skill pickups */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-around px-20">
        {level.skills.map((skill, index) => (
          <SkillPickup
            key={skill}
            skill={skill}
            position={{ 
              x: (window.innerWidth / (level.skills.length + 1)) * (index + 1), 
              y: 350 
            }}
            playerPosition={playerPosition}
            onCollect={handleSkillCollect}
            isCollected={collectedSkills.includes(skill)}
            color={level.color}
          />
        ))}
      </div>

      {/* Player character */}
      <Player position={playerPosition} isMoving={keys.left || keys.right} />

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="text-sm text-muted-foreground mb-2">
          Skills: {collectedSkills.length} / {level.skills.length}
        </div>
        <div className="flex gap-2">
          {level.skills.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${
                i < collectedSkills.length
                  ? `bg-${level.color === 'cyan' ? 'neon-cyan' : level.color === 'purple' ? 'neon-purple' : 'neon-magenta'} border-current`
                  : 'border-muted-foreground'
              }`}
              style={i < collectedSkills.length ? { 
                boxShadow: `0 0 10px hsl(var(--neon-${level.color}))` 
              } : {}}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
