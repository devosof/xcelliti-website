import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { type Partner } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function PartnersSection() {
  const { data: partners, isLoading, error } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {Array(4).fill(null).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <AlertCircle className="mr-2 h-4 w-4" />
        <p>Failed to load partners</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by Industry Leaders
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners?.filter(p => p.isActive).map((partner, index) => (
            <motion.div
              key={partner.id}
              className="group relative bg-card hover:bg-card/80 rounded-xl p-6 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-24 flex items-center justify-center mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">{partner.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {partner.description}
                </p>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
