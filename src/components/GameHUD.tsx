import { motion } from "framer-motion";
import { Trophy, Briefcase, Calendar } from "lucide-react";
import { Level } from "./GameCanvas";

interface GameHUDProps {
  level: Level;
  totalSkills: number;
  currentLevelNumber: number;
  totalLevels: number;
}

export const GameHUD = ({ level, totalSkills, currentLevelNumber, totalLevels }: GameHUDProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-6">
      <div className="flex items-start justify-between">
        {/* Left side - Level info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-card/90 backdrop-blur-sm border-2 border-primary/50 rounded-lg p-4 space-y-2"
          style={{ boxShadow: '0 0 20px hsl(var(--neon-cyan) / 0.3)' }}
        >
          <div className="flex items-center gap-2 text-primary">
            <Briefcase className="w-5 h-5" />
            <span className="font-bold text-lg">LEVEL {currentLevelNumber}/{totalLevels}</span>
          </div>
          <div className="text-sm">
            <div className="font-bold text-foreground">{level.company}</div>
            <div className="text-muted-foreground">{level.role}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Calendar className="w-3 h-3" />
              {level.year}
            </div>
          </div>
        </motion.div>

        {/* Right side - Stats */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-card/90 backdrop-blur-sm border-2 border-secondary/50 rounded-lg p-4"
          style={{ boxShadow: '0 0 20px hsl(var(--neon-purple) / 0.3)' }}
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-secondary" />
            <div>
              <div className="text-xs text-muted-foreground">SKILLS COLLECTED</div>
              <div className="text-2xl font-bold text-foreground">{totalSkills}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Challenge objective */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 mx-auto max-w-2xl bg-card/80 backdrop-blur-sm border border-accent/50 rounded-lg p-3"
        style={{ boxShadow: '0 0 15px hsl(var(--neon-magenta) / 0.2)' }}
      >
        <div className="text-xs text-accent font-bold mb-1">MISSION OBJECTIVE:</div>
        <div className="text-sm text-foreground">{level.challenge}</div>
      </motion.div>
    </div>
  );
};
