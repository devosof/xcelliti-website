import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { type Job } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContactForm from "@/components/contact-form";

function Careers() {
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-center max-w-3xl mx-auto"
          >
            Be part of an innovative team that's shaping the future of technology
          </motion.p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="container py-16">
        <div className="grid gap-8 max-w-4xl mx-auto">
          {jobs?.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <p className="text-muted-foreground">{job.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements</h4>
                      <p className="text-muted-foreground">{job.requirements}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Apply Now</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <ContactForm />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Culture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We encourage creative thinking and innovative solutions
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Growth</h3>
              <p className="text-muted-foreground">
                Continuous learning and professional development
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Collaboration</h3>
              <p className="text-muted-foreground">
                Work with talented individuals in a supportive environment
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;
