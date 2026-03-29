import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { MapPin, Phone, Mail, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : lang === 'ku' ? 'نامەکەت بە سەرکەوتوویی نێردرا!' : 'Message sent successfully!');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.contact.title}</h1>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-card space-y-4">
            {[
              { key: 'name', type: 'text', label: t.contact.name },
              { key: 'email', type: 'email', label: t.contact.email },
              { key: 'phone', type: 'tel', label: t.contact.phone },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{t.contact.message}</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" required />
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              {t.contact.send}
            </button>
          </form>

          {/* Info + Map */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div><p className="font-medium text-foreground">{t.contact.address}</p><p className="text-sm text-muted-foreground">{t.contact.addressValue}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div><p className="font-medium text-foreground">{t.contact.phone}</p><p className="text-sm text-muted-foreground">{t.contact.phoneValue}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div><p className="font-medium text-foreground">{t.contact.email}</p><p className="text-sm text-muted-foreground">{t.contact.emailValue}</p></div>
              </div>
            </div>

            <div className="bg-emergency/10 border border-emergency/20 rounded-xl p-5 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-emergency flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emergency">{t.contact.emergencyNumber}</p>
                <p className="text-lg font-bold text-foreground">{t.contact.emergencyValue}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden h-64 bg-secondary">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.5!2d44.009167!3d36.191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDExJzI3LjYiTiA0NMKwMDAnMzMuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                className="w-full h-full border-0"
                loading="lazy"
                title="Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
