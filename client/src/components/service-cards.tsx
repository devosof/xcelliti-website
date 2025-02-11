import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { type Service } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ServiceCardsProps {
  services: Service[];
}

function ServiceCards({ services }: ServiceCardsProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={item}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={cn(
              "relative h-[300px] cursor-pointer overflow-hidden group",
              "transform transition-transform duration-500 ease-out",
              hoveredId === service.id && "scale-[1.02]"
            )}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${service.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
            </div>

            <div className="relative h-full flex flex-col justify-between p-6 text-white">
              <h3 className="text-2xl font-bold">{service.title}</h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredId === service.id ? 1 : 0,
                  y: hoveredId === service.id ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                className="text-sm leading-relaxed"
              >
                {service.description}
              </motion.p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ServiceCards;