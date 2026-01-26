import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { projectsData } from '@/data/projects';

export const Projects = () => {
  return (
    <section id="projects" className="bg-forest-50/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Projects"
          subtitle="Recent projects in AI automation, backend systems, and full-stack development."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="flex h-full flex-col">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-forest-100 to-mountain-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <p className="text-sm text-earth-500">{project.description}</p>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="mb-4 text-sm text-earth-600">{project.longDescription}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-mountain-50 px-2 py-1 text-xs text-mountain-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  )}
                  {(project.demo || project.live) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(project.demo || project.live, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {project.live ? 'Live' : 'Demo'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
