import doctor1 from '@/assets/doctor-1.jpg';
import doctor2 from '@/assets/doctor-2.jpg';
import doctor3 from '@/assets/doctor-3.jpg';
import doctor4 from '@/assets/doctor-4.jpg';
import doctor5 from '@/assets/doctor-5.jpg';
import doctor6 from '@/assets/doctor-6.jpg';
import deptCardiology from '@/assets/dept-cardiology.jpg';
import deptNeurology from '@/assets/dept-neurology.jpg';
import deptOrthopedics from '@/assets/dept-orthopedics.jpg';
import deptPediatrics from '@/assets/dept-pediatrics.jpg';
import deptDental from '@/assets/dept-dental.jpg';
import deptOphthalmology from '@/assets/dept-ophthalmology.jpg';
import serviceEmergency from '@/assets/service-emergency.jpg';
import serviceLab from '@/assets/service-lab.jpg';
import servicePharmacy from '@/assets/service-pharmacy.jpg';
import serviceRadiology from '@/assets/service-radiology.jpg';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';
import blog1 from '@/assets/blog-1.jpg';
import blog2 from '@/assets/blog-2.jpg';
import blog3 from '@/assets/blog-3.jpg';

export const doctors = [
  { id: 1, image: doctor1, nameAr: 'د. أحمد محمد', nameEn: 'Dr. Ahmed Mohammed', nameKu: 'د. ئەحمەد محەمەد', deptKey: 'cardiology' as const, experienceYears: 15 },
  { id: 2, image: doctor2, nameAr: 'د. فاطمة علي', nameEn: 'Dr. Fatima Ali', nameKu: 'د. فاتیمە عەلی', deptKey: 'neurology' as const, experienceYears: 12 },
  { id: 3, image: doctor3, nameAr: 'د. عمر حسن', nameEn: 'Dr. Omar Hassan', nameKu: 'د. عومەر حەسەن', deptKey: 'orthopedics' as const, experienceYears: 18 },
  { id: 4, image: doctor4, nameAr: 'د. سارة خالد', nameEn: 'Dr. Sara Khalid', nameKu: 'د. سارە خالید', deptKey: 'pediatrics' as const, experienceYears: 10 },
  { id: 5, image: doctor5, nameAr: 'د. محمد يوسف', nameEn: 'Dr. Mohammed Yousif', nameKu: 'د. محەمەد یوسف', deptKey: 'dental' as const, experienceYears: 8 },
  { id: 6, image: doctor6, nameAr: 'د. نور الدین', nameEn: 'Dr. Noor Aldin', nameKu: 'د. نووری ئەلدین', deptKey: 'ophthalmology' as const, experienceYears: 14 },
];

export const departments = [
  { key: 'cardiology' as const, image: deptCardiology },
  { key: 'neurology' as const, image: deptNeurology },
  { key: 'orthopedics' as const, image: deptOrthopedics },
  { key: 'pediatrics' as const, image: deptPediatrics },
  { key: 'dental' as const, image: deptDental },
  { key: 'ophthalmology' as const, image: deptOphthalmology },
];

export const services = [
  { key: 'emergency' as const, image: serviceEmergency },
  { key: 'lab' as const, image: serviceLab },
  { key: 'pharmacy' as const, image: servicePharmacy },
  { key: 'radiology' as const, image: serviceRadiology },
];

export const testimonials = [
  { id: 1, image: testimonial1, nameAr: 'أحمد سعيد', nameEn: 'Ahmed Saeed', nameKu: 'ئەحمەد سەعید', commentAr: 'تجربة رائعة، الطاقم الطبي محترف جداً والخدمة ممتازة', commentEn: 'Amazing experience, very professional medical staff and excellent service', commentKu: 'ئەزموونێکی نایاب، ستافی پزیشکی زۆر پڕۆفیشناڵ و خزمەتگوزاری نایاب' },
  { id: 2, image: testimonial2, nameAr: 'لينا أحمد', nameEn: 'Lina Ahmed', nameKu: 'لینا ئەحمەد', commentAr: 'أفضل مستشفى زرته، نظافة عالية ورعاية ممتازة', commentEn: 'Best hospital I visited, high cleanliness and excellent care', commentKu: 'باشترین نەخۆشخانەیە سەردانم کرد، پاکیژی و چاودێری نایاب' },
  { id: 3, image: testimonial3, nameAr: 'أم خالد', nameEn: 'Um Khalid', nameKu: 'دایکی خالید', commentAr: 'شكراً لفريق قسم الأطفال على الاهتمام الكبير بطفلي', commentEn: 'Thanks to the pediatrics team for the great care of my child', commentKu: 'سوپاس بۆ تیمی بەشی منداڵان بۆ چاودێری باشیان بە منداڵەکەم' },
];

export const blogPosts = [
  { id: 1, image: blog1, titleAr: 'أهمية الفحوصات الدورية', titleEn: 'Importance of Regular Check-ups', titleKu: 'گرنگی پشکنینی ماوەیی', previewAr: 'تعرف على أهمية إجراء الفحوصات الطبية الدورية للوقاية من الأمراض', previewEn: 'Learn about the importance of regular medical check-ups for disease prevention', previewKu: 'فێربە لە گرنگی پشکنینی پزیشکی ماوەیی بۆ ڕێگەگرتن لە نەخۆشی', date: '2026-03-15' },
  { id: 2, image: blog2, titleAr: 'نصائح للتغذية الصحية', titleEn: 'Healthy Nutrition Tips', titleKu: 'ئامۆژگاری بۆ خواردنی تەندروست', previewAr: 'دليلك الشامل للتغذية المتوازنة والصحية', previewEn: 'Your complete guide to balanced and healthy nutrition', previewKu: 'ڕێنماییەکی تەواو بۆ خواردنی هاوسەنگ و تەندروست', date: '2026-03-10' },
  { id: 3, image: blog3, titleAr: 'فوائد الرياضة اليومية', titleEn: 'Benefits of Daily Exercise', titleKu: 'سوودەکانی وەرزشی ڕۆژانە', previewAr: 'اكتشف كيف يمكن للرياضة اليومية أن تحسن صحتك', previewEn: 'Discover how daily exercise can improve your health', previewKu: 'بزانە چۆن وەرزشی ڕۆژانە دەتوانێت تەندروستیت باشتر بکات', date: '2026-03-05' },
];
