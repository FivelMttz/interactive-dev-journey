import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bluetooth, Check } from "lucide-react";
import { Button } from "../ui/button";

interface BluetoothConnectorProps {
  onComplete: (skills: string[]) => void;
  skills: string[];
}

export const BluetoothConnector = ({ onComplete, skills }: BluetoothConnectorProps) => {
  const [connections, setConnections] = useState<boolean[]>([false, false, false, false]);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);

  const devices = [
    { name: "Smart Bulb", icon: "💡" },
    { name: "Thermostat", icon: "🌡️" },
    { name: "Door Lock", icon: "🔒" },
    { name: "Security Cam", icon: "📷" }
  ];

  useEffect(() => {
    if (connections.every(c => c)) {
      setTimeout(() => onComplete(skills), 1500);
    }
  }, [connections, skills, onComplete]);

  const handleConnect = (index: number) => {
    setSelectedDevice(index);
    setTimeout(() => {
      setConnections(prev => {
        const newConnections = [...prev];
        newConnections[index] = true;
        return newConnections;
      });
      setSelectedDevice(null);
    }, 800);
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
            BLUETOOTH LE PROTOCOL
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Connect all 4 smart devices to complete the setup
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {devices.map((device, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => !connections[index] && handleConnect(index)}
                  disabled={connections[index] || selectedDevice !== null}
                  className={`w-full h-24 sm:h-32 text-lg sm:text-xl font-bold transition-all ${
                    connections[index]
                      ? 'bg-green-600 hover:bg-green-600'
                      : selectedDevice === index
                      ? 'bg-yellow-600 animate-pulse'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl sm:text-4xl">{device.icon}</span>
                    <span className="text-sm sm:text-base">{device.name}</span>
                    {connections[index] ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <Bluetooth className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              Connected: {connections.filter(c => c).length} / 4
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};