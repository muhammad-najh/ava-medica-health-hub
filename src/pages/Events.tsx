import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin } from 'lucide-react';
import event1 from '@/assets/event-1.jpg';
import event2 from '@/assets/event-2.jpg';
import event3 from '@/assets/event-3.jpg';

const eventsData = [
  {
    id: 1, image: event1, date: '2026-05-01',
    titleAr: 'يوم الفحص الصحي المجاني', titleEn: 'Free Health Check-up Day', titleKu: 'ڕۆژی پشکنینی تەندروستی بێبەرامبەر',
    descAr: 'فحوصات مجانية شاملة تشمل ضغط الدم والسكر والكوليسترول', descEn: 'Free comprehensive check-ups including blood pressure, glucose, and cholesterol', descKu: 'پشکنینی بێبەرامبەر لەنێو فشاری خوێن و شەکر و کۆلیسترۆل',
    locationAr: 'القاعة الرئيسية', locationEn: 'Main Hall', locationKu: 'هۆڵی سەرەکی',
  },
  {
    id: 2, image: event2, date: '2026-05-15',
    titleAr: 'حملة التطعيم الشاملة', titleEn: 'Comprehensive Vaccination Campaign', titleKu: 'کەمپینی دەرزی بەرگری گشتگیر',
    descAr: 'تطعيمات للأطفال والبالغين ضد الأمراض الموسمية', descEn: 'Vaccinations for children and adults against seasonal diseases', descKu: 'دەرزی بەرگری بۆ منداڵان و گەورەکان دژی نەخۆشییە وەرزییەکان',
    locationAr: 'قسم الأطفال', locationEn: 'Pediatrics Wing', locationKu: 'بەشی منداڵان',
  },
  {
    id: 3, image: event3, date: '2026-06-01',
    titleAr: 'عروض رمضان الصحية', titleEn: 'Ramadan Health Offers', titleKu: 'ئۆفەرەکانی تەندروستی ڕەمەزان',
    descAr: 'خصومات خاصة على الفحوصات الشاملة خلال شهر رمضان المبارك', descEn: 'Special discounts on comprehensive check-ups during the holy month of Ramadan', descKu: 'داشکاندنی تایبەت بۆ پشکنینی تەواو لە مانگی ڕەمەزاندا',
    locationAr: 'جميع الأقسام', locationEn: 'All Departments', locationKu: 'هەموو بەشەکان',
  },
];

const Events = () => {
  const { lang, t } = useLanguage();
  const nameKey = lang === 'ar' ? 'Ar' : lang === 'ku' ? 'Ku' : 'En';

  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.events.title}</h1>
        <p className="text-muted-foreground text-lg">{t.events.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData.map(event => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={event.image}
                alt={event[`title${nameKey}` as keyof typeof event] as string}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={800}
                height={512}
              />
            </div>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString(lang === 'ar' ? 'ar-IQ' : lang === 'ku' ? 'ckb-IQ' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {event[`title${nameKey}` as keyof typeof event] as string}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {event[`desc${nameKey}` as keyof typeof event] as string}
              </p>
              <div className="flex items-center gap-2 text-sm text-primary">
                <MapPin className="w-4 h-4" />
                <span>{event[`location${nameKey}` as keyof typeof event] as string}</span>
              </div>
              <Button className="w-full mt-4" variant="outline">{t.events.learnMore}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
