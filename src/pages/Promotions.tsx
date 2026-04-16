import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Percent, Heart, Calendar, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import promotionsHero from '@/assets/promotions-hero.jpg';

const Promotions = () => {
  const { lang, t } = useLanguage();
  const promo = t.promotions;
  const isRTL = t.dir === 'rtl';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const offers = [
    {
      id: 1,
      titleAr: 'فحص صحي شامل',
      titleEn: 'Comprehensive Health Checkup',
      titleKu: 'پشکنینی تەندروستی گشتی',
      descAr: 'فحص شامل يتضمن تحاليل الدم، فحص القلب، الأشعة، وفحص النظر بسعر مخفض',
      descEn: 'Full body checkup including blood tests, cardiac screening, X-rays, and eye exam at a discounted price',
      descKu: 'پشکنینی تەواو لەخۆدەگرێت تاقیکردنەوەی خوێن، پشکنینی دڵ، تیشک، و پشکنینی چاو بە نرخێکی داشکاو',
      discount: 30,
      originalPrice: 250,
      newPrice: 175,
      validUntil: '2026-06-30',
      icon: Heart,
      category: 'package',
    },
    {
      id: 2,
      titleAr: 'باقة تحاليل المختبر',
      titleEn: 'Laboratory Test Package',
      titleKu: 'پاکێجی تاقیکردنەوەی تاقیگە',
      descAr: 'مجموعة تحاليل شاملة تتضمن السكر، الكوليسترول، وظائف الكلى والكبد',
      descEn: 'Complete lab package including glucose, cholesterol, kidney and liver function tests',
      descKu: 'پاکێجی تاقیگەی تەواو لەخۆدەگرێت شەکر، کۆلیسترۆل، کاری گورچیلە و جگەر',
      discount: 25,
      originalPrice: 120,
      newPrice: 90,
      validUntil: '2026-05-31',
      icon: Star,
      category: 'package',
    },
    {
      id: 3,
      titleAr: 'فحص الأسنان + تنظيف مجاني',
      titleEn: 'Dental Checkup + Free Cleaning',
      titleKu: 'پشکنینی ددان + پاککردنەوەی بەخۆڕایی',
      descAr: 'فحص شامل للأسنان مع جلسة تنظيف مجانية للمرضى الجدد',
      descEn: 'Complete dental examination with free cleaning session for new patients',
      descKu: 'پشکنینی تەواوی ددان لەگەڵ دانیشتنی پاککردنەوەی بەخۆڕایی بۆ نەخۆشە نوێیەکان',
      discount: 0,
      originalPrice: 80,
      newPrice: 50,
      validUntil: '2026-07-15',
      icon: Star,
      category: 'package',
    },
  ];

  const campaigns = [
    {
      id: 1,
      titleAr: 'شهر التوعية بصحة القلب',
      titleEn: 'Heart Health Awareness Month',
      titleKu: 'مانگی ئاگاداربوون لە تەندروستی دڵ',
      descAr: 'فحوصات مجانية للقلب وورش عمل توعوية طوال شهر مايو',
      descEn: 'Free cardiac screenings and educational workshops throughout May',
      descKu: 'پشکنینی بەخۆڕایی دڵ و وۆرکشۆپی فێرکاری بە درێژایی مانگی ئایار',
      date: '2026-05-01',
      color: 'bg-destructive/10 text-destructive',
    },
    {
      id: 2,
      titleAr: 'حملة التطعيم الموسمية',
      titleEn: 'Seasonal Vaccination Campaign',
      titleKu: 'کەمپینی ڤاکسینی وەرزی',
      descAr: 'تطعيمات الإنفلونزا وفيروسات الموسم متاحة الآن بأسعار رمزية',
      descEn: 'Flu and seasonal virus vaccinations now available at subsidized prices',
      descKu: 'ڤاکسینی ئینفلوینزا و ڤایرۆسی وەرزی ئێستا بەردەستە بە نرخی یارمەتیدراو',
      date: '2026-04-15',
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 3,
      titleAr: 'يوم صحة المرأة',
      titleEn: "Women's Health Day",
      titleKu: 'ڕۆژی تەندروستی ژنان',
      descAr: 'فحوصات نسائية مجانية واستشارات مع أفضل الأطباء',
      descEn: 'Free gynecological screenings and consultations with top specialists',
      descKu: 'پشکنینی بەخۆڕایی ژنان و ڕاوێژکاری لەگەڵ باشترین پسپۆڕان',
      date: '2026-06-10',
      color: 'bg-accent text-accent-foreground',
    },
  ];

  const nameKey = lang === 'ar' ? 'Ar' : lang === 'ku' ? 'Ku' : 'En';

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary/5 min-h-[260px] flex items-center">
        <img src={promotionsHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" width={1280} height={512} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="container relative z-10 py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Percent className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="secondary" className="text-sm">{promo.badge}</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">{promo.title}</h1>
          <p className="text-lg text-muted-foreground max-w-xl">{promo.subtitle}</p>
        </div>
      </div>

      {/* Special Offers */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-foreground mb-2">{promo.offersTitle}</h2>
        <p className="text-muted-foreground mb-8">{promo.offersSubtitle}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map(offer => {
            const Icon = offer.icon;
            return (
              <Card key={offer.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-primary/10">
                <CardContent className="p-0">
                  {/* Discount badge */}
                  {offer.discount > 0 && (
                    <div className="bg-destructive text-destructive-foreground text-center py-2 text-sm font-bold">
                      {offer.discount}% {promo.off}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {offer[`title${nameKey}` as keyof typeof offer] as string}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {offer[`desc${nameKey}` as keyof typeof offer] as string}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-primary">${offer.newPrice}</span>
                      <span className="text-sm text-muted-foreground line-through">${offer.originalPrice}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {promo.validUntil}: {offer.validUntil}
                      </span>
                    </div>

                    <Link to="/appointment">
                      <Button className="w-full mt-4 gap-2">
                        {promo.bookNow}
                        <Arrow className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Health Campaigns */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container py-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">{promo.campaignsTitle}</h2>
          <p className="text-muted-foreground mb-8">{promo.campaignsSubtitle}</p>

          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Badge className={`${campaign.color} mb-4`}>
                    {campaign.date}
                  </Badge>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {campaign[`title${nameKey}` as keyof typeof campaign] as string}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {campaign[`desc${nameKey}` as keyof typeof campaign] as string}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-12 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">{promo.ctaTitle}</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{promo.ctaSubtitle}</p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/appointment">
            <Button size="lg" className="gap-2">
              {promo.bookNow}
              <Arrow className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">{promo.contactUs}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
