import { motion } from "framer-motion";
import { Gamepad2, Code2, Zap } from "lucide-react";
import { Button } from "./ui/button";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center space-y-8 px-4 max-w-2xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Gamepad2 className="w-24 h-24 mx-auto text-primary animate-float" />
        </motion.div>

        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="text-6xl font-bold tracking-wider neon-text text-primary"
          style={{ textShadow: '0 0 20px hsl(var(--neon-cyan)), 0 0 40px hsl(var(--neon-cyan))' }}
        >
          DEVELOPER.EXE
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Adrian Fível Rangel
          </h2>
          <p className="text-muted-foreground text-lg">
            Software Developer / IoT Engineer
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-neon-cyan" />
              <span>6+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-neon-magenta" />
              <span>5 Career Levels</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground max-w-md mx-auto">
            Experience my career journey as an interactive 2D adventure. 
            Complete levels, collect skills, and unlock achievements from junior developer to technical lead.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="px-12 py-6 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
            style={{ 
              boxShadow: '0 0 30px hsl(var(--neon-cyan) / 0.5)',
              border: '2px solid hsl(var(--neon-cyan))'
            }}
          >
            <span className="relative z-10">START GAME</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground space-y-1"
        >
          <p>Use ARROW KEYS or WASD to move</p>
          <p>Press SPACE to interact</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
