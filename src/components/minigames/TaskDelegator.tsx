import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Bot, Code, Cloud } from "lucide-react";
import { Button } from "../ui/button";

interface TaskDelegatorProps {
  onComplete: (skills: string[]) => void;
  skills: string[];
}

export const TaskDelegator = ({ onComplete, skills }: TaskDelegatorProps) => {
  const [assignments, setAssignments] = useState<(number | null)[]>([null, null, null, null]);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const tasks = [
    { name: "AI Model Training", icon: Bot, team: 0 },
    { name: "Backend API", icon: Code, team: 1 },
    { name: "Cloud Infrastructure", icon: Cloud, team: 2 },
    { name: "Team Coordination", icon: Users, team: 3 }
  ];

  const teams = [
    { name: "ML Team", color: "text-blue-400" },
    { name: "Backend Team", color: "text-green-400" },
    { name: "DevOps Team", color: "text-purple-400" },
    { name: "Product Team", color: "text-orange-400" }
  ];

  useEffect(() => {
    const allAssigned = assignments.every((a, i) => a === tasks[i].team);
    if (allAssigned) {
      setTimeout(() => onComplete(skills), 1500);
    }
  }, [assignments, skills, onComplete]);

  const handleSelectTask = (index: number) => {
    if (assignments[index] === null) {
      setSelectedTask(index);
    }
  };

  const handleAssignTeam = (teamIndex: number) => {
    if (selectedTask !== null) {
      setAssignments(prev => {
        const newAssignments = [...prev];
        newAssignments[selectedTask] = teamIndex;
        return newAssignments;
      });
      setSelectedTask(null);
    }
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
            AI PROJECT LEADERSHIP
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Assign each task to the correct team
          </p>

          {/* Tasks */}
          <div className="space-y-3 mb-6">
            {tasks.map((task, index) => {
              const Icon = task.icon;
              const isAssigned = assignments[index] !== null;
              const isCorrect = assignments[index] === task.team;
              return (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleSelectTask(index)}
                    disabled={isAssigned}
                    className={`w-full h-16 sm:h-20 text-base sm:text-lg font-bold justify-start px-4 sm:px-6 ${
                      selectedTask === index
                        ? 'bg-neon-purple/50 ring-2 ring-neon-purple'
                        : isAssigned && isCorrect
                        ? 'bg-green-600 hover:bg-green-600'
                        : isAssigned && !isCorrect
                        ? 'bg-red-600 hover:bg-red-600'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                    <div className="flex-1 text-left">
                      <div>{task.name}</div>
                      {isAssigned && (
                        <div className="text-xs sm:text-sm opacity-80">
                          → {teams[assignments[index]!].name}
                        </div>
                      )}
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Teams */}
          <div className="border-t-2 border-border pt-4">
            <p className="text-sm text-muted-foreground mb-3 text-center">
              {selectedTask !== null ? "Assign to team:" : "Select a task first"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {teams.map((team, index) => (
                <Button
                  key={index}
                  onClick={() => handleAssignTeam(index)}
                  disabled={selectedTask === null}
                  className={`h-20 sm:h-24 text-sm sm:text-base font-bold ${
                    selectedTask !== null
                      ? 'bg-muted hover:bg-muted/80'
                      : 'bg-muted/20 opacity-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className={`w-5 h-5 sm:w-6 sm:h-6 ${team.color}`} />
                    <span className="text-xs sm:text-sm">{team.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              Assigned: {assignments.filter(a => a !== null).length} / 4
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};