import { motion } from "framer-motion";

const stats = [
  { label: "Years of Experience", value: "10+" },
  { label: "Successful Projects", value: "500+" },
  { label: "Happy Clients", value: "200+" },
  { label: "Team Members", value: "50+" },
];

const team = [
  {
    name: "Muhammad Kashif Jamil",
    role: "CEO",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=kashif",
    linkedin: "#",
  },
  {
    name: "Ali Ataullah Khan",
    role: "Head of Operations",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=ali",
    linkedin: "#",
  },
];

function About() {
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
            About Xcelliti
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-center max-w-3xl mx-auto"
          >
            We are a leading technology solutions provider committed to driving
            innovation and excellence in every project we undertake.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To empower businesses through innovative technology solutions that
              drive growth and success.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              To be the global leader in delivering transformative technology
              solutions that shape the future of business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-muted-foreground mb-2">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                LinkedIn Profile
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
