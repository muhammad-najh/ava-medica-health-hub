import { useState, useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Heart, Brain, Bone, Baby, SmilePlus, Eye, Siren, FlaskConical, Pill, ScanLine, DoorOpen, ArrowUpDown, MapPin, Navigation, Search, QrCode, Footprints } from 'lucide-react';

interface MapSection {
  id: string;
  nameKey: string;
  icon: React.ElementType;
  color: string;
  floor: number;
  x: number;
  y: number;
  w: number;
  h: number;
  roomNum: string;
}

const groundFloor: MapSection[] = [
  { id: 'entrance',  nameKey: 'entrance',  icon: DoorOpen,     color: '#2A7FFF', floor: 0, x: 340, y: 340, w: 120, h: 60,  roomNum: 'G-01' },
  { id: 'reception', nameKey: 'reception', icon: MapPin,       color: '#4A90D9', floor: 0, x: 300, y: 210, w: 200, h: 90,  roomNum: 'G-02' },
  { id: 'emergency', nameKey: 'emergency', icon: Siren,        color: '#E53E3E', floor: 0, x: 20,  y: 20,  w: 220, h: 140, roomNum: 'G-03' },
  { id: 'pharmacy',  nameKey: 'pharmacy',  icon: Pill,         color: '#38A169', floor: 0, x: 560, y: 20,  w: 200, h: 130, roomNum: 'G-04' },
  { id: 'lab',       nameKey: 'lab',       icon: FlaskConical, color: '#805AD5', floor: 0, x: 20,  y: 200, w: 220, h: 120, roomNum: 'G-05' },
  { id: 'radiology', nameKey: 'radiology', icon: ScanLine,     color: '#3182CE', floor: 0, x: 560, y: 190, w: 200, h: 130, roomNum: 'G-06' },
  { id: 'elevator',  nameKey: 'elevator',  icon: ArrowUpDown,  color: '#718096', floor: 0, x: 260, y: 20,  w: 100, h: 80,  roomNum: 'G-EL' },
];

const firstFloor: MapSection[] = [
  { id: 'cardiology',    nameKey: 'cardiology',    icon: Heart,    color: '#E53E3E', floor: 1, x: 20,  y: 20,  w: 230, h: 150, roomNum: '1-01' },
  { id: 'neurology',     nameKey: 'neurology',     icon: Brain,    color: '#805AD5', floor: 1, x: 290, y: 20,  w: 200, h: 130, roomNum: '1-02' },
  { id: 'orthopedics',   nameKey: 'orthopedics',   icon: Bone,     color: '#DD6B20', floor: 1, x: 530, y: 20,  w: 230, h: 150, roomNum: '1-03' },
  { id: 'pediatrics',    nameKey: 'pediatrics',    icon: Baby,     color: '#38B2AC', floor: 1, x: 20,  y: 210, w: 230, h: 140, roomNum: '1-04' },
  { id: 'dental',        nameKey: 'dental',        icon: SmilePlus,color: '#D69E2E', floor: 1, x: 290, y: 190, w: 200, h: 130, roomNum: '1-05' },
  { id: 'ophthalmology', nameKey: 'ophthalmology', icon: Eye,      color: '#38A169', floor: 1, x: 530, y: 210, w: 230, h: 140, roomNum: '1-06' },
  { id: 'elevator1',     nameKey: 'elevator',      icon: ArrowUpDown, color: '#718096', floor: 1, x: 350, y: 350, w: 100, h: 50, roomNum: '1-EL' },
];

const directions: Record<string, Record<string, string[]>> = {
  ar: {
    entrance:  ['أنت عند المدخل الرئيسي'],
    reception: ['ادخل من المدخل الرئيسي', 'امشِ للأمام ٢٠ متراً', 'الاستقبال أمامك مباشرة'],
    emergency: ['ادخل من المدخل الرئيسي', 'اتجه يساراً فوراً', 'قسم الطوارئ على يسارك — باب أحمر'],
    pharmacy:  ['ادخل من المدخل الرئيسي', 'امشِ للأمام حتى الاستقبال', 'اتجه يميناً', 'الصيدلية في نهاية الممر'],
    lab:       ['ادخل من المدخل الرئيسي', 'اتجه يساراً بعد الاستقبال', 'المختبر — الباب الثاني على اليسار'],
    radiology: ['ادخل من المدخل الرئيسي', 'اتجه يميناً بعد الاستقبال', 'قسم الأشعة في نهاية الممر الأيمن'],
    elevator:  ['ادخل من المدخل الرئيسي', 'امشِ للأمام ١٠ أمتار', 'المصعد على يمينك'],
    cardiology:    ['اصعد بالمصعد للطابق الأول', 'اتجه يساراً', 'قسم القلب — أول باب على اليسار'],
    neurology:     ['اصعد بالمصعد للطابق الأول', 'امشِ للأمام', 'قسم الأعصاب أمامك مباشرة'],
    orthopedics:   ['اصعد بالمصعد للطابق الأول', 'اتجه يميناً', 'قسم العظام — أول باب على اليمين'],
    pediatrics:    ['اصعد بالمصعد للطابق الأول', 'اتجه يساراً', 'تجاوز قسم القلب', 'قسم الأطفال — الباب الثاني'],
    dental:        ['اصعد بالمصعد للطابق الأول', 'امشِ للأمام', 'قسم الأسنان بعد قسم الأعصاب'],
    ophthalmology: ['اصعد بالمصعد للطابق الأول', 'اتجه يميناً', 'تجاوز قسم العظام', 'قسم العيون — آخر باب'],
    elevator1:     ['اصعد بالمصعد للطابق الأول', 'المصعد أمامك مباشرة'],
  },
  en: {
    entrance:  ['You are at the main entrance'],
    reception: ['Enter through the main entrance', 'Walk straight 20 meters', 'Reception is directly ahead'],
    emergency: ['Enter through the main entrance', 'Turn left immediately', 'Emergency is on your left — red door'],
    pharmacy:  ['Enter through the main entrance', 'Walk to reception', 'Turn right', 'Pharmacy is at the end of the hall'],
    lab:       ['Enter through the main entrance', 'Turn left past reception', 'Lab — second door on the left'],
    radiology: ['Enter through the main entrance', 'Turn right past reception', 'Radiology at the end of the right corridor'],
    elevator:  ['Enter through the main entrance', 'Walk straight 10 meters', 'Elevator is on your right'],
    cardiology:    ['Take elevator to 1st floor', 'Turn left', 'Cardiology — first door on the left'],
    neurology:     ['Take elevator to 1st floor', 'Walk straight ahead', 'Neurology is directly in front'],
    orthopedics:   ['Take elevator to 1st floor', 'Turn right', 'Orthopedics — first door on the right'],
    pediatrics:    ['Take elevator to 1st floor', 'Turn left', 'Pass Cardiology', 'Pediatrics — second door'],
    dental:        ['Take elevator to 1st floor', 'Walk straight', 'Dental is past Neurology'],
    ophthalmology: ['Take elevator to 1st floor', 'Turn right', 'Pass Orthopedics', 'Ophthalmology — last door'],
    elevator1:     ['Take elevator to 1st floor', 'Elevator is directly ahead'],
  },
  ku: {
    entrance:  ['تۆ لە دەروازەی سەرەکیت'],
    reception: ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', '٢٠ مەتر ڕاست بڕۆ', 'پێشوازی لە بەردەمتە'],
    emergency: ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'فەورەن بچۆ لای چەپ', 'فریاکەوتن لە لای چەپت — دەرگای سوور'],
    pharmacy:  ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'تا پێشوازی بڕۆ', 'بچۆ لای ڕاست', 'دەرمانخانە لە کۆتایی ڕێگاکەیە'],
    lab:       ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'لەپاش پێشوازی بچۆ چەپ', 'تاقیگە — دەرگای دووەم لە چەپ'],
    radiology: ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'لەپاش پێشوازی بچۆ ڕاست', 'تیشک لە کۆتایی ڕێڕەوی ڕاستە'],
    elevator:  ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', '١٠ مەتر ڕاست بڕۆ', 'بەرزکەرەوە لە لای ڕاستتە'],
    cardiology:    ['بە بەرزکەرەوە بچۆ نهۆمی یەکەم', 'بچۆ چەپ', 'دڵ — یەکەم دەرگا لە چەپ'],
    neurology:     ['بە بەرزکەرەوە بچۆ نهۆمی یەکەم', 'ڕاست بڕۆ', 'دەمار ڕاستەوخۆ لە بەردەمتە'],
    orthopedics:   ['بە بەرزکەرەوە بچۆ نهۆمی یەکەم', 'بچۆ ڕاست', 'ئێسک — یەکەم دەرگا لە ڕاست'],
    pediatrics:    ['بە بەرزکەرەوە بچۆ نهۆمی یەکەم', 'بچۆ چەپ', 'تێپەڕە لە بەشی دڵ', 'منداڵان — دەرگای دووەم'],
    dental:        ['بە بەرزکەرەوە بچۆ نهۆمی یەکەم', 'ڕاست بڕۆ', 'ددان لەپاش بەشی دەمار'],
    ophthalmology: ['بە بەرزکەرەوە بچۆ نهۆمی یەکەم', 'بچۆ ڕاست', 'تێپەڕە لە بەشی ئێسک', 'چاو — دوایین دەرگا'],
    elevator1:     ['بە بەرزکەرەوە بچۆ نهۆمی یەکەم', 'بەرزکەرەوە ڕاستەوخۆ لە بەردەمتە'],
  },
};

const sectionNames: Record<string, Record<string, string>> = {
  ar: { entrance: 'المدخل', reception: 'الاستقبال', emergency: 'الطوارئ', pharmacy: 'الصيدلية', lab: 'المختبر', radiology: 'الأشعة', elevator: 'المصعد', cardiology: 'القلب', neurology: 'الأعصاب', orthopedics: 'العظام', pediatrics: 'الأطفال', dental: 'الأسنان', ophthalmology: 'العيون' },
  en: { entrance: 'Entrance', reception: 'Reception', emergency: 'Emergency', pharmacy: 'Pharmacy', lab: 'Laboratory', radiology: 'Radiology', elevator: 'Elevator', cardiology: 'Cardiology', neurology: 'Neurology', orthopedics: 'Orthopedics', pediatrics: 'Pediatrics', dental: 'Dental', ophthalmology: 'Ophthalmology' },
  ku: { entrance: 'دەروازە', reception: 'پێشوازی', emergency: 'فریاکەوتن', pharmacy: 'دەرمانخانە', lab: 'تاقیگە', radiology: 'تیشک', elevator: 'بەرزکەرەوە', cardiology: 'دڵ', neurology: 'دەمار', orthopedics: 'ئێسک', pediatrics: 'منداڵان', dental: 'ددان', ophthalmology: 'چاو' },
};

const floorLabels: Record<string, Record<number, string>> = {
  ar: { 0: 'الطابق الأرضي', 1: 'الطابق الأول' },
  en: { 0: 'Ground Floor', 1: 'First Floor' },
  ku: { 0: 'نهۆمی خوارەوە', 1: 'نهۆمی یەکەم' },
};

const uiText: Record<string, { title: string; subtitle: string; search: string; directions: string; qr: string; step: string; scanQr: string }> = {
  ar: { title: 'خريطة المبنى التفاعلية', subtitle: 'انقر على أي قسم لعرض اتجاهات المشي', search: 'ابحث عن قسم...', directions: 'اتجاهات المشي', qr: 'امسح للخريطة على هاتفك', step: 'خطوة', scanQr: 'امسح الكود' },
  en: { title: 'Interactive Building Map', subtitle: 'Click any department to see walking directions', search: 'Search department...', directions: 'Walking Directions', qr: 'Scan for map on your phone', step: 'Step', scanQr: 'Scan QR Code' },
  ku: { title: 'نەخشەی بینای کارلێکەر', subtitle: 'کلیک لەسەر هەر بەشێک بکە بۆ بینینی ئاڕاستەکان', search: 'بگەڕێ بۆ بەشێک...', directions: 'ئاڕاستەی ڕۆیشتن', qr: 'سکان بکە بۆ نەخشە لە مۆبایلت', step: 'هەنگاو', scanQr: 'کۆدی QR سکان بکە' },
};

const SVG_W = 780;
const SVG_H = 420;

const HospitalMap = () => {
  const { lang } = useLanguage();
  const [activeFloor, setActiveFloor] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQr, setShowQr] = useState(false);

  const txt = uiText[lang];
  const names = sectionNames[lang];
  const floors = floorLabels[lang];

  const currentSections = activeFloor === 0 ? groundFloor : firstFloor;

  const filteredSections = useMemo(() => {
    if (!searchTerm) return currentSections;
    return currentSections.filter(s =>
      names[s.nameKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, currentSections, names]);

  const selected = selectedId ? [...groundFloor, ...firstFloor].find(s => s.id === selectedId) : null;
  const selectedDirections = selected ? directions[lang]?.[selected.id] : null;

  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">{txt.title}</h2>
          <p className="text-muted-foreground">{txt.subtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
            {/* Controls bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 border-b border-border">
              <div className="flex bg-secondary rounded-lg p-1">
                {[0, 1].map(f => (
                  <button
                    key={f}
                    onClick={() => { setActiveFloor(f); setSelectedId(null); }}
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
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-56">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={txt.search}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full ps-9 pe-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={() => setShowQr(!showQr)}
                  className={`p-2 rounded-lg border transition-colors ${showQr ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
                  title={txt.scanQr}
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* SVG Floor Plan */}
              <div className="flex-1 p-4">
                <div className="bg-secondary/50 rounded-xl p-3 border border-border">
                  <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto" style={{ minHeight: 280 }}>
                    {/* Background grid */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(215 20% 91%)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width={SVG_W} height={SVG_H} fill="url(#grid)" rx="12" />

                    {/* Building outline */}
                    <rect x="10" y="10" width={SVG_W - 20} height={SVG_H - 20} rx="10" fill="none" stroke="hsl(215 20% 80%)" strokeWidth="1.5" strokeDasharray="6 3" />

                    {/* Corridors */}
                    {activeFloor === 0 ? (
                      <>
                        <rect x="250" y="100" width="300" height="20" rx="3" fill="hsl(215 20% 93%)" />
                        <rect x="390" y="100" width="20" height="260" rx="3" fill="hsl(215 20% 93%)" />
                      </>
                    ) : (
                      <>
                        <rect x="260" y="170" width="280" height="20" rx="3" fill="hsl(215 20% 93%)" />
                        <rect x="390" y="20" width="20" height="330" rx="3" fill="hsl(215 20% 93%)" />
                      </>
                    )}

                    {/* Rooms */}
                    {filteredSections.map(section => {
                      const isActive = selectedId === section.id;
                      const Icon = section.icon;
                      return (
                        <g
                          key={section.id}
                          onClick={() => setSelectedId(isActive ? null : section.id)}
                          className="cursor-pointer"
                          role="button"
                          tabIndex={0}
                        >
                          <rect
                            x={section.x}
                            y={section.y}
                            width={section.w}
                            height={section.h}
                            rx="8"
                            fill={isActive ? section.color : `${section.color}15`}
                            stroke={section.color}
                            strokeWidth={isActive ? 2.5 : 1.5}
                            className="transition-all duration-200"
                          />
                          {/* Icon circle */}
                          <circle
                            cx={section.x + section.w / 2}
                            cy={section.y + section.h / 2 - 8}
                            r="14"
                            fill={isActive ? 'white' : `${section.color}25`}
                          />
                          <foreignObject
                            x={section.x + section.w / 2 - 10}
                            y={section.y + section.h / 2 - 22}
                            width="20"
                            height="20"
                          >
                            <div className="flex items-center justify-center w-full h-full">
                              <Icon
                                className="w-4 h-4"
                                style={{ color: isActive ? section.color : section.color }}
                              />
                            </div>
                          </foreignObject>
                          {/* Label */}
                          <text
                            x={section.x + section.w / 2}
                            y={section.y + section.h / 2 + 16}
                            textAnchor="middle"
                            fill={isActive ? 'white' : 'hsl(215 25% 30%)'}
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="'IBM Plex Sans Arabic', sans-serif"
                          >
                            {names[section.nameKey]}
                          </text>
                          {/* Room number */}
                          <text
                            x={section.x + section.w - 8}
                            y={section.y + 14}
                            textAnchor="end"
                            fill={isActive ? 'rgba(255,255,255,0.7)' : `${section.color}80`}
                            fontSize="9"
                            fontFamily="monospace"
                          >
                            {section.roomNum}
                          </text>
                          {/* Active ping */}
                          {isActive && (
                            <circle cx={section.x + 12} cy={section.y + 12} r="5" fill="white" stroke={section.color} strokeWidth="2">
                              <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                          )}
                        </g>
                      );
                    })}

                    {/* Entrance arrow */}
                    {activeFloor === 0 && (
                      <g>
                        <line x1="400" y1={SVG_H - 10} x2="400" y2={SVG_H - 35} stroke="#2A7FFF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <defs>
                          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#2A7FFF" />
                          </marker>
                        </defs>
                      </g>
                    )}
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentSections.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedId(selectedId === s.id ? null : s.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedId === s.id
                          ? 'text-primary-foreground shadow-sm'
                          : 'bg-background text-foreground border border-border hover:border-primary/40'
                      }`}
                      style={selectedId === s.id ? { backgroundColor: s.color } : undefined}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selectedId === s.id ? '#fff' : s.color }} />
                      {names[s.nameKey]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Side panel: Directions + QR */}
              <div className="lg:w-80 border-t lg:border-t-0 lg:border-s border-border">
                {selected && selectedDirections ? (
                  <div className="p-5">
                    {/* Selected section header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selected.color}18` }}>
                        <selected.icon className="w-5 h-5" style={{ color: selected.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-tight">{names[selected.nameKey]}</h3>
                        <span className="text-xs text-muted-foreground">{floors[selected.floor]} · {selected.roomNum}</span>
                      </div>
                    </div>

                    {/* Walking directions */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Footprints className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{txt.directions}</span>
                      </div>
                      <ol className="space-y-2.5">
                        {selectedDirections.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground mt-0.5"
                              style={{ backgroundColor: selected.color }}
                            >
                              {i + 1}
                            </span>
                            <div>
                              <p className="text-sm text-foreground leading-relaxed">{step}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Navigate button */}
                    <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                      <Navigation className="w-4 h-4" />
                      {txt.directions}
                    </button>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                      <MapPin className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{txt.subtitle}</p>
                  </div>
                )}

                {/* QR Code section */}
                {showQr && (
                  <div className="p-5 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <QrCode className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{txt.scanQr}</span>
                    </div>
                    <div className="bg-background rounded-xl p-4 border border-border flex flex-col items-center">
                      {/* Simple QR code representation */}
                      <svg viewBox="0 0 120 120" className="w-28 h-28 mb-2">
                        {/* QR positioning patterns */}
                        <rect x="5" y="5" width="30" height="30" rx="3" fill="hsl(215 25% 15%)" />
                        <rect x="10" y="10" width="20" height="20" rx="2" fill="white" />
                        <rect x="14" y="14" width="12" height="12" rx="1" fill="hsl(215 25% 15%)" />

                        <rect x="85" y="5" width="30" height="30" rx="3" fill="hsl(215 25% 15%)" />
                        <rect x="90" y="10" width="20" height="20" rx="2" fill="white" />
                        <rect x="94" y="14" width="12" height="12" rx="1" fill="hsl(215 25% 15%)" />

                        <rect x="5" y="85" width="30" height="30" rx="3" fill="hsl(215 25% 15%)" />
                        <rect x="10" y="90" width="20" height="20" rx="2" fill="white" />
                        <rect x="14" y="94" width="12" height="12" rx="1" fill="hsl(215 25% 15%)" />

                        {/* Data pattern */}
                        {[42,48,54,60,66,72].map(x =>
                          [42,48,54,60,66,72].map(y => (
                            <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.5"
                              fill={(x + y) % 12 === 0 ? 'hsl(215 100% 58%)' : 'hsl(215 25% 15%)'}
                              opacity={Math.random() > 0.3 ? 1 : 0.3}
                            />
                          ))
                        )}
                        {[42,50,58,66,74].map(x => (
                          <rect key={`t-${x}`} x={x} y="10" width="4" height="4" rx="0.5" fill="hsl(215 25% 15%)" opacity={x % 16 === 0 ? 1 : 0.6} />
                        ))}
                        {[42,50,58,66,74].map(y => (
                          <rect key={`l-${y}`} x="10" y={y} width="4" height="4" rx="0.5" fill="hsl(215 25% 15%)" opacity={y % 16 === 0 ? 1 : 0.6} />
                        ))}
                      </svg>
                      <p className="text-xs text-muted-foreground text-center">{txt.qr}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalMap;
