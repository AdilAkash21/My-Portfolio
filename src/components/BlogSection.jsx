import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, FileText, AlertTriangle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
const normalArticles = [
  {
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "A deep dive into utility-first CSS and how Tailwind CSS can speed up your development workflow while maintaining clean, maintainable code.",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    tags: ["CSS", "Tailwind", "Frontend"]
  },
  {
    title: "React Performance: Tips & Tricks",
    excerpt: "Practical strategies for optimizing React applications \u2014 from lazy loading and memoization to bundle splitting and efficient state management.",
    date: "Feb 28, 2026",
    readTime: "8 min read",
    tags: ["React", "Performance", "JavaScript"]
  },
  {
    title: "Getting Started with TypeScript",
    excerpt: "Why TypeScript is a game-changer for JavaScript developers, and how to gradually adopt it in your existing projects without the headaches.",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript", "Tutorial"]
  }
];
const batmanArticles = [
  {
    title: "Gotham Threat Assessment: Q1 2026",
    excerpt: "Classified analysis of emerging threats in Gotham's underworld. Joker activity remains dormant but Scarecrow sightings have increased 300%.",
    date: "Mar 15, 2026",
    readTime: "12 min read",
    tags: ["Classified", "Threat Intel", "Priority Alpha"]
  },
  {
    title: "Batcomputer Neural Network v7 Changelog",
    excerpt: "Major upgrades to predictive crime modeling \u2014 now incorporating real-time satellite feeds and GCPD radio intercepts for 94% accuracy.",
    date: "Feb 28, 2026",
    readTime: "10 min read",
    tags: ["Tech Specs", "AI", "Internal"]
  },
  {
    title: "Arkham Breakout Contingency Protocols",
    excerpt: "Updated standard operating procedures for mass Arkham breakout scenarios. Covers containment zones, civilian evacuation, and villain priority targeting.",
    date: "Jan 10, 2026",
    readTime: "15 min read",
    tags: ["Protocol", "Emergency", "Top Secret"]
  }
];
const BlogSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const articles = isBatman ? batmanArticles : normalArticles;
  return <section id="blog" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
          <h2 className="font-mono text-sm text-primary mb-2">05.</h2>
          <h3 className="text-3xl font-bold mb-12">
            {isBatman ? "Classified Briefings" : "Blog & Articles"}
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {articles.map((article, i) => <motion.article
    key={article.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 * i }}
    className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors flex flex-col cursor-pointer"
  >
              {
    /* Icon header */
  }
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {isBatman ? <AlertTriangle className="text-primary" size={18} /> : <FileText className="text-primary" size={18} />}
                </div>
                <ArrowUpRight
    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
    size={18}
  />
              </div>

              {
    /* Title */
  }
              <h4 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h4>

              {
    /* Excerpt */
  }
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                {article.excerpt}
              </p>

              {
    /* Meta: date + read time */
  }
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              {
    /* Tags */
  }
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => <span key={tag} className="font-mono text-xs text-muted-foreground">
                    {tag}
                  </span>)}
              </div>
            </motion.article>)}
        </div>
      </div>
    </section>;
};
var stdin_default = BlogSection;
export {
  stdin_default as default
};
