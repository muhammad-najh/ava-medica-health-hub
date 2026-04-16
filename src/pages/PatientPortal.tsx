import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileText, Download, User, LogOut, Calendar as CalendarIcon, ShieldCheck, Activity, Clock } from 'lucide-react';
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
  const nameKey = lang === 'ar' ? 'Ar' : lang === 'ku' ? 'Ku' : 'En';

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

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-card/80">
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockReports.length}</p>
                  <p className="text-xs text-muted-foreground">{portal.totalReports}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/80">
              <CardContent className="p-4 flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockReports.filter(r => r.category === 'lab').length}</p>
                  <p className="text-xs text-muted-foreground">{portal.labReports}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/80">
              <CardContent className="p-4 flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockReports[0]?.date}</p>
                  <p className="text-xs text-muted-foreground">{portal.lastVisit}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/80">
              <CardContent className="p-4 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-semibold text-green-600">{portal.allReady}</p>
                  <p className="text-xs text-muted-foreground">{portal.reportStatus}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reports list */}
      <div className="container py-8">
        <h2 className="text-xl font-semibold text-foreground mb-5">{portal.myReports}</h2>
        <div className="space-y-3">
          {mockReports.map(report => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.category === 'lab' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report[`type${nameKey}` as keyof typeof report] as string}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{portal.ready}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {portal.download}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
