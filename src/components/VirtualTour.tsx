import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Heart, Brain, Bone, Baby, SmilePlus, Eye, Siren, FlaskConical,
  Pill, ScanLine, ArrowUpDown, MapPin, ChevronUp, RotateCcw,
  MoveRight, ArrowRight, Home
} from 'lucide-react';

import lobbyImg from '@/assets/hospital-360-lobby.jpg';
import floor1Img from '@/assets/hospital-360-floor1.jpg';
import tourEmergency from '@/assets/tour-emergency.jpg';
import tourPharmacy from '@/assets/tour-pharmacy.jpg';
import tourRadiology from '@/assets/tour-radiology.jpg';
import tourLab from '@/assets/tour-lab.jpg';
import tourCardiology from '@/assets/tour-cardiology.jpg';
import tourPediatrics from '@/assets/tour-pediatrics.jpg';

// ─── Tour Spots ───
interface TourSpot {
  id: string;
  nameKey: string;
  icon: React.ElementType;
  color: string;
  floor: number;
  image: string;
  hotspots: Hotspot[];
}

interface Hotspot {
  targetId: string;
  /** Position as percentage from left */
  x: number;
  /** Position as percentage from top */
  y: number;
  direction: 'forward' | 'left' | 'right' | 'up' | 'back';
}

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

const sectionNames: Record<string, Record<string, string>> = {
  ar: { reception: 'الاستقبال', emergency: 'الطوارئ', pharmacy: 'الصيدلية', lab: 'المختبر', radiology: 'الأشعة', elevator: 'المصعد', cardiology: 'القلب', neurology: 'الأعصاب', orthopedics: 'العظام', pediatrics: 'الأطفال', dental: 'الأسنان', ophthalmology: 'العيون' },
  en: { reception: 'Reception', emergency: 'Emergency', pharmacy: 'Pharmacy', lab: 'Laboratory', radiology: 'Radiology', elevator: 'Elevator / 1st Floor', cardiology: 'Cardiology', neurology: 'Neurology', orthopedics: 'Orthopedics', pediatrics: 'Pediatrics', dental: 'Dental', ophthalmology: 'Ophthalmology' },
  ku: { reception: 'پێشوازی', emergency: 'فریاکەوتن', pharmacy: 'دەرمانخانە', lab: 'تاقیگە', radiology: 'تیشک', elevator: 'بەرزکەرەوە / نهۆمی ١', cardiology: 'دڵ', neurology: 'دەمار', orthopedics: 'ئێسک', pediatrics: 'منداڵان', dental: 'ددان', ophthalmology: 'چاو' },
};

const uiText: Record<string, Record<string, string>> = {
  ar: { title: 'جولة افتراضية داخل المستشفى', subtitle: 'انقر على الأسهم للتنقل بين الأقسام', backToLobby: 'العودة للاستقبال', floor: 'الطابق', dragHint: 'اسحب لاستكشاف · انقر الأسهم للتنقل', youAreHere: 'أنت هنا' },
  en: { title: 'Virtual Hospital Tour', subtitle: 'Click the arrows to walk between departments', backToLobby: 'Back to Lobby', floor: 'Floor', dragHint: 'Drag to look around · Click arrows to navigate', youAreHere: 'You are here' },
  ku: { title: 'گەشتی ڤیرچواڵی نەخۆشخانە', subtitle: 'کلیک لەسەر تیرەکان بکە بۆ ڕۆیشتن نێوان بەشەکان', backToLobby: 'گەڕانەوە بۆ پێشوازی', floor: 'نهۆم', dragHint: 'ڕابکێشە بۆ تەماشاکردن · کلیک لەسەر تیرەکان بۆ گەڕان', youAreHere: 'تۆ لێرەیت' },
};

const directionIcons: Record<string, React.ElementType> = {
  forward: ArrowRight,
  left: ArrowRight,
  right: ArrowRight,
  up: ChevronUp,
  back: ArrowRight,
};

const directionRotation: Record<string, string> = {
  forward: '0deg',
  left: '180deg',
  right: '0deg',
  up: '0deg',
  back: '180deg',
};

const VirtualTour = () => {
  const { lang } = useLanguage();
  const [currentSpotId, setCurrentSpotId] = useState('lobby');
  const [offset, setOffset] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [baseOffset, setBaseOffset] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const txt = uiText[lang];
  const names = sectionNames[lang];
  const currentSpot = tourSpots.find(s => s.id === currentSpotId)!;

  const navigateTo = useCallback((targetId: string) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSpotId(targetId);
      setOffset(0);
      setBaseOffset(0);
      setTransitioning(false);
    }, 400);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setDragStart(e.clientX);
    setBaseOffset(offset);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStart === null) return;
    setOffset(baseOffset + (e.clientX - dragStart));
  }, [dragStart, baseOffset]);

  const handlePointerUp = useCallback(() => setDragStart(null), []);

  // Navigation breadcrumb trail
  const floorLabel = currentSpot.floor === 0 ? (lang === 'ar' ? 'الأرضي' : lang === 'ku' ? 'خوارەوە' : 'Ground') : (lang === 'ar' ? 'الأول' : lang === 'ku' ? 'یەکەم' : '1st');

  return (
    <section className="py-16 bg-secondary" id="virtual-tour">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">{txt.title}</h2>
          <p className="text-muted-foreground">{txt.subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
            {/* Top bar: location + quick nav */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${currentSpot.color}18` }}>
                  <currentSpot.icon className="w-4 h-4" style={{ color: currentSpot.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{names[currentSpot.nameKey]}</p>
                  <p className="text-[10px] text-muted-foreground">{txt.floor} {floorLabel} · {txt.youAreHere}</p>
                </div>
              </div>

              {currentSpotId !== 'lobby' && (
                <button
                  onClick={() => navigateTo('lobby')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  {txt.backToLobby}
                </button>
              )}
            </div>

            {/* Panoramic viewer with hotspots */}
            <div
              ref={containerRef}
              className={`relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden cursor-grab active:cursor-grabbing select-none transition-opacity duration-400 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* Panoramic image */}
              <img
                src={currentSpot.image}
                alt={names[currentSpot.nameKey]}
                className="absolute top-0 h-full w-auto max-w-none pointer-events-none"
                style={{ left: offset }}
                draggable={false}
              />

              {/* Vignette overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
              }} />

              {/* Navigation hotspot arrows */}
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
                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: target.color }} />

                    {/* Arrow container */}
                    <div
                      className="relative flex flex-col items-center gap-1"
                    >
                      {/* Arrow circle */}
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white/80 backdrop-blur-sm transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${target.color}dd` }}
                      >
                        <Icon
                          className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                          style={{ transform: `rotate(${directionRotation[hotspot.direction]})` }}
                        />
                      </div>

                      {/* Label */}
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

              {/* Reset button */}
              <button
                onClick={() => setOffset(0)}
                className="absolute top-3 end-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick department navigation */}
            <div className="px-4 py-3 border-t border-border bg-secondary/30">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {tourSpots.map(spot => {
                  const isActive = currentSpotId === spot.id;
                  const SpotIcon = spot.icon;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => navigateTo(spot.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                        isActive
                          ? 'text-primary-foreground shadow-sm'
                          : 'bg-background text-foreground border border-border hover:border-primary/40'
                      }`}
                      style={isActive ? { backgroundColor: spot.color } : undefined}
                    >
                      <SpotIcon className="w-3.5 h-3.5" />
                      {names[spot.nameKey]}
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

export default VirtualTour;
