import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Client } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientCarouselProps {
  clients: Client[];
}

function ClientCarousel({ clients }: ClientCarouselProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        if (prev <= -100) {
          return 0;
        }
        return prev - 0.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const loopedClients = [...clients, ...clients, ...clients];

  return (
    <div className="overflow-hidden relative py-8">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex items-center gap-12"
        animate={{
          x: `${offset}%`,
        }}
        style={{
          width: `${clients.length * 300}%`,
        }}
        transition={{
          duration: 0,
          ease: "linear",
        }}
      >
        {loopedClients.map((client, index) => (
          <motion.div
            key={`${client.id}-${index}`}
            className="flex-shrink-0 w-[200px] h-[120px] relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-muted/5 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <img
              src={client.logo}
              alt={client.name}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
              loading="lazy"
            />
            {client.website && (
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"
                aria-label={`Visit ${client.name}'s website`}
              >
                Visit Website
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ClientCarousel;