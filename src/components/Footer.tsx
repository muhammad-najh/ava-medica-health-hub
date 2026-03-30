import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import hospitalLogo from '@/assets/hospital-logo.jpeg';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={hospitalLogo} alt="The English Hospital" className="h-16 w-16 rounded-full object-cover border-2 border-primary/30" />
              <div>
                <h3 className="text-xl font-bold text-primary">The English</h3>
                <span className="text-sm text-background/70">Hospital</span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">{t.footer.aboutDesc}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-background/70 hover:text-primary transition-colors">{t.nav.home}</Link>
              <Link to="/doctors" className="block text-sm text-background/70 hover:text-primary transition-colors">{t.nav.doctors}</Link>
              <Link to="/departments" className="block text-sm text-background/70 hover:text-primary transition-colors">{t.nav.departments}</Link>
              <Link to="/appointment" className="block text-sm text-background/70 hover:text-primary transition-colors">{t.nav.appointment}</Link>
              <Link to="/contact" className="block text-sm text-background/70 hover:text-primary transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.contactInfo}</h4>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary flex-shrink-0" />{t.contact.addressValue}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary flex-shrink-0" />{t.contact.phoneValue}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary flex-shrink-0" />{t.contact.emailValue}</div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.workingHours}</h4>
            <div className="space-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary flex-shrink-0" />{t.footer.satThu}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary flex-shrink-0" />{t.footer.friday}</div>
              <div className="flex items-center gap-2 text-emergency font-semibold"><Phone className="w-4 h-4 flex-shrink-0" />{t.footer.emergencyAlways}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container py-4 text-center text-sm text-background/50">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
