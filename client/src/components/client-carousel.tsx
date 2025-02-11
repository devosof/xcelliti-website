import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type Client } from "@shared/schema";

interface ClientCarouselProps {
  clients: Client[];
}

function ClientCarousel({ clients }: ClientCarouselProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 1);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const loopedClients = [...clients, ...clients];

  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex items-center gap-8"
        animate={{
          x: offset,
        }}
        style={{
          width: `${clients.length * 200}px`,
        }}
      >
        {loopedClients.map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className="flex-shrink-0 w-[150px] h-[100px]"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default ClientCarousel;
