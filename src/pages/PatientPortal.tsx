import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileText, Download, User, Lock, LogOut } from 'lucide-react';
import patientPortalHero from '@/assets/patient-portal-hero.jpg';

const mockReports = [
  { id: 1, typeAr: 'تحليل دم شامل', typeEn: 'Complete Blood Count', typeKu: 'شیکردنەوەی خوێنی تەواو', date: '2026-03-20', status: 'ready' },
  { id: 2, typeAr: 'تحليل السكر', typeEn: 'Glucose Test', typeKu: 'تاقیکردنەوەی شەکر', date: '2026-03-18', status: 'ready' },
  { id: 3, typeAr: 'أشعة الصدر', typeEn: 'Chest X-Ray', typeKu: 'تیشکی سنگ', date: '2026-03-15', status: 'ready' },
  { id: 4, typeAr: 'فحص الكلى', typeEn: 'Kidney Function Test', typeKu: 'پشکنینی گورچیلە', date: '2026-03-10', status: 'ready' },
];

const PatientPortal = () => {
  const { lang, t } = useLanguage();
  const portal = t.portal;
  const [loggedIn, setLoggedIn] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [password, setPassword] = useState('');
  const nameKey = lang === 'ar' ? 'Ar' : lang === 'ku' ? 'Ku' : 'En';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId && password) setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={patientPortalHero} alt="Patient Portal" className="w-full h-40 object-cover rounded-lg mb-4" width={1280} height={720} />
            <CardTitle className="text-2xl">{portal.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{portal.subtitle}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">{portal.patientId}</label>
                <div className="relative">
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={patientId} onChange={e => setPatientId(e.target.value)} className="ps-10" placeholder={portal.patientIdPlaceholder} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">{portal.password}</label>
                <div className="relative">
                  <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="ps-10" placeholder="••••••••" />
                </div>
              </div>
              <Button type="submit" className="w-full">{portal.login}</Button>
              <p className="text-xs text-center text-muted-foreground">{portal.demoNote}</p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{portal.welcome}</h1>
          <p className="text-muted-foreground">{portal.dashboardDesc}</p>
        </div>
        <Button variant="outline" onClick={() => setLoggedIn(false)}>
          <LogOut className="w-4 h-4 me-2" />
          {portal.logout}
        </Button>
      </div>

      <h2 className="text-xl font-semibold text-foreground mb-4">{portal.myReports}</h2>
      <div className="space-y-3">
        {mockReports.map(report => (
          <Card key={report.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{report[`type${nameKey}` as keyof typeof report] as string}</p>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 me-1" />
                {portal.download}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientPortal;
