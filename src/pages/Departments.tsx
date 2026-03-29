import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { departments } from '@/data/hospitalData';

const Departments = () => {
  const { t } = useLanguage();
  const deptName = (key: string) => (t.departments as any)[key] || key;
  const deptDesc = (key: string) => (t.departments as any)[`${key}Desc`] || '';

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.departments.title}</h1>
          <p className="text-muted-foreground">{t.departments.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(d => (
            <div key={d.key} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all group">
              <div className="h-56 overflow-hidden">
                <img src={d.image} alt={deptName(d.key)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{deptName(d.key)}</h3>
                <p className="text-sm text-muted-foreground mb-4">{deptDesc(d.key)}</p>
                <Link to="/appointment" className="text-primary text-sm font-medium hover:underline">
                  {t.hero.bookAppointment} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
