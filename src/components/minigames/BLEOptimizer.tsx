import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Activity, Check } from "lucide-react";
import { Button } from "../ui/button";

interface BLEOptimizerProps {
  onComplete: (skills: string[]) => void;
  skills: string[];
}

export const BLEOptimizer = ({ onComplete, skills }: BLEOptimizerProps) => {
  const [score, setScore] = useState(0);
  const [signals, setSignals] = useState<{ id: number; position: number; speed: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const targetZone = 50;
  const animationRef = useRef<number>();

  useEffect(() => {
    // Generate initial signals
    const initialSignals = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      position: Math.random() * 100,
      speed: 0.5 + Math.random() * 1
    }));
    setSignals(initialSignals);
  }, []);

  useEffect(() => {
    if (score >= 4) {
      setTimeout(() => onComplete(skills), 1500);
    }
  }, [score, skills, onComplete]);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setSignals(prev =>
          prev.map(signal => ({
            ...signal,
            position: (signal.position + signal.speed) % 100
          }))
        );
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const handleSync = () => {
    let hits = 0;
    signals.forEach(signal => {
      const distance = Math.abs(signal.position - targetZone);
      if (distance < 5) {
        hits++;
      }
    });
    
    if (hits > 0) {
      setScore(prev => prev + hits);
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 500);
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/95 backdrop-blur-sm border-2 border-neon-cyan rounded-lg p-4 sm:p-8"
          style={{ boxShadow: '0 0 30px hsl(var(--neon-cyan) / 0.4)' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-mono text-neon-cyan">
            BLE CONNECTION OPTIMIZER
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Sync all 4 signals when they reach the target zone
          </p>

          {/* Signal Display */}
          <div className="space-y-4 mb-6">
            {signals.map((signal, index) => (
              <div key={signal.id} className="relative">
                <div className="h-12 sm:h-16 bg-muted/50 rounded-lg overflow-hidden border border-border">
                  {/* Target Zone */}
                  <div
                    className="absolute top-0 bottom-0 bg-green-500/20 border-x-2 border-green-500"
                    style={{
                      left: `${targetZone - 2.5}%`,
                      width: '10%'
                    }}
                  />
                  {/* Signal */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-2 bg-neon-cyan"
                    style={{
                      left: `${signal.position}%`,
                      boxShadow: '0 0 10px hsl(var(--neon-cyan))'
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity
                    }}
                  />
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {!isPlaying ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg font-bold"
              >
                START SYNC
              </Button>
            ) : (
              <Button
                onClick={handleSync}
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg font-bold bg-neon-cyan hover:bg-neon-cyan/80"
              >
                SYNC NOW!
              </Button>
            )}
          </div>

          <div className="mt-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl font-bold">
              {score >= 4 ? (
                <span className="text-green-500 flex items-center justify-center gap-2">
                  <Check className="w-6 h-6 sm:w-8 sm:h-8" />
                  OPTIMIZED!
                </span>
              ) : (
                <span>Synced: {score} / 4</span>
              )}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Press SYNC when signals are in the green zone
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};