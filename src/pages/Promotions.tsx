import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Percent, Heart, Calendar, Star, ArrowLeft, ArrowRight, Sparkles, Tag } from 'lucide-react';
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
      gradient: 'from-rose-500/10 to-pink-500/10',
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-500',
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
      icon: Sparkles,
      gradient: 'from-primary/10 to-blue-500/10',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      id: 3,
      titleAr: 'فحص الأسنان + تنظيف مجاني',
      titleEn: 'Dental Checkup + Free Cleaning',
      titleKu: 'پشکنینی ددان + پاککردنەوەی بەخۆڕایی',
      descAr: 'فحص شامل للأسنان مع جلسة تنظيف مجانية للمرضى الجدد',
      descEn: 'Complete dental examination with free cleaning session for new patients',
      descKu: 'پشکنینی تەواوی ددان لەگەڵ دانیشتنی پاککردنەوەی بەخۆڕایی بۆ نەخۆشە نوێیەکان',
      discount: 38,
      originalPrice: 80,
      newPrice: 50,
      validUntil: '2026-07-15',
      icon: Star,
      gradient: 'from-amber-500/10 to-orange-500/10',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
    },
  ];

  const nameKey = lang === 'ar' ? 'Ar' : lang === 'ku' ? 'Ku' : 'En';

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden min-h-[300px] flex items-center">
        <img src={promotionsHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" width={1280} height={512} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/90 to-background" />
        <div className="container relative z-10 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <Tag className="w-4 h-4" />
            {promo.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{promo.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{promo.subtitle}</p>
        </div>
      </div>

      {/* Offers */}
      <section className="container py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">{promo.offersTitle}</h2>
          <p className="text-muted-foreground">{promo.offersSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map(offer => {
            const Icon = offer.icon;
            return (
              <Card key={offer.id} className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-50`} />

                <CardContent className="relative p-0">
                  {/* Discount ribbon */}
                  {offer.discount > 0 && (
                    <div className="absolute top-4 end-4 z-10">
                      <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Percent className="w-3 h-3" />
                        {offer.discount}% {promo.off}
                      </div>
                    </div>
                  )}

                  <div className="p-7">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${offer.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${offer.iconColor}`} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {offer[`title${nameKey}` as keyof typeof offer] as string}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {offer[`desc${nameKey}` as keyof typeof offer] as string}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-bold text-foreground">${offer.newPrice}</span>
                      <span className="text-base text-muted-foreground line-through mb-1">${offer.originalPrice}</span>
                    </div>

                    {/* Valid until */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                      <Calendar className="w-3.5 h-3.5" />
                      {promo.validUntil}: {offer.validUntil}
                    </div>

                    {/* CTA */}
                    <Link to="/appointment">
                      <Button className="w-full h-11 gap-2 text-sm font-semibold">
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

      {/* CTA Banner */}
      <section className="bg-primary/5 border-y border-border">
        <div className="container py-14 text-center">
          <Percent className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">{promo.ctaTitle}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{promo.ctaSubtitle}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/appointment">
              <Button size="lg" className="gap-2 h-12 px-8">
                {promo.bookNow}
                <Arrow className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8">{promo.contactUs}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
