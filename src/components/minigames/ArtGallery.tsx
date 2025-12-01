import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image, Check } from "lucide-react";
import { Button } from "../ui/button";

interface ArtGalleryProps {
  onComplete: (skills: string[]) => void;
  skills: string[];
}

export const ArtGallery = ({ onComplete, skills }: ArtGalleryProps) => {
  const [artworks, setArtworks] = useState([
    { id: 1, placed: false, position: null as number | null },
    { id: 2, placed: false, position: null as number | null },
    { id: 3, placed: false, position: null as number | null },
    { id: 4, placed: false, position: null as number | null }
  ]);
  const [selectedArt, setSelectedArt] = useState<number | null>(null);

  const walls = [0, 1, 2, 3];

  useEffect(() => {
    if (artworks.every(art => art.placed)) {
      setTimeout(() => onComplete(skills), 1500);
    }
  }, [artworks, skills, onComplete]);

  const handleSelectArt = (id: number) => {
    setSelectedArt(id);
  };

  const handlePlaceArt = (wallIndex: number) => {
    if (selectedArt !== null) {
      const isWallOccupied = artworks.some(art => art.position === wallIndex);
      if (!isWallOccupied) {
        setArtworks(prev =>
          prev.map(art =>
            art.id === selectedArt
              ? { ...art, placed: true, position: wallIndex }
              : art
          )
        );
        setSelectedArt(null);
      }
    }
  };

  const getArtEmoji = (id: number) => {
    const emojis = ["🖼️", "🎨", "🌆", "🌃"];
    return emojis[id - 1];
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/95 backdrop-blur-sm border-2 border-neon-magenta rounded-lg p-4 sm:p-8"
          style={{ boxShadow: '0 0 30px hsl(var(--neon-magenta) / 0.4)' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-mono text-neon-magenta">
            ART GALLERY PLATFORM
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Place all 4 artworks on the gallery walls
          </p>

          {/* Gallery Walls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {walls.map((wallIndex) => {
              const artwork = artworks.find(art => art.position === wallIndex);
              return (
                <motion.div
                  key={wallIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: wallIndex * 0.1 }}
                >
                  <Button
                    onClick={() => handlePlaceArt(wallIndex)}
                    disabled={!selectedArt || artwork !== undefined}
                    className={`w-full h-32 sm:h-40 text-4xl sm:text-6xl ${
                      artwork
                        ? 'bg-green-600 hover:bg-green-600'
                        : selectedArt
                        ? 'bg-accent hover:bg-accent/80'
                        : 'bg-muted/50 hover:bg-muted/30'
                    }`}
                  >
                    {artwork ? (
                      <div className="flex flex-col items-center gap-2">
                        <span>{getArtEmoji(artwork.id)}</span>
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <Image className="w-8 h-8 sm:w-12 sm:h-12 opacity-30" />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Artwork Selection */}
          <div className="border-t-2 border-border pt-4">
            <p className="text-sm text-muted-foreground mb-3 text-center">Select artwork to place:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {artworks.map((art) => (
                <Button
                  key={art.id}
                  onClick={() => !art.placed && handleSelectArt(art.id)}
                  disabled={art.placed}
                  className={`h-20 sm:h-24 text-3xl sm:text-4xl ${
                    selectedArt === art.id
                      ? 'bg-neon-magenta/50 hover:bg-neon-magenta/50 ring-2 ring-neon-magenta'
                      : art.placed
                      ? 'bg-muted/20 opacity-50'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {art.placed ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    getArtEmoji(art.id)
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              Placed: {artworks.filter(art => art.placed).length} / 4
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};