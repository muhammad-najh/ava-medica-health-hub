import { useLanguage } from '@/i18n/LanguageContext';
import { blogPosts } from '@/data/hospitalData';

const Blog = () => {
  const { lang, t } = useLanguage();

  const getField = <T extends 'title' | 'preview'>(item: Record<`${T}Ar` | `${T}En` | `${T}Ku`, string>, field: T) =>
    lang === 'ar' ? item[`${field}Ar`] : lang === 'ku' ? item[`${field}Ku`] : item[`${field}En`];

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.blog.title}</h1>
          <p className="text-muted-foreground">{t.blog.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all group cursor-pointer">
              <div className="h-52 overflow-hidden">
                <img src={post.image} alt={getField(post, 'title')} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                <h2 className="text-lg font-semibold text-foreground mb-2">{getField(post, 'title')}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{getField(post, 'preview')}</p>
                <span className="text-primary text-sm font-medium hover:underline">{t.blog.readMore} →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
