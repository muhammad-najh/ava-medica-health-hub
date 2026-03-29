import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { doctors, departments } from '@/data/hospitalData';

const Doctors = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const getName = (d: typeof doctors[0]) => lang === 'ar' ? d.nameAr : lang === 'ku' ? d.nameKu : d.nameEn;
  const deptName = (key: string) => (t.departments as any)[key] || key;

  const filtered = filter === 'all' ? doctors : doctors.filter(d => d.deptKey === filter);

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.doctors.title}</h1>
          <p className="text-muted-foreground">{t.doctors.subtitle}</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
          >
            {t.doctors.filterAll}
          </button>
          {departments.map(d => (
            <button
              key={d.key}
              onClick={() => setFilter(d.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === d.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
            >
              {deptName(d.key)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
            <div key={doc.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
              <div className="h-72 overflow-hidden">
                <img src={doc.image} alt={getName(doc)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-foreground">{getName(doc)}</h3>
                <p className="text-sm text-primary mb-1">{deptName(doc.deptKey)}</p>
                <p className="text-xs text-muted-foreground mb-3">{doc.experienceYears} {t.doctors.experience}</p>
                <Link to="/appointment" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  {t.doctors.bookNow}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
