import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import HospitalMap from '@/components/HospitalMap';

import { doctors, departments, services, testimonials, blogPosts } from '@/data/hospitalData';
import heroImg from '@/assets/hero-hospital.jpg';
import { Heart, Users, Building2, Award, ArrowLeft, ArrowRight, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const { lang, t } = useLanguage();
  const isRtl = t.dir === 'rtl';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const getName = (item: { nameAr: string; nameEn: string; nameKu: string }) =>
    lang === 'ar' ? item.nameAr : lang === 'ku' ? item.nameKu : item.nameEn;

  const getComment = (item: { commentAr: string; commentEn: string; commentKu: string }) =>
    lang === 'ar' ? item.commentAr : lang === 'ku' ? item.commentKu : item.commentEn;

  const getBlogField = <T extends 'title' | 'preview'>(item: Record<`${T}Ar` | `${T}En` | `${T}Ku`, string>, field: T) =>
    lang === 'ar' ? item[`${field}Ar`] : lang === 'ku' ? item[`${field}Ku`] : item[`${field}En`];

  const deptName = (key: string) => (t.departments as any)[key] || key;
  const deptDesc = (key: string) => (t.departments as any)[`${key}Desc`] || '';
  const serviceName = (key: string) => (t.services as any)[key] || key;
  const serviceDesc = (key: string) => (t.services as any)[`${key}Desc`] || '';

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden">
        <img src={heroImg} alt="The English Hospital" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight animate-fade-in">
              {t.hero.title}
            </h1>
            <p className="text-lg text-background/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/appointment" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                {t.hero.bookAppointment}
              </Link>
              <a href="tel:+9647509990000" className="px-8 py-3 bg-emergency text-emergency-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                {t.hero.emergency}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Users, num: '50,000+', label: t.stats.patients },
            { icon: Heart, num: '120+', label: t.stats.doctors_count },
            { icon: Building2, num: '25+', label: t.stats.departments_count },
            { icon: Award, num: '15+', label: t.stats.experience_years },
          ].map((s, i) => (
            <div key={i} className="animate-count-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <s.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">{s.num}</div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.services.title}</h2>
            <p className="text-muted-foreground">{t.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => (
              <div key={s.key} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow group">
                <div className="h-48 overflow-hidden">
                  <img src={s.image} alt={serviceName(s.key)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{serviceName(s.key)}</h3>
                  <p className="text-sm text-muted-foreground">{serviceDesc(s.key)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.departments.title}</h2>
            <p className="text-muted-foreground">{t.departments.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map(d => (
              <Link to="/departments" key={d.key} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <div className="h-48 overflow-hidden">
                  <img src={d.image} alt={deptName(d.key)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{deptName(d.key)}</h3>
                  <p className="text-sm text-muted-foreground">{deptDesc(d.key)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.doctors.title}</h2>
            <p className="text-muted-foreground">{t.doctors.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map(doc => (
              <div key={doc.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <div className="h-64 overflow-hidden">
                  <img src={doc.image} alt={getName(doc)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-foreground">{getName(doc)}</h3>
                  <p className="text-sm text-primary mb-1">{deptName(doc.deptKey)}</p>
                  <p className="text-xs text-muted-foreground">{doc.experienceYears} {t.doctors.experience}</p>
                  <Link to="/appointment" className="inline-block mt-3 px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    {t.doctors.bookNow}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/doctors" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              {t.doctors.viewAll} <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hospital Map */}
      <HospitalMap />


      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.testimonials.title}</h2>
            <p className="text-muted-foreground">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(tm => (
              <div key={tm.id} className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <img src={tm.image} alt={getName(tm)} loading="lazy" className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-foreground">{getName(tm)}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{getComment(tm)}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero-gradient py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">{t.hero.title}</h2>
          <p className="mb-8 opacity-90">{t.hero.subtitle}</p>
          <Link to="/appointment" className="inline-block px-10 py-3 bg-background text-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
            {t.hero.bookAppointment}
          </Link>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.blog.title}</h2>
            <p className="text-muted-foreground">{t.blog.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <Link to="/blog" key={post.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={getBlogField(post, 'title')} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="font-semibold text-foreground mb-1">{getBlogField(post, 'title')}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{getBlogField(post, 'preview')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.faq.title}</h2>
            <p className="text-muted-foreground">{t.faq.subtitle}</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-start font-medium text-foreground">
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
