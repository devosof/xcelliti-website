import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { type Service } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-primary/20 pointer-events-none"
        />
        <div className="relative container max-w-4xl mx-auto px-4 py-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-center leading-relaxed"
          >
            Comprehensive technology solutions tailored to your business needs
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-24">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
        >
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(null).map((_, index) => (
              <Card key={index} className="relative overflow-hidden">
                <Skeleton className="absolute inset-0" />
                <CardHeader className="relative z-10">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardHeader>
              </Card>
            ))
          ) : (
            services?.map((service, index) => (
              <motion.div
                key={service.id}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl mb-4 relative">
                      <span className="relative z-10">{service.title}</span>
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 rounded"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-primary/20 pointer-events-none"
        />
        <div className="relative container max-w-4xl mx-auto text-center px-4 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-8 leading-relaxed"
          >
            Contact us today to learn how we can help transform your business with our comprehensive technology solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="/contact"
              className="bg-primary text-white px-8 py-4 rounded-md hover:bg-primary/90 transition-colors inline-block text-lg font-medium relative group"
            >
              <span className="relative z-10">Contact Us</span>
              <motion.div 
                className="absolute inset-0 bg-white rounded-md"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.2 }}
              />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;