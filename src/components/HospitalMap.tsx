import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { MapPin, Heart, Brain, Bone, Baby, SmilePlus, Eye, Siren, FlaskConical, Pill, ScanLine, DoorOpen, ArrowUpDown } from 'lucide-react';

interface MapSection {
  id: string;
  nameKey: string;
  icon: React.ElementType;
  color: string;
  floor: number;
  gridArea: string;
}

const sections: MapSection[] = [
  { id: 'entrance', nameKey: 'entrance', icon: DoorOpen, color: 'hsl(215, 100%, 58%)', floor: 0, gridArea: '5 / 3 / 6 / 5' },
  { id: 'reception', nameKey: 'reception', icon: MapPin, color: 'hsl(215, 60%, 50%)', floor: 0, gridArea: '4 / 2 / 5 / 5' },
  { id: 'emergency', nameKey: 'emergency', icon: Siren, color: 'hsl(0, 84%, 50%)', floor: 0, gridArea: '4 / 5 / 5 / 7' },
  { id: 'pharmacy', nameKey: 'pharmacy', icon: Pill, color: 'hsl(150, 60%, 40%)', floor: 0, gridArea: '3 / 5 / 4 / 7' },
  { id: 'lab', nameKey: 'lab', icon: FlaskConical, color: 'hsl(280, 60%, 50%)', floor: 0, gridArea: '3 / 1 / 4 / 3' },
  { id: 'radiology', nameKey: 'radiology', icon: ScanLine, color: 'hsl(200, 80%, 45%)', floor: 0, gridArea: '3 / 3 / 4 / 5' },
  { id: 'elevator', nameKey: 'elevator', icon: ArrowUpDown, color: 'hsl(215, 20%, 50%)', floor: 0, gridArea: '4 / 1 / 5 / 2' },
  { id: 'cardiology', nameKey: 'cardiology', icon: Heart, color: 'hsl(350, 70%, 55%)', floor: 1, gridArea: '1 / 1 / 2 / 3' },
  { id: 'neurology', nameKey: 'neurology', icon: Brain, color: 'hsl(260, 60%, 55%)', floor: 1, gridArea: '1 / 3 / 2 / 5' },
  { id: 'orthopedics', nameKey: 'orthopedics', icon: Bone, color: 'hsl(30, 70%, 50%)', floor: 1, gridArea: '1 / 5 / 2 / 7' },
  { id: 'pediatrics', nameKey: 'pediatrics', icon: Baby, color: 'hsl(180, 60%, 45%)', floor: 1, gridArea: '2 / 1 / 3 / 3' },
  { id: 'dental', nameKey: 'dental', icon: SmilePlus, color: 'hsl(45, 80%, 50%)', floor: 1, gridArea: '2 / 3 / 3 / 5' },
  { id: 'ophthalmology', nameKey: 'ophthalmology', icon: Eye, color: 'hsl(160, 50%, 45%)', floor: 1, gridArea: '2 / 5 / 3 / 7' },
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

const mapTitle: Record<string, { title: string; subtitle: string; findSection: string }> = {
  ar: { title: 'خريطة المبنى', subtitle: 'اعثر على القسم بسهولة', findSection: 'ابحث عن قسم' },
  en: { title: 'Building Map', subtitle: 'Find your section easily', findSection: 'Search for a section' },
  ku: { title: 'نەخشەی بینا', subtitle: 'بە ئاسانی بەشەکە بدۆزەوە', findSection: 'بگەڕێ بۆ بەشێک' },
};

const HospitalMap = () => {
  const { lang } = useLanguage();
  const [activeFloor, setActiveFloor] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const txt = mapTitle[lang];
  const names = sectionNames[lang];
  const floors = floorLabels[lang];

  const floorSections = sections.filter(s => s.floor === activeFloor);
  const filtered = searchTerm
    ? floorSections.filter(s => names[s.nameKey]?.includes(searchTerm))
    : floorSections;

  const highlightedId = searchTerm
    ? sections.find(s => names[s.nameKey]?.includes(searchTerm))?.id
    : hoveredSection;

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">{txt.title}</h2>
          <p className="text-muted-foreground">{txt.subtitle}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Floor toggle */}
          <div className="flex bg-secondary rounded-lg p-1">
            {[0, 1].map(f => (
              <button
                key={f}
                onClick={() => setActiveFloor(f)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFloor === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {floors[f]}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder={txt.findSection}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
          />
        </div>

        {/* Map */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/50 border-2 border-border rounded-2xl p-4 sm:p-8 relative">
            {/* Floor label */}
            <div className="absolute top-4 start-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              {floors[activeFloor]}
            </div>

            {/* Grid map */}
            <div className="grid grid-cols-6 grid-rows-5 gap-2 mt-8" style={{ minHeight: 360 }}>
              {floorSections.map(section => {
                const Icon = section.icon;
                const isHighlighted = highlightedId === section.id;
                const isSearchMatch = searchTerm && names[section.nameKey]?.includes(searchTerm);

                return (
                  <button
                    key={section.id}
                    style={{
                      gridArea: section.gridArea,
                      backgroundColor: isHighlighted ? section.color : `${section.color}22`,
                      borderColor: section.color,
                    }}
                    className={`rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 p-3 transition-all duration-300 cursor-pointer ${
                      isHighlighted ? 'scale-105 shadow-elevated' : 'hover:scale-[1.02]'
                    } ${isSearchMatch ? 'ring-4 ring-primary/40' : ''}`}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <Icon
                      className="w-6 h-6 sm:w-8 sm:h-8 transition-colors"
                      style={{ color: isHighlighted ? '#fff' : section.color }}
                    />
                    <span
                      className="text-xs sm:text-sm font-semibold text-center leading-tight transition-colors"
                      style={{ color: isHighlighted ? '#fff' : section.color }}
                    >
                      {names[section.nameKey]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {sections
              .filter(s => s.floor === activeFloor)
              .map(s => (
                <button
                  key={s.id}
                  onMouseEnter={() => setHoveredSection(s.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:shadow-card transition-all"
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  {names[s.nameKey]}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalMap;
