import { useState, useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, User, LogOut, Calendar as CalendarIcon, ShieldCheck, Activity, Clock, Filter } from 'lucide-react';
import patientPortalHero from '@/assets/patient-portal-hero.jpg';

const mockReports = [
  { id: 1, typeAr: 'تحليل دم شامل', typeEn: 'Complete Blood Count', typeKu: 'شیکردنەوەی خوێنی تەواو', date: '2026-03-20', status: 'ready', category: 'lab' },
  { id: 2, typeAr: 'تحليل السكر', typeEn: 'Glucose Test', typeKu: 'تاقیکردنەوەی شەکر', date: '2026-03-18', status: 'ready', category: 'lab' },
  { id: 3, typeAr: 'أشعة الصدر', typeEn: 'Chest X-Ray', typeKu: 'تیشکی سنگ', date: '2026-03-15', status: 'ready', category: 'radiology' },
  { id: 4, typeAr: 'فحص الكلى', typeEn: 'Kidney Function Test', typeKu: 'پشکنینی گورچیلە', date: '2026-03-10', status: 'ready', category: 'lab' },
];

const PatientPortal = () => {
  const { lang, t } = useLanguage();
  const portal = t.portal;
  const [loggedIn, setLoggedIn] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [dob, setDob] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterDay, setFilterDay] = useState('all');
  const nameKey = lang === 'ar' ? 'Ar' : lang === 'ku' ? 'Ku' : 'En';

  const years = [...new Set(mockReports.map(r => r.date.split('-')[0]))];
  const months = [...new Set(mockReports.map(r => r.date.split('-')[1]))];
  const days = [...new Set(mockReports.map(r => r.date.split('-')[2]))];

  const filteredReports = useMemo(() => {
    return mockReports.filter(r => {
      const [y, m, d] = r.date.split('-');
      if (filterYear !== 'all' && y !== filterYear) return false;
      if (filterMonth !== 'all' && m !== filterMonth) return false;
      if (filterDay !== 'all' && d !== filterDay) return false;
      return true;
    });
  }, [filterYear, filterMonth, filterDay]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId && dob) setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-[80vh] relative flex items-center justify-center px-4">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={patientPortalHero} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{portal.title}</h1>
            <p className="text-muted-foreground">{portal.subtitle}</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-lg border-primary/10">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">{portal.patientId}</label>
                  <div className="relative">
                    <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={patientId}
                      onChange={e => setPatientId(e.target.value)}
                      className="ps-10 h-12"
                      placeholder={portal.patientIdPlaceholder}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">{portal.dobLabel}</label>
                  <div className="relative">
                    <CalendarIcon className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className="ps-10 h-12"
                      placeholder={portal.dobPlaceholder}
                      type="date"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-base font-semibold">{portal.login}</Button>
              </form>

              <p className="text-xs text-center text-muted-foreground mt-4 bg-muted/50 rounded-lg p-3">
                {portal.demoNote}
              </p>
            </CardContent>
          </Card>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-primary" />{portal.secure}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" />{portal.available}</span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-[70vh]">
      {/* Dashboard header */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{portal.welcome}</h1>
                <p className="text-sm text-muted-foreground">{portal.dashboardDesc}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setLoggedIn(false)} className="gap-2">
              <LogOut className="w-4 h-4" />
              {portal.logout}
            </Button>
          </div>
        </div>
      </div>

      {/* Reports list with filters */}
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-foreground">{portal.myReports}</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="w-24 h-9 text-xs">
                <SelectValue placeholder={portal.year} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{portal.allYears}</SelectItem>
                {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger className="w-24 h-9 text-xs">
                <SelectValue placeholder={portal.month} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{portal.allMonths}</SelectItem>
                {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterDay} onValueChange={setFilterDay}>
              <SelectTrigger className="w-20 h-9 text-xs">
                <SelectValue placeholder={portal.day} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{portal.allDays}</SelectItem>
                {days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                {portal.noResults}
              </CardContent>
            </Card>
          ) : (
            filteredReports.map(report => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.category === 'lab' ? 'bg-primary/10 text-primary' : 'bg-accent text-accent-foreground'}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report[`type${nameKey}` as keyof typeof report] as string}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{portal.ready}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    {portal.download}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
