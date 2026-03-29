import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { doctors, departments } from '@/data/hospitalData';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

const Appointment = () => {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });

  const deptName = (key: string) => (t.departments as any)[key] || key;
  const getName = (d: typeof doctors[0]) => lang === 'ar' ? d.nameAr : lang === 'ku' ? d.nameKu : d.nameEn;
  const filteredDocs = selectedDept ? doctors.filter(d => d.deptKey === selectedDept) : doctors;

  const steps = [t.appointment.step1, t.appointment.step2, t.appointment.step3, t.appointment.step4];

  const handleSubmit = () => {
    toast.success(lang === 'ar' ? 'تم حجز الموعد بنجاح!' : lang === 'ku' ? 'نۆرەکە بە سەرکەوتوویی تۆمار کرا!' : 'Appointment booked successfully!');
    setStep(1);
    setSelectedDept('');
    setSelectedDoc('');
    setSelectedDate('');
    setSelectedTime('');
    setForm({ name: '', phone: '', email: '', notes: '' });
  };

  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.appointment.title}</h1>
          <p className="text-muted-foreground">{t.appointment.subtitle}</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${
                i + 1 < step ? 'bg-success text-success-foreground' : i + 1 === step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {i + 1 < step ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className="text-xs text-muted-foreground text-center hidden sm:block">{s}</span>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          {/* Step 1: Department */}
          {step === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {departments.map(d => (
                <button key={d.key} onClick={() => setSelectedDept(d.key)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${selectedDept === d.key ? 'border-primary' : 'border-transparent'}`}>
                  <img src={d.image} alt={deptName(d.key)} loading="lazy" className="w-full h-24 object-cover" />
                  <div className="p-2 text-sm font-medium text-foreground text-center">{deptName(d.key)}</div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Doctor */}
          {step === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredDocs.map(doc => (
                <button key={doc.id} onClick={() => setSelectedDoc(String(doc.id))}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${selectedDoc === String(doc.id) ? 'border-primary' : 'border-transparent'}`}>
                  <img src={doc.image} alt={getName(doc)} loading="lazy" className="w-full h-32 object-cover" />
                  <div className="p-2 text-center">
                    <div className="text-sm font-medium text-foreground">{getName(doc)}</div>
                    <div className="text-xs text-muted-foreground">{deptName(doc.deptKey)}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.appointment.selectDate}</label>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.appointment.selectTime}</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTime === time ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-accent'}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Patient Info */}
          {step === 4 && (
            <div className="space-y-4">
              {[
                { key: 'name', type: 'text', label: t.appointment.name },
                { key: 'phone', type: 'tel', label: t.appointment.phone },
                { key: 'email', type: 'email', label: t.appointment.email },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t.appointment.notes}</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 gap-3">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 bg-secondary text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
                {t.appointment.previous}
              </button>
            )}
            <div className="ms-auto">
              {step < 4 ? (
                <button onClick={() => setStep(step + 1)}
                  disabled={(step === 1 && !selectedDept) || (step === 2 && !selectedDoc) || (step === 3 && (!selectedDate || !selectedTime))}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                  {t.appointment.next}
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!form.name || !form.phone}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                  {t.appointment.submit}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
