import { useLanguage } from '@/i18n/LanguageContext';
import labHero from '@/assets/lab-hero.jpg';
import serviceLab from '@/assets/service-lab.jpg';
import { FlaskConical, Microscope, Clock, FileText, Droplets, Heart, Beaker, TestTube2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Lab = () => {
  const { lang, t } = useLanguage();
  const lab = t.lab;

  const testCategories = [
    { icon: Droplets, titleKey: 'bloodTests' as const, descKey: 'bloodTestsDesc' as const },
    { icon: FlaskConical, titleKey: 'urineTests' as const, descKey: 'urineTestsDesc' as const },
    { icon: Heart, titleKey: 'hormoneTests' as const, descKey: 'hormoneTestsDesc' as const },
    { icon: Microscope, titleKey: 'microbiologyTests' as const, descKey: 'microbiologyTestsDesc' as const },
    { icon: Beaker, titleKey: 'chemistryTests' as const, descKey: 'chemistryTestsDesc' as const },
    { icon: TestTube2, titleKey: 'immunologyTests' as const, descKey: 'immunologyTestsDesc' as const },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[340px] md:h-[420px] overflow-hidden">
        <img src={labHero} alt="Laboratory" className="w-full h-full object-cover" width={1280} height={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{lab.title}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{lab.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Working hours & results */}
      <section className="container py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 flex items-start gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{lab.workingHours}</h3>
                <p className="text-sm text-muted-foreground">{lab.workingHoursValue}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 flex items-start gap-4">
              <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{lab.getResults}</h3>
                <p className="text-sm text-muted-foreground">{lab.getResultsDesc}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 flex items-start gap-4">
              <Microscope className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{lab.modernEquipment}</h3>
                <p className="text-sm text-muted-foreground">{lab.modernEquipmentDesc}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test categories */}
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{lab.availableTests}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testCategories.map(({ icon: Icon, titleKey, descKey }) => (
            <Card key={titleKey} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Icon className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{lab[titleKey]}</h3>
                <p className="text-sm text-muted-foreground">{lab[descKey]}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link to="/appointment">{t.hero.bookAppointment}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Lab;
