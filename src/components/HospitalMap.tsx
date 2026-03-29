import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Heart, Brain, Bone, Baby, SmilePlus, Eye, Siren, FlaskConical, Pill, ScanLine, DoorOpen, ArrowUpDown, MapPin } from 'lucide-react';
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

interface MapSection {
  id: string;
  nameKey: string;
  icon: React.ElementType;
  color: string;
  floor: number;
  image?: string;
}

const sections: MapSection[] = [
  { id: 'entrance', nameKey: 'entrance', icon: DoorOpen, color: '#2A7FFF', floor: 0 },
  { id: 'reception', nameKey: 'reception', icon: MapPin, color: '#4A90D9', floor: 0 },
  { id: 'emergency', nameKey: 'emergency', icon: Siren, color: '#E53E3E', floor: 0, image: serviceEmergency },
  { id: 'pharmacy', nameKey: 'pharmacy', icon: Pill, color: '#38A169', floor: 0, image: servicePharmacy },
  { id: 'lab', nameKey: 'lab', icon: FlaskConical, color: '#805AD5', floor: 0, image: serviceLab },
  { id: 'radiology', nameKey: 'radiology', icon: ScanLine, color: '#3182CE', floor: 0, image: serviceRadiology },
  { id: 'elevator', nameKey: 'elevator', icon: ArrowUpDown, color: '#718096', floor: 0 },
  { id: 'cardiology', nameKey: 'cardiology', icon: Heart, color: '#E53E3E', floor: 1, image: deptCardiology },
  { id: 'neurology', nameKey: 'neurology', icon: Brain, color: '#805AD5', floor: 1, image: deptNeurology },
  { id: 'orthopedics', nameKey: 'orthopedics', icon: Bone, color: '#DD6B20', floor: 1, image: deptOrthopedics },
  { id: 'pediatrics', nameKey: 'pediatrics', icon: Baby, color: '#38B2AC', floor: 1, image: deptPediatrics },
  { id: 'dental', nameKey: 'dental', icon: SmilePlus, color: '#D69E2E', floor: 1, image: deptDental },
  { id: 'ophthalmology', nameKey: 'ophthalmology', icon: Eye, color: '#38A169', floor: 1, image: deptOphthalmology },
];

const floorLabels: Record<string, Record<number, string>> = {
  ar: { 0: 'الطابق الأرضي', 1: 'الطابق الأول' },
  en: { 0: 'Ground Floor', 1: 'First Floor' },
  ku: { 0: 'نهۆمی خوارەوە', 1: 'نهۆمی یەکەم' },
};

const sectionNames: Record<string, Record<string, string>> = {
  ar: { entrance: 'المدخل', reception: 'الاستقبال', emergency: 'الطوارئ', pharmacy: 'الصيدلية', lab: 'المختبر', radiology: 'الأشعة', elevator: 'المصعد', cardiology: 'القلب', neurology: 'الأعصاب', orthopedics: 'العظام', pediatrics: 'الأطفال', dental: 'الأسنان', ophthalmology: 'العيون' },
  en: { entrance: 'Entrance', reception: 'Reception', emergency: 'Emergency', pharmacy: 'Pharmacy', lab: 'Laboratory', radiology: 'Radiology', elevator: 'Elevator', cardiology: 'Cardiology', neurology: 'Neurology', orthopedics: 'Orthopedics', pediatrics: 'Pediatrics', dental: 'Dental', ophthalmology: 'Ophthalmology' },
  ku: { entrance: 'دەروازە', reception: 'پێشوازی', emergency: 'فریاکەوتن', pharmacy: 'دەرمانخانە', lab: 'تاقیگە', radiology: 'تیشک', elevator: 'بەرزکەرەوە', cardiology: 'دڵ', neurology: 'دەمار', orthopedics: 'ئێسک', pediatrics: 'منداڵان', dental: 'ددان', ophthalmology: 'چاو' },
};

const mapTitle: Record<string, { title: string; subtitle: string; search: string; roomNum: string }> = {
  ar: { title: 'خريطة المبنى', subtitle: 'اعثر على القسم الذي تبحث عنه بسهولة', search: 'ابحث عن قسم...', roomNum: 'غرفة' },
  en: { title: 'Building Map', subtitle: 'Find the section you\'re looking for easily', search: 'Search for a section...', roomNum: 'Room' },
  ku: { title: 'نەخشەی بینا', subtitle: 'بە ئاسانی ئەو بەشەی دەتەوێت بدۆزەوە', search: 'بگەڕێ بۆ بەشێک...', roomNum: 'ژوور' },
};

const HospitalMap = () => {
  const { lang } = useLanguage();
  const [activeFloor, setActiveFloor] = useState(0);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const txt = mapTitle[lang];
  const names = sectionNames[lang];
  const floors = floorLabels[lang];

  const floorSections = sections.filter(s => s.floor === activeFloor);
  const displaySections = searchTerm
    ? floorSections.filter(s => names[s.nameKey]?.toLowerCase().includes(searchTerm.toLowerCase()))
    : floorSections;

  const selected = selectedSection ? sections.find(s => s.id === selectedSection) : null;

  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">{txt.title}</h2>
          <p className="text-muted-foreground">{txt.subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {/* Header with floor tabs & search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 border-b border-border">
              <div className="flex bg-secondary rounded-lg p-1">
                {[0, 1].map(f => (
                  <button
                    key={f}
                    onClick={() => { setActiveFloor(f); setSelectedSection(null); }}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                      activeFloor === f
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {floors[f]}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder={txt.search}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:w-56"
              />
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Section list */}
              <div className="flex-1 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {displaySections.map(section => {
                    const Icon = section.icon;
                    const isActive = selectedSection === section.id;

                    return (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(isActive ? null : section.id)}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                          isActive
                            ? 'border-primary bg-accent shadow-sm scale-[1.03]'
                            : 'border-border bg-background hover:border-primary/40 hover:bg-accent/50'
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${section.color}18` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: section.color }} />
                        </div>
                        <span className="text-sm font-medium text-foreground text-center leading-tight">
                          {names[section.nameKey]}
                        </span>
                        {isActive && (
                          <div className="absolute -top-1 -end-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <MapPin className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail panel */}
              {selected && selected.image && (
                <div className="lg:w-80 border-t lg:border-t-0 lg:border-s border-border p-4">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={selected.image}
                      alt={names[selected.nameKey]}
                      loading="lazy"
                      className="w-full h-44 object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${selected.color}18` }}
                      >
                        <selected.icon className="w-4 h-4" style={{ color: selected.color }} />
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">{names[selected.nameKey]}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{floors[selected.floor]}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {txt.roomNum} {selected.floor === 0 ? 'G' : '1'}{(sections.indexOf(selected) + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual floor map bar */}
            <div className="p-4 border-t border-border bg-secondary/50">
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {floorSections.map(section => {
                  const isActive = selectedSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(isActive ? null : section.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? 'text-primary-foreground shadow-sm'
                          : 'bg-background text-foreground border border-border hover:border-primary/40'
                      }`}
                      style={isActive ? { backgroundColor: section.color } : undefined}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isActive ? '#fff' : section.color }}
                      />
                      {names[section.nameKey]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalMap;
