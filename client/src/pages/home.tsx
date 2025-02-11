import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
import PartnersSection from "@/components/partners-section";
import ServiceCards from "@/components/service-cards";
import ClientCarousel from "@/components/client-carousel";
import ContactForm from "@/components/contact-form";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { type Service, type Client } from "@shared/schema";

function Home() {
  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: clients, isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24 bg-background"
      >
        <div className="container px-4 mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-[300px] rounded-lg" />
              ))}
            </div>
          ) : (
            services && <ServiceCards services={services} />
          )}
        </div>
      </motion.section>

      {/* Partners Section */}
      <PartnersSection />

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24 bg-gradient-to-b from-background to-muted"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Xcelliti
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Xcelliti provides customer-centric services and solutions to add value for everyday life.
              Highly regarded specifically for its Quality Services & Consultancy business, we continue
              to offer solutions and services for Customized Business Solution Development, Software Testing,
              and Training & Consultancy & Resource Outsourcing.
            </motion.p>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our sole purpose of existence is to build trustworthy relationships while providing
              Information Technology solutions to our clients that create the best return on their
              investment, maximize their production and facilitate their growth.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Clients Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24 bg-background"
      >
        <div className="container px-4 mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Clients
          </motion.h2>
          {clientsLoading ? (
            <Skeleton className="h-[100px] rounded-lg" />
          ) : (
            clients && <ClientCarousel clients={clients} />
          )}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24 bg-gradient-to-b from-background to-muted"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h2>
            <motion.div 
              className="bg-card rounded-lg p-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;