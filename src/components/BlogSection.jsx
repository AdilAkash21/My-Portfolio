import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, FileText, AlertTriangle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useBlogPosts } from "@/hooks/useSupabaseData";

const BlogSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  
  const { data: articles = [], isLoading } = useBlogPosts(theme);

  if (isLoading) return <div className="py-24 text-center font-mono text-primary">Decrypting Briefings...</div>;

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
    key={article.id || article.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 * i }}
    className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors flex flex-col cursor-pointer"
  >
               <div className="flex items-center justify-between mb-4">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   {isBatman ? <AlertTriangle className="text-primary" size={18} /> : <FileText className="text-primary" size={18} />}
                 </div>
                 <ArrowUpRight
    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
    size={18}
  />
               </div>

               <h4 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                 {article.title}
               </h4>

               <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                 {article.excerpt}
               </p>

               <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                 <span className="flex items-center gap-1">
                   <Calendar size={12} />
                   {article.date}
                 </span>
                 <span className="flex items-center gap-1">
                   <Clock size={12} />
                   {article.read_time || article.readTime}
                 </span>
               </div>

               <div className="flex flex-wrap gap-2">
                 {article.tags?.map((tag) => <span key={tag} className="font-mono text-xs text-muted-foreground">
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

