import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, FileText } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useBlogPosts } from "@/hooks/useSupabaseData";

const BlogSection = () => {
  const { theme } = useTheme();
  const { data: articles = [], isLoading } = useBlogPosts(theme);

  return (
    <section id="blog" className="relative py-28 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/[0.05] blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-14"
        >
          <p className="font-mono text-[0.7rem] tracking-[0.35em] uppercase text-muted-foreground mb-4">
            05 — Writing
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            Notes &amp; <span className="gradient-text">articles</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <p className="text-center font-mono text-sm text-muted-foreground">Loading articles…</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {articles.map((article, i) => (
              <motion.article
                key={article.id || article.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group flex flex-col rounded-2xl border border-primary/15 bg-card/40 backdrop-blur-sm p-7 transition-all hover:border-primary/40 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <FileText className="text-primary" size={18} />
                  </div>
                  <ArrowUpRight
                    className="text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    size={18}
                  />
                </div>

                <h3 className="font-serif text-xl leading-snug mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/60 pt-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-primary/70" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-primary/70" />
                    {article.read_time || article.readTime}
                  </span>
                </div>

                {article.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider uppercase text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
