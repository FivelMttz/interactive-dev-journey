import { Level } from "./GameCanvas";
import { BluetoothConnector } from "./minigames/BluetoothConnector";
import { SensorMonitor } from "./minigames/SensorMonitor";
import { ArtGallery } from "./minigames/ArtGallery";
import { BLEOptimizer } from "./minigames/BLEOptimizer";
import { TaskDelegator } from "./minigames/TaskDelegator";

interface CareerLevelProps {
  level: Level;
  onComplete: (skills: string[]) => void;
}

export const CareerLevel = ({ level, onComplete }: CareerLevelProps) => {
  const renderMinigame = () => {
    switch (level.id) {
      case 1:
        return <BluetoothConnector onComplete={onComplete} skills={level.skills} />;
      case 2:
        return <SensorMonitor onComplete={onComplete} skills={level.skills} />;
      case 3:
        return <ArtGallery onComplete={onComplete} skills={level.skills} />;
      case 4:
        return <BLEOptimizer onComplete={onComplete} skills={level.skills} />;
      case 5:
        return <TaskDelegator onComplete={onComplete} skills={level.skills} />;
      default:
        return null;
    }
  };

  return <>{renderMinigame()}</>;
};
