import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Thermometer, Wind, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface SensorMonitorProps {
  onComplete: (skills: string[]) => void;
  skills: string[];
}

export const SensorMonitor = ({ onComplete, skills }: SensorMonitorProps) => {
  const [sensors, setSensors] = useState([
    { name: "Humidity", icon: Droplets, value: 30, optimal: 65, inRange: false },
    { name: "Temperature", icon: Thermometer, value: 15, optimal: 25, inRange: false },
    { name: "Wind Speed", icon: Wind, value: 80, optimal: 45, inRange: false },
    { name: "Light", icon: Sun, value: 20, optimal: 70, inRange: false }
  ]);

  useEffect(() => {
    const allInRange = sensors.every(s => s.inRange);
    if (allInRange) {
      setTimeout(() => onComplete(skills), 1500);
    }
  }, [sensors, skills, onComplete]);

  const handleSliderChange = (index: number, value: number[]) => {
    setSensors(prev => {
      const newSensors = [...prev];
      const sensor = newSensors[index];
      sensor.value = value[0];
      sensor.inRange = Math.abs(sensor.value - sensor.optimal) <= 5;
      return newSensors;
    });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/95 backdrop-blur-sm border-2 border-neon-purple rounded-lg p-4 sm:p-8"
          style={{ boxShadow: '0 0 30px hsl(var(--neon-purple) / 0.4)' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-mono text-neon-purple">
            AGRICULTURAL IoT MONITORING
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Adjust each sensor to its optimal range
          </p>

          <div className="space-y-6">
            {sensors.map((sensor, index) => {
              const Icon = sensor.icon;
              return (
                <motion.div
                  key={sensor.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    sensor.inRange
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-border bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${sensor.inRange ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <span className="font-bold text-sm sm:text-base">{sensor.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-bold">{sensor.value}</div>
                      <div className="text-xs text-muted-foreground">Target: {sensor.optimal}</div>
                    </div>
                  </div>
                  <Slider
                    value={[sensor.value]}
                    onValueChange={(value) => handleSliderChange(index, value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              Calibrated: {sensors.filter(s => s.inRange).length} / 4
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};