import { useQuery } from "@tanstack/react-query";
import ServiceSlider from "@/components/service-slider";
import ServiceCards from "@/components/service-cards";
import ClientCarousel from "@/components/client-carousel";
import ContactForm from "@/components/contact-form";
import { type Service, type Client } from "@shared/schema";

function Home() {
  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: clients } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  return (
    <div>
      {/* Hero Section */}
      {services && <ServiceSlider services={services} />}

      {/* Services Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        {services && <ServiceCards services={services} />}
      </section>

      {/* Clients Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Our Clients</h2>
          {clients && <ClientCarousel clients={clients} />}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default Home;
