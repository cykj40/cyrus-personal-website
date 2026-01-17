import { motion } from 'framer-motion';
import { Code2, Mountain, TreePine, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { skillsData } from '@/data/skills';

const values = [
  {
    icon: TreePine,
    title: 'Grounded',
    description: 'Like a tree with deep roots, I build on solid foundations and proven principles.',
  },
  {
    icon: Mountain,
    title: 'Disciplined',
    description: 'Every line of code is intentional. Every feature serves a purpose.',
  },
  {
    icon: Zap,
    title: 'Relentless',
    description: "I don't stop at \"good enough.\" I iterate until it's right.",
  },
  {
    icon: Code2,
    title: 'Pragmatic',
    description: 'Technology is a tool, not the goal. I focus on solving real problems.',
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="About Me"
          subtitle="Building at the intersection of code, nature, and relentless curiosity"
        />

        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-earth-600"
          >
            <p className="text-lg leading-relaxed">
              I'm a <strong className="text-forest-700">full-stack developer</strong> who builds
              intelligent systems that actually work. My background spans health tech integrations,
              AI automation, and developer tools—always with a focus on clean code and real-world
              impact.
            </p>
            <p className="text-lg leading-relaxed">
              Whether I'm building{' '}
              <strong className="text-mountain-600">MCP servers for Claude Desktop</strong>,
              integrating <strong className="text-forest-700">Dexcom CGM data</strong>, or creating
              full-stack web applications, I bring discipline and precision to every project.
            </p>
            <p className="text-lg leading-relaxed">
              Outside of code, you'll find me in the mountains—hiking, backpacking, and recharging
              in nature. I believe the best solutions come from a grounded, focused mind.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} hover className="text-center">
                  <CardContent className="pt-6">
                    <div className="mb-3 flex justify-center">
                      <div className="rounded-full bg-forest-100 p-3">
                        <Icon className="h-6 w-6 text-forest-600" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-bold text-forest-900">{value.title}</h3>
                    <p className="text-sm text-earth-500">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-forest-900">Tech Stack</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillsData.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-forest-50 px-3 py-1 text-sm text-forest-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
