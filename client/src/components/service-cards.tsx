import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { type Service } from "@shared/schema";

interface ServiceCardsProps {
  services: Service[];
}

function ServiceCards({ services }: ServiceCardsProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="relative h-[300px] cursor-pointer perspective-1000"
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                rotateY: hoveredId === service.id ? 180 : 0,
              }}
              transition={{ duration: 0.6 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-center justify-center p-6 text-white">
                  <h3 className="text-2xl font-bold text-center">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-primary p-6 text-white flex items-center justify-center"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <p className="text-center">{service.description}</p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default ServiceCards;
