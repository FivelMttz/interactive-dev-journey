import { motion } from "framer-motion";
import { Trophy, ChevronRight, Award, Star, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Level } from "./GameCanvas";

interface LevelCompleteProps {
  level: Level;
  onNext: () => void;
  onBackToMenu?: () => void;
  isLastLevel: boolean;
}

export const LevelComplete = ({ level, onNext, onBackToMenu, isLastLevel }: LevelCompleteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="text-center space-y-4 sm:space-y-8 px-4 max-w-2xl my-auto">
        {/* Trophy animation */}
        <motion.div
          initial={{ y: -100, rotate: -180, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <Trophy 
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto text-secondary" 
            style={{ filter: 'drop-shadow(0 0 30px hsl(var(--neon-purple)))' }}
          />
        </motion.div>

        {/* Level complete text */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 neon-text"
            style={{ textShadow: '0 0 20px hsl(var(--neon-purple)), 0 0 40px hsl(var(--neon-purple))' }}
          >
            LEVEL COMPLETE!
          </h2>
          <div className="text-xl sm:text-2xl font-bold text-foreground">{level.company}</div>
        </motion.div>

        {/* Achievement card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card border-2 border-secondary/50 rounded-lg p-4 sm:p-6 space-y-4"
          style={{ boxShadow: '0 0 30px hsl(var(--neon-purple) / 0.3)' }}
        >
          <div className="flex items-center justify-center gap-2 text-secondary">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-bold text-base sm:text-lg">SKILLS MASTERED</span>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {level.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 0.8 + index * 0.1 
                }}
                className="flex items-center gap-2 bg-muted border border-secondary/30 rounded-lg px-4 py-2"
              >
                <Star className="w-4 h-4 text-secondary" />
                <span className="text-sm font-bold text-foreground">{skill}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground pt-4 border-t border-border">
            <p className="italic">"{level.description}"</p>
            <p className="mt-2 text-xs">{level.year}</p>
          </div>
        </motion.div>

        {/* Continue buttons */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          {onBackToMenu && (
            <Button
              onClick={onBackToMenu}
              size="lg"
              variant="outline"
              className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-bold w-full sm:w-auto"
            >
              <Menu className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              MENU
            </Button>
          )}
          <Button
            onClick={onNext}
            size="lg"
            className="px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto"
            style={{ 
              boxShadow: '0 0 30px hsl(var(--neon-purple) / 0.5)',
              border: '2px solid hsl(var(--neon-purple))'
            }}
          >
            {isLastLevel ? (
              <>COMPLETE JOURNEY</>
            ) : (
              <>
                NEXT LEVEL <ChevronRight className="ml-2 w-6 h-6" />
              </>
            )}
          </Button>
        </motion.div>

        {isLastLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-2"
          >
            <p className="text-base sm:text-lg font-bold text-foreground">
              🎉 Congratulations! Career Journey Complete! 🎉
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Contact: fivel10@hotmail.com | +52 4445455888
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-xs text-muted-foreground pt-2">
              <a 
                href="https://linkedin.com/in/fivelrangel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://fivelrangel.github.io/FivelRangel/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Portfolio
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
