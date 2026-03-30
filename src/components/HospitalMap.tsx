import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import {
  Heart, Brain, Bone, Baby, SmilePlus, Eye, Siren, FlaskConical,
  Pill, ScanLine, DoorOpen, ArrowUpDown, MapPin, Search, QrCode,
  Footprints, ChevronLeft, ChevronRight, ChevronDown, RotateCcw,
  Maximize2, X, Play, Pause, MoveRight, ChevronUp, Home
} from 'lucide-react';
import lobbyImg from '@/assets/hospital-360-lobby.jpg';
import floor1Img from '@/assets/hospital-360-floor1.jpg';
import tourEmergency from '@/assets/tour-emergency.jpg';
import tourPharmacy from '@/assets/tour-pharmacy.jpg';
import tourRadiology from '@/assets/tour-radiology.jpg';
import tourLab from '@/assets/tour-lab.jpg';
import tourCardiology from '@/assets/tour-cardiology.jpg';
import tourPediatrics from '@/assets/tour-pediatrics.jpg';

// ─── Types ───
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

interface Hotspot {
  targetId: string;
  x: number;
  y: number;
  direction: 'forward' | 'left' | 'right' | 'up' | 'back';
}

interface TourSpot {
  id: string;
  nameKey: string;
  icon: React.ElementType;
  color: string;
  floor: number;
  image: string;
  hotspots: Hotspot[];
}

// ─── Floor Plan Data ───
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
  { id: 'cardiology',    nameKey: 'cardiology',    icon: Heart,       color: '#E53E3E', floor: 1, x: 20,  y: 20,  w: 230, h: 150, roomNum: '1-01' },
  { id: 'neurology',     nameKey: 'neurology',     icon: Brain,       color: '#805AD5', floor: 1, x: 290, y: 20,  w: 200, h: 130, roomNum: '1-02' },
  { id: 'orthopedics',   nameKey: 'orthopedics',   icon: Bone,        color: '#DD6B20', floor: 1, x: 530, y: 20,  w: 230, h: 150, roomNum: '1-03' },
  { id: 'pediatrics',    nameKey: 'pediatrics',    icon: Baby,        color: '#38B2AC', floor: 1, x: 20,  y: 210, w: 230, h: 140, roomNum: '1-04' },
  { id: 'dental',        nameKey: 'dental',        icon: SmilePlus,   color: '#D69E2E', floor: 1, x: 290, y: 190, w: 200, h: 130, roomNum: '1-05' },
  { id: 'ophthalmology', nameKey: 'ophthalmology', icon: Eye,         color: '#38A169', floor: 1, x: 530, y: 210, w: 230, h: 140, roomNum: '1-06' },
  { id: 'elevator1',     nameKey: 'elevator',      icon: ArrowUpDown, color: '#718096', floor: 1, x: 350, y: 350, w: 100, h: 50,  roomNum: '1-EL' },
];

const allMapSections = [groundFloor, firstFloor];

// ─── 360° Tour Spots per floor ───
const tourSpots: TourSpot[] = [
  {
    id: 'lobby', nameKey: 'reception', icon: MapPin, color: '#2A7FFF', floor: 0,
    image: lobbyImg,
    hotspots: [
      { targetId: 'emergency', x: 15, y: 55, direction: 'left' },
      { targetId: 'pharmacy', x: 85, y: 55, direction: 'right' },
      { targetId: 'lab', x: 20, y: 70, direction: 'left' },
      { targetId: 'radiology', x: 80, y: 70, direction: 'right' },
      { targetId: 'floor1-hall', x: 50, y: 40, direction: 'up' },
    ],
  },
  {
    id: 'emergency', nameKey: 'emergency', icon: Siren, color: '#E53E3E', floor: 0,
    image: tourEmergency,
    hotspots: [
      { targetId: 'lobby', x: 50, y: 75, direction: 'back' },
      { targetId: 'lab', x: 80, y: 55, direction: 'right' },
    ],
  },
  {
    id: 'pharmacy', nameKey: 'pharmacy', icon: Pill, color: '#38A169', floor: 0,
    image: tourPharmacy,
    hotspots: [
      { targetId: 'lobby', x: 50, y: 75, direction: 'back' },
      { targetId: 'radiology', x: 20, y: 55, direction: 'left' },
    ],
  },
  {
    id: 'lab', nameKey: 'lab', icon: FlaskConical, color: '#805AD5', floor: 0,
    image: tourLab,
    hotspots: [
      { targetId: 'lobby', x: 50, y: 75, direction: 'back' },
      { targetId: 'emergency', x: 20, y: 55, direction: 'left' },
    ],
  },
  {
    id: 'radiology', nameKey: 'radiology', icon: ScanLine, color: '#3182CE', floor: 0,
    image: tourRadiology,
    hotspots: [
      { targetId: 'lobby', x: 50, y: 75, direction: 'back' },
      { targetId: 'pharmacy', x: 80, y: 55, direction: 'right' },
    ],
  },
  {
    id: 'floor1-hall', nameKey: 'elevator', icon: ArrowUpDown, color: '#718096', floor: 1,
    image: floor1Img,
    hotspots: [
      { targetId: 'cardiology', x: 15, y: 50, direction: 'left' },
      { targetId: 'pediatrics', x: 85, y: 50, direction: 'right' },
      { targetId: 'lobby', x: 50, y: 80, direction: 'back' },
    ],
  },
  {
    id: 'cardiology', nameKey: 'cardiology', icon: Heart, color: '#E53E3E', floor: 1,
    image: tourCardiology,
    hotspots: [
      { targetId: 'floor1-hall', x: 50, y: 75, direction: 'back' },
      { targetId: 'pediatrics', x: 80, y: 55, direction: 'right' },
    ],
  },
  {
    id: 'pediatrics', nameKey: 'pediatrics', icon: Baby, color: '#38B2AC', floor: 1,
    image: tourPediatrics,
    hotspots: [
      { targetId: 'floor1-hall', x: 50, y: 75, direction: 'back' },
      { targetId: 'cardiology', x: 20, y: 55, direction: 'left' },
    ],
  },
];

// ─── Translations ───
const directions: Record<string, Record<string, string[]>> = {
  ar: {
    entrance:      ['أنت عند المدخل الرئيسي'],
    reception:     ['ادخل من المدخل الرئيسي', 'امشِ للأمام ٢٠ متراً', 'الاستقبال أمامك مباشرة'],
    emergency:     ['ادخل من المدخل الرئيسي', 'اتجه يساراً فوراً', 'قسم الطوارئ على يسارك — باب أحمر'],
    pharmacy:      ['ادخل من المدخل الرئيسي', 'امشِ للأمام حتى الاستقبال', 'اتجه يميناً', 'الصيدلية في نهاية الممر'],
    lab:           ['ادخل من المدخل الرئيسي', 'اتجه يساراً بعد الاستقبال', 'المختبر — الباب الثاني على اليسار'],
    radiology:     ['ادخل من المدخل الرئيسي', 'اتجه يميناً بعد الاستقبال', 'قسم الأشعة في نهاية الممر الأيمن'],
    elevator:      ['ادخل من المدخل الرئيسي', 'امشِ للأمام ١٠ أمتار', 'المصعد على يمينك'],
    cardiology:    ['اصعد بالمصعد للطابق الأول', 'اتجه يساراً', 'قسم القلب — أول باب على اليسار'],
    neurology:     ['اصعد بالمصعد للطابق الأول', 'امشِ للأمام', 'قسم الأعصاب أمامك مباشرة'],
    orthopedics:   ['اصعد بالمصعد للطابق الأول', 'اتجه يميناً', 'قسم العظام — أول باب على اليمين'],
    pediatrics:    ['اصعد بالمصعد للطابق الأول', 'اتجه يساراً', 'تجاوز قسم القلب', 'قسم الأطفال — الباب الثاني'],
    dental:        ['اصعد بالمصعد للطابق الأول', 'امشِ للأمام', 'قسم الأسنان بعد قسم الأعصاب'],
    ophthalmology: ['اصعد بالمصعد للطابق الأول', 'اتجه يميناً', 'تجاوز قسم العظام', 'قسم العيون — آخر باب'],
    elevator1:     ['اصعد بالمصعد للطابق الأول', 'المصعد أمامك مباشرة'],
  },
  en: {
    entrance:      ['You are at the main entrance'],
    reception:     ['Enter through the main entrance', 'Walk straight 20 meters', 'Reception is directly ahead'],
    emergency:     ['Enter through the main entrance', 'Turn left immediately', 'Emergency is on your left — red door'],
    pharmacy:      ['Enter through the main entrance', 'Walk to reception', 'Turn right', 'Pharmacy at the end of the hall'],
    lab:           ['Enter through the main entrance', 'Turn left past reception', 'Lab — second door on the left'],
    radiology:     ['Enter through the main entrance', 'Turn right past reception', 'Radiology at the end of the right corridor'],
    elevator:      ['Enter through the main entrance', 'Walk straight 10 meters', 'Elevator on your right'],
    cardiology:    ['Take elevator to 1st floor', 'Turn left', 'Cardiology — first door on the left'],
    neurology:     ['Take elevator to 1st floor', 'Walk straight ahead', 'Neurology directly in front'],
    orthopedics:   ['Take elevator to 1st floor', 'Turn right', 'Orthopedics — first door on the right'],
    pediatrics:    ['Take elevator to 1st floor', 'Turn left', 'Pass Cardiology', 'Pediatrics — second door'],
    dental:        ['Take elevator to 1st floor', 'Walk straight', 'Dental is past Neurology'],
    ophthalmology: ['Take elevator to 1st floor', 'Turn right', 'Pass Orthopedics', 'Ophthalmology — last door'],
    elevator1:     ['Take elevator to 1st floor', 'Elevator directly ahead'],
  },
  ku: {
    entrance:      ['تۆ لە دەروازەی سەرەکیت'],
    reception:     ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', '٢٠ مەتر ڕاست بڕۆ', 'پێشوازی لە بەردەمتە'],
    emergency:     ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'فەورەن بچۆ لای چەپ', 'فریاکەوتن لە لای چەپت'],
    pharmacy:      ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'تا پێشوازی بڕۆ', 'بچۆ لای ڕاست', 'دەرمانخانە لە کۆتایی ڕێگاکەیە'],
    lab:           ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'لەپاش پێشوازی بچۆ چەپ', 'تاقیگە — دەرگای دووەم لە چەپ'],
    radiology:     ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', 'لەپاش پێشوازی بچۆ ڕاست', 'تیشک لە کۆتایی ڕێڕەوی ڕاستە'],
    elevator:      ['لە دەروازەی سەرەکییەوە بچۆ ژوورەوە', '١٠ مەتر ڕاست بڕۆ', 'بەرزکەرەوە لە لای ڕاستتە'],
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

const floorLabels: Record<string, string[]> = {
  ar: ['الطابق الأرضي', 'الطابق الأول'],
  en: ['Ground Floor', '1st Floor'],
  ku: ['نهۆمی خوارەوە', 'نهۆمی یەکەم'],
};

const uiText: Record<string, Record<string, string>> = {
  ar: { title: 'خريطة المبنى والجولة الافتراضية', subtitle: 'استكشف المستشفى بالخريطة التفاعلية أو الجولة الافتراضية ٣٦٠°', search: 'ابحث عن قسم...', directions: 'اتجاهات المشي', scanQr: 'امسح للخريطة على هاتفك', view360: '٣٦٠° جولة', viewMap: 'خريطة', selectDept: 'اختر قسماً من الخريطة', dragHint: 'اسحب لاستكشاف · انقر الأسهم للتنقل', floor: 'طابق', backToLobby: 'العودة للاستقبال', youAreHere: 'أنت هنا', autoRotate: 'دوران تلقائي', enterTour: 'ادخل الجولة الافتراضية' },
  en: { title: 'Building Map & Virtual Tour', subtitle: 'Explore the hospital with the interactive map or 360° virtual walkthrough', search: 'Search department...', directions: 'Walking Directions', scanQr: 'Scan for map on your phone', view360: '360° Tour', viewMap: 'Map', selectDept: 'Select a department from the map', dragHint: 'Drag to look around · Click arrows to navigate', floor: 'Floor', backToLobby: 'Back to Lobby', youAreHere: 'You are here', autoRotate: 'Auto Rotate', enterTour: 'Enter Virtual Tour' },
  ku: { title: 'نەخشەی بینا و گەشتی ڤیرچواڵ', subtitle: 'نەخۆشخانەکە بگەڕێ بە نەخشەی کارلێکەر یان گەشتی ڤیرچواڵی ٣٦٠°', search: 'بگەڕێ بۆ بەشێک...', directions: 'ئاڕاستەی ڕۆیشتن', scanQr: 'سکان بکە بۆ نەخشە لە مۆبایلت', view360: '٣٦٠° گەشت', viewMap: 'نەخشە', selectDept: 'بەشێک هەڵبژێرە لە نەخشەکە', dragHint: 'ڕابکێشە بۆ تەماشاکردن · کلیک لەسەر تیرەکان بۆ گەڕان', floor: 'نهۆم', backToLobby: 'گەڕانەوە بۆ پێشوازی', youAreHere: 'تۆ لێرەیت', autoRotate: 'خودکار بسوڕێتەوە', enterTour: 'بچۆ ژوورەوەی گەشت' },
};

const directionRotation: Record<string, string> = {
  forward: '0deg', left: '180deg', right: '0deg', up: '0deg', back: '180deg',
};

const SVG_W = 780;
const SVG_H = 420;

// Default 360 spot per floor
const defaultSpotPerFloor: Record<number, string> = { 0: 'lobby', 1: 'floor1-hall' };

const HospitalMap = () => {
  const { lang } = useLanguage();
  const [activeFloor, setActiveFloor] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | '360'>('map');
  const [floorDropdownOpen, setFloorDropdownOpen] = useState(false);

  // 360° state
  const [currentSpotId, setCurrentSpotId] = useState('lobby');
  const [offset, setOffset] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [baseOffset, setBaseOffset] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const autoRotateRef = useRef<number | null>(null);

  const txt = uiText[lang];
  const names = sectionNames[lang];
  const floors = floorLabels[lang];
  const totalFloors = floors.length;

  const currentSections = allMapSections[activeFloor] || [];
  const currentSpot = tourSpots.find(s => s.id === currentSpotId)!;
  const floorTourSpots = tourSpots.filter(s => s.floor === activeFloor);

  const filteredSections = useMemo(() => {
    if (!searchTerm) return currentSections;
    return currentSections.filter(s =>
      names[s.nameKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, currentSections, names]);

  const allSections = [...groundFloor, ...firstFloor];
  const selected = selectedId ? allSections.find(s => s.id === selectedId) : null;
  const selectedDirections = selected ? directions[lang]?.[selected.id] : null;

  const qrUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}#building-map`
    : '';

  // Auto-rotate effect
  useEffect(() => {
    if (autoRotate) {
      autoRotateRef.current = window.setInterval(() => {
        setOffset(o => o - 1);
      }, 30);
    } else if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [autoRotate]);

  // Stop auto-rotate on drag
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setAutoRotate(false);
    setDragStart(e.clientX);
    setBaseOffset(offset);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStart === null) return;
    setOffset(baseOffset + (e.clientX - dragStart));
  }, [dragStart, baseOffset]);

  const handlePointerUp = useCallback(() => setDragStart(null), []);

  const navigateTo = useCallback((targetId: string) => {
    setAutoRotate(false);
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSpotId(targetId);
      setOffset(0);
      setBaseOffset(0);
      setTransitioning(false);
      // Update floor if target is on different floor
      const target = tourSpots.find(s => s.id === targetId);
      if (target && target.floor !== activeFloor) {
        setActiveFloor(target.floor);
      }
    }, 350);
  }, [activeFloor]);

  const switchFloor = (floor: number) => {
    setActiveFloor(floor);
    setSelectedId(null);
    setFloorDropdownOpen(false);
    // Switch 360 spot to default for that floor
    const defaultSpot = defaultSpotPerFloor[floor];
    if (defaultSpot && activeTab === '360') {
      setCurrentSpotId(defaultSpot);
      setOffset(0);
      setBaseOffset(0);
    }
  };

  const switchToTab = (tab: 'map' | '360') => {
    setActiveTab(tab);
    if (tab === '360') {
      const defaultSpot = defaultSpotPerFloor[activeFloor] || floorTourSpots[0]?.id;
      if (defaultSpot) {
        setCurrentSpotId(defaultSpot);
        setOffset(0);
        setBaseOffset(0);
      }
    }
  };

  const floorLabel = currentSpot?.floor === 0
    ? (lang === 'ar' ? 'الأرضي' : lang === 'ku' ? 'خوارەوە' : 'Ground')
    : (lang === 'ar' ? 'الأول' : lang === 'ku' ? 'یەکەم' : '1st');

  return (
    <section id="building-map" className="py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">{txt.title}</h2>
          <p className="text-muted-foreground">{txt.subtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
            {/* ─── Controls bar ─── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 border-b border-border">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Floor selector — supports many floors via dropdown */}
                {totalFloors <= 4 ? (
                  <div className="flex bg-secondary rounded-lg p-1">
                    {floors.map((label, f) => (
                      <button
                        key={f}
                        onClick={() => switchFloor(f)}
                        className={`px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                          activeFloor === f
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Dropdown for 5+ floors */
                  <div className="relative">
                    <button
                      onClick={() => setFloorDropdownOpen(!floorDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium border border-border hover:border-primary/40 transition-colors"
                    >
                      {floors[activeFloor]}
                      <ChevronDown className={`w-4 h-4 transition-transform ${floorDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {floorDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setFloorDropdownOpen(false)} />
                        <div className="absolute top-full mt-1 start-0 z-40 bg-card border border-border rounded-xl shadow-elevated max-h-64 overflow-y-auto min-w-[180px]">
                          {floors.map((label, f) => (
                            <button
                              key={f}
                              onClick={() => switchFloor(f)}
                              className={`w-full text-start px-4 py-2.5 text-sm transition-colors ${
                                activeFloor === f
                                  ? 'bg-primary/10 text-primary font-semibold'
                                  : 'text-foreground hover:bg-secondary'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Map / 360 toggle */}
                <div className="flex bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => switchToTab('map')}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                      activeTab === 'map' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {txt.viewMap}
                  </button>
                  <button
                    onClick={() => switchToTab('360')}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                      activeTab === '360' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    {txt.view360}
                  </button>
                </div>
              </div>

              {/* Search + QR */}
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
              {/* ─── Main content area ─── */}
              <div className="flex-1 p-4">

                {/* ═══ 360° PANORAMIC VIEW ═══ */}
                {activeTab === '360' && currentSpot && (
                  <div>
                    {/* Location bar */}
                    <div className="flex items-center justify-between gap-3 mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${currentSpot.color}18` }}>
                          <currentSpot.icon className="w-4 h-4" style={{ color: currentSpot.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">{names[currentSpot.nameKey]}</p>
                          <p className="text-[10px] text-muted-foreground">{txt.floor} {floorLabel} · {txt.youAreHere}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Auto-rotate */}
                        <button
                          onClick={() => setAutoRotate(!autoRotate)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            autoRotate ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground border border-border hover:border-primary/40'
                          }`}
                        >
                          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          {txt.autoRotate}
                        </button>
                        {currentSpotId !== (defaultSpotPerFloor[activeFloor] || 'lobby') && (
                          <button
                            onClick={() => navigateTo(defaultSpotPerFloor[activeFloor] || 'lobby')}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                          >
                            <Home className="w-3.5 h-3.5" />
                            {txt.backToLobby}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Panoramic viewer */}
                    <div
                      className={`relative w-full h-[300px] sm:h-[380px] md:h-[440px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                    >
                      <img
                        src={currentSpot.image}
                        alt={names[currentSpot.nameKey]}
                        className="absolute top-0 h-full w-auto max-w-none pointer-events-none"
                        style={{ left: offset }}
                        draggable={false}
                      />

                      {/* Vignette */}
                      <div className="absolute inset-0 pointer-events-none" style={{
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
                      }} />

                      {/* Hotspot arrows */}
                      {currentSpot.hotspots.map((hotspot, i) => {
                        const target = tourSpots.find(s => s.id === hotspot.targetId);
                        if (!target) return null;
                        const Icon = hotspot.direction === 'up' ? ChevronUp : MoveRight;
                        return (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); navigateTo(hotspot.targetId); }}
                            className="absolute group z-10 pointer-events-auto"
                            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
                          >
                            <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: target.color }} />
                            <div className="relative flex flex-col items-center gap-1">
                              <div
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white/80 backdrop-blur-sm transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${target.color}dd` }}
                              >
                                <Icon
                                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                                  style={{ transform: `rotate(${directionRotation[hotspot.direction]})` }}
                                />
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-lg whitespace-nowrap backdrop-blur-sm" style={{ backgroundColor: `${target.color}cc` }}>
                                {names[target.nameKey]}
                              </span>
                            </div>
                          </button>
                        );
                      })}

                      {/* Bottom gradient */}
                      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                      {/* Drag hint */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full pointer-events-none">
                        {txt.dragHint}
                      </div>

                      {/* Reset */}
                      <button
                        onClick={() => { setOffset(0); setAutoRotate(false); }}
                        className="absolute top-3 end-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Room thumbnails for current floor */}
                    <div className="flex gap-2 overflow-x-auto pt-3 pb-1">
                      {floorTourSpots.map(spot => {
                        const isActive = currentSpotId === spot.id;
                        const SpotIcon = spot.icon;
                        return (
                          <button
                            key={spot.id}
                            onClick={() => navigateTo(spot.id)}
                            className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              isActive ? 'border-primary shadow-md' : 'border-border hover:border-primary/40'
                            }`}
                          >
                            <img src={spot.image} alt={names[spot.nameKey]} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-0.5">
                              <SpotIcon className="w-4 h-4 text-white" />
                              <span className="text-[9px] text-white font-medium leading-tight">{names[spot.nameKey]}</span>
                            </div>
                            {isActive && (
                              <div className="absolute top-1 end-1 w-2 h-2 rounded-full bg-primary" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ═══ SVG FLOOR PLAN ═══ */}
                {activeTab === 'map' && (
                  <>
                    <div className="bg-secondary/50 rounded-xl p-3 border border-border">
                      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto" style={{ minHeight: 260 }}>
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(215 20% 91%)" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width={SVG_W} height={SVG_H} fill="url(#grid)" rx="12" />
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
                            <g key={section.id} onClick={() => setSelectedId(isActive ? null : section.id)} className="cursor-pointer" role="button" tabIndex={0}>
                              <rect
                                x={section.x} y={section.y} width={section.w} height={section.h} rx="8"
                                fill={isActive ? section.color : `${section.color}15`}
                                stroke={section.color} strokeWidth={isActive ? 2.5 : 1.5}
                                className="transition-all duration-200"
                              />
                              <circle cx={section.x + section.w / 2} cy={section.y + section.h / 2 - 8} r="14" fill={isActive ? 'white' : `${section.color}25`} />
                              <foreignObject x={section.x + section.w / 2 - 10} y={section.y + section.h / 2 - 22} width="20" height="20">
                                <div className="flex items-center justify-center w-full h-full">
                                  <Icon className="w-4 h-4" style={{ color: section.color }} />
                                </div>
                              </foreignObject>
                              <text
                                x={section.x + section.w / 2} y={section.y + section.h / 2 + 16}
                                textAnchor="middle" fill={isActive ? 'white' : 'hsl(215 25% 30%)'}
                                fontSize="11" fontWeight="600" fontFamily="'IBM Plex Sans Arabic', sans-serif"
                              >
                                {names[section.nameKey]}
                              </text>
                              <text
                                x={section.x + section.w - 8} y={section.y + 14}
                                textAnchor="end" fill={isActive ? 'rgba(255,255,255,0.7)' : `${section.color}80`}
                                fontSize="9" fontFamily="monospace"
                              >
                                {section.roomNum}
                              </text>
                              {isActive && (
                                <circle cx={section.x + 12} cy={section.y + 12} r="5" fill="white" stroke={section.color} strokeWidth="2">
                                  <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                              )}
                            </g>
                          );
                        })}

                        {activeFloor === 0 && (
                          <g>
                            <defs>
                              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#2A7FFF" />
                              </marker>
                            </defs>
                            <line x1="400" y1={SVG_H - 10} x2="400" y2={SVG_H - 35} stroke="#2A7FFF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Enter 360 tour button */}
                    {floorTourSpots.length > 0 && (
                      <button
                        onClick={() => switchToTab('360')}
                        className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors border border-primary/20"
                      >
                        <Play className="w-4 h-4" />
                        {txt.enterTour} — {floors[activeFloor]}
                      </button>
                    )}

                    {/* Quick department pills */}
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
                  </>
                )}
              </div>

              {/* ─── Side panel ─── */}
              <div className="lg:w-80 border-t lg:border-t-0 lg:border-s border-border">
                {selected && selectedDirections ? (
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selected.color}18` }}>
                        <selected.icon className="w-5 h-5" style={{ color: selected.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-tight">{names[selected.nameKey]}</h3>
                        <span className="text-xs text-muted-foreground">{floors[selected.floor]} · {selected.roomNum}</span>
                      </div>
                    </div>
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Footprints className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{txt.directions}</span>
                      </div>
                      <ol className="space-y-2">
                        {selectedDirections.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground mt-0.5" style={{ backgroundColor: selected.color }}>
                              {i + 1}
                            </span>
                            <p className="text-sm text-foreground leading-relaxed">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center min-h-[260px]">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-3">
                      <MapPin className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{txt.selectDept}</p>
                  </div>
                )}

                {/* QR Code panel */}
                {showQr && (
                  <div className="p-5 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{txt.scanQr}</span>
                      </div>
                      <button onClick={() => setShowQr(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-background rounded-xl p-5 border border-border flex flex-col items-center">
                      <QRCodeSVG value={qrUrl} size={140} bgColor="transparent" fgColor="hsl(215, 25%, 15%)" level="M" includeMargin={false} />
                      <p className="text-xs text-muted-foreground text-center mt-3">{txt.scanQr}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1 break-all text-center max-w-[200px]">{qrUrl}</p>
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
