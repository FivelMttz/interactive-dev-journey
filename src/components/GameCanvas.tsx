import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CareerLevel } from "./CareerLevel";
import { GameHUD } from "./GameHUD";
import { StartScreen } from "./StartScreen";
import { LevelComplete } from "./LevelComplete";
import { LevelSelectMenu } from "./LevelSelectMenu";

export interface Level {
  id: number;
  company: string;
  role: string;
  year: string;
  description: string;
  skills: string[];
  challenge: string;
  color: string;
}

const levels: Level[] = [
  {
    id: 1,
    company: "Edison Effect",
    role: "Android Developer Jr.",
    year: "2017-2018",
    description: "Home automation & IoT devices",
    skills: ["Android", "Java", "Bluetooth LE", "IoT"],
    challenge: "Connect 4 smart devices using Bluetooth LE protocol",
    color: "cyan"
  },
  {
    id: 2,
    company: "Synergy",
    role: "IoT Engineer",
    year: "2018-2020",
    description: "Agricultural IoT & monitoring systems",
    skills: ["Python", "Redis", "LoRa", "Sigfox"],
    challenge: "Monitor and automate irrigation for 4 sensor nodes",
    color: "purple"
  },
  {
    id: 3,
    company: "Nearsoft / Encora",
    role: "Software Developer Intern",
    year: "2020-2021",
    description: "Web platforms & agile methodologies",
    skills: ["React", "Java Spring", "PHP", "Agile"],
    challenge: "Build art gallery platform with 4 core features",
    color: "magenta"
  },
  {
    id: 4,
    company: "ITJ & Dexcom",
    role: "Software Engineer",
    year: "2021-2022",
    description: "Medical IoT for 150k+ users worldwide",
    skills: ["Kotlin", "Medical IoT", "Wear OS", "BLE"],
    challenge: "Optimize BLE connection for CGM device accuracy",
    color: "cyan"
  },
  {
    id: 5,
    company: "Seguritech",
    role: "Software Developer Lead",
    year: "2023-Present",
    description: "AI automation & team leadership",
    skills: ["AI/ML", "Leadership", "Google Cloud", "Spring"],
    challenge: "Lead AI automation projects across multiple teams",
    color: "purple"
  }
];

export const GameCanvas = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleStartGame = () => {
    setGameStarted(true);
    setShowLevelSelect(true);
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevel(levelId - 1);
    setShowLevelSelect(false);
  };

  const handleLevelComplete = (skills: string[]) => {
    setCollectedSkills([...collectedSkills, ...skills]);
    if (!completedLevels.includes(levels[currentLevel].id)) {
      setCompletedLevels([...completedLevels, levels[currentLevel].id]);
    }
    setShowLevelComplete(true);
  };

  const handleNextLevel = () => {
    setShowLevelComplete(false);
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setShowLevelSelect(true);
    }
  };

  const handleBackToMenu = () => {
    setShowLevelComplete(false);
    setShowLevelSelect(true);
  };

  return (
    <div ref={canvasRef} className="relative w-full h-screen overflow-hidden bg-game-bg">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="scanline h-1 w-full bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>

      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <StartScreen key="start" onStart={handleStartGame} />
        ) : showLevelSelect ? (
          <LevelSelectMenu
            key="select"
            levels={levels}
            onSelectLevel={handleSelectLevel}
            completedLevels={completedLevels}
            currentLevel={currentLevel + 1}
          />
        ) : showLevelComplete ? (
          <LevelComplete 
            key="complete"
            level={levels[currentLevel]}
            onNext={handleNextLevel}
            onBackToMenu={handleBackToMenu}
            isLastLevel={currentLevel === levels.length - 1}
          />
        ) : (
          <motion.div
            key={`level-${currentLevel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full"
          >
            <GameHUD 
              level={levels[currentLevel]} 
              totalSkills={collectedSkills.length}
              currentLevelNumber={currentLevel + 1}
              totalLevels={levels.length}
            />
            <CareerLevel 
              level={levels[currentLevel]}
              onComplete={handleLevelComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
