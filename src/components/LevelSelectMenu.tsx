import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import { Level } from "./GameCanvas";

interface LevelSelectMenuProps {
  levels: Level[];
  onSelectLevel: (levelId: number) => void;
  completedLevels: number[];
  currentLevel: number;
}

export const LevelSelectMenu = ({ 
  levels, 
  onSelectLevel, 
  completedLevels,
  currentLevel 
}: LevelSelectMenuProps) => {
  const isLevelUnlocked = (levelId: number) => {
    return levelId === 1 || completedLevels.includes(levelId - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-game-bg/95 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="max-w-4xl w-full px-4 sm:px-8 py-8">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 font-mono"
          style={{
            textShadow: '0 0 20px hsl(var(--neon-cyan))',
          }}
        >
          SELECT_LEVEL.EXE
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {levels.map((level, index) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = completedLevels.includes(level.id);
            const isCurrent = level.id === currentLevel;

            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => unlocked && onSelectLevel(level.id)}
                disabled={!unlocked}
                className={`
                  relative p-4 sm:p-6 rounded-lg border-2 text-left transition-all
                  ${unlocked 
                    ? `bg-card/80 backdrop-blur-sm hover:scale-105 cursor-pointer border-${level.color === 'cyan' ? 'neon-cyan' : level.color === 'purple' ? 'neon-purple' : 'neon-magenta'}` 
                    : 'bg-muted/20 border-muted cursor-not-allowed opacity-50'}
                  ${isCurrent ? 'ring-2 sm:ring-4 ring-primary' : ''}
                `}
                style={unlocked ? {
                  boxShadow: `0 0 20px hsl(var(--neon-${level.color}) / 0.3)`
                } : {}}
              >
                {/* Status Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  ) : !unlocked ? (
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                  ) : null}
                </div>

                {/* Level Number */}
                <div className="text-xs sm:text-sm text-muted-foreground mb-2 font-mono">
                  LEVEL_{level.id.toString().padStart(2, '0')}
                </div>

                {/* Company & Role */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 font-mono">
                  {level.company}
                </h3>
                <p className="text-xs sm:text-sm text-primary mb-2">{level.role}</p>
                <p className="text-xs text-muted-foreground mb-3">{level.year}</p>

                {/* Challenge */}
                {unlocked && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">CHALLENGE:</p>
                    <p className="text-sm">{level.challenge}</p>
                  </div>
                )}

                {/* Skills Preview */}
                {unlocked && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {level.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded bg-background/50 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
