import { useQuery } from "@tanstack/react-query";
import ServiceSlider from "@/components/service-slider";
import ServiceCards from "@/components/service-cards";
import ClientCarousel from "@/components/client-carousel";
import ContactForm from "@/components/contact-form";
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
      {servicesLoading ? (
        <div className="h-[600px] bg-muted animate-pulse" />
      ) : (
        services && <ServiceSlider services={services} />
      )}

      {/* Services Section */}
      <section className="container py-24">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        {servicesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(null).map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-lg" />
            ))}
          </div>
        ) : (
          services && <ServiceCards services={services} />
        )}
      </section>

      {/* About Section */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">About Xcelliti</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Xcelliti provides customer-centric services and solutions to add value for everyday life.
              Highly regarded specifically for its Quality Services & Consultancy business, we continue
              to offer solutions and services for Customized Business Solution Development, Software Testing,
              and Training & Consultancy & Resource Outsourcing.
            </p>
            <p className="text-lg text-muted-foreground">
              Our sole purpose of existence is to build trustworthy relationships while providing
              Information Technology solutions to our clients that create the best return on their
              investment, maximize their production and facilitate their growth.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Our Clients</h2>
          {clientsLoading ? (
            <Skeleton className="h-[100px] rounded-lg" />
          ) : (
            clients && <ClientCarousel clients={clients} />
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
            <div className="bg-background rounded-lg p-8 shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;