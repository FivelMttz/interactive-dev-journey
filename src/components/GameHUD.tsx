import { motion } from "framer-motion";
import { Trophy, Briefcase, Calendar, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Level } from "./GameCanvas";

interface GameHUDProps {
  level: Level;
  totalSkills: number;
  currentLevelNumber: number;
  totalLevels: number;
  onMenuClick: () => void;
}

export const GameHUD = ({ level, totalSkills, currentLevelNumber, totalLevels, onMenuClick }: GameHUDProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-6">
      <div className="flex items-start justify-between gap-2">
        {/* Menu Button */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Button
            onClick={onMenuClick}
            size="sm"
            variant="outline"
            className="h-10 w-10 sm:h-12 sm:w-12 p-0"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </motion.div>
        {/* Center - Level info */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card/90 backdrop-blur-sm border-2 border-primary/50 rounded-lg p-2 sm:p-4 space-y-1 sm:space-y-2 flex-1 max-w-md"
          style={{ boxShadow: '0 0 20px hsl(var(--neon-cyan) / 0.3)' }}
        >
          <div className="flex items-center gap-2 text-primary justify-center">
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold text-sm sm:text-lg">LEVEL {currentLevelNumber}/{totalLevels}</span>
          </div>
          <div className="text-xs sm:text-sm text-center">
            <div className="font-bold text-foreground">{level.company}</div>
            <div className="text-muted-foreground hidden sm:block">{level.role}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 justify-center">
              <Calendar className="w-3 h-3" />
              {level.year}
            </div>
          </div>
        </motion.div>

        {/* Right side - Stats */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-card/90 backdrop-blur-sm border-2 border-secondary/50 rounded-lg p-2 sm:p-4"
          style={{ boxShadow: '0 0 20px hsl(var(--neon-purple) / 0.3)' }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            <div className="hidden sm:block">
              <div className="text-xs text-muted-foreground">SKILLS</div>
              <div className="text-2xl font-bold text-foreground">{totalSkills}</div>
            </div>
            <div className="sm:hidden text-xl font-bold text-foreground">{totalSkills}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
