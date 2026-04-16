import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Menu, X, Search, Phone, Globe, ChevronDown } from 'lucide-react';
import hospitalLogo from '@/assets/hospital-logo.jpeg';

const langLabels: Record<Language, string> = { ar: 'عربی', en: 'English', ku: 'کوردی' };

const Navbar = () => {
  const { lang, t, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const medicalLinks = [
    { path: '/doctors', label: t.nav.doctors },
    { path: '/departments', label: t.nav.departments },
    { path: '/lab', label: t.nav.lab },
  ];

  const aboutLinks = [
    { path: '/events', label: t.nav.events },
    { path: '/blog', label: t.nav.blog },
    { path: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const isGroupActive = (links: { path: string }[]) =>
    links.some(l => location.pathname === l.path);

  const DropdownMenu = ({ label, links, id }: { label: string; links: { path: string; label: string }[]; id: string }) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isGroupActive(links)
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === id ? 'rotate-180' : ''}`} />
      </button>
      {openDropdown === id && (
        <div className="absolute top-full start-0 mt-1 bg-card border border-border rounded-lg shadow-elevated py-1 min-w-[160px] z-50">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpenDropdown(null)}
              className={`block px-4 py-2.5 text-sm transition-colors ${
                location.pathname === link.path
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="container flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>{t.contact.phoneValue}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/patient-portal" className="flex items-center gap-1 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-3 py-0.5 rounded-full text-xs font-semibold transition-colors">
              {t.nav.portal}
            </Link>
            <a href="tel:+9647509990000" className="flex items-center gap-1 bg-emergency text-emergency-foreground px-3 py-0.5 rounded-full text-xs font-semibold">
              {t.nav.emergency}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors">
          <img src={hospitalLogo} alt="The English Hospital" className="h-14 w-14 rounded-xl object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold text-primary tracking-tight leading-none">The English</span>
            <span className="text-[11px] font-medium text-muted-foreground leading-none mt-0.5">Hospital</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {t.nav.home}
          </Link>

          <DropdownMenu id="medical" label={t.nav.medicalServices} links={medicalLinks} />

          <Link
            to="/appointment"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/appointment'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {t.nav.appointment}
          </Link>

          <DropdownMenu id="about" label={t.nav.about} links={aboutLinks} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-md hover:bg-secondary text-muted-foreground">
            <Search className="w-5 h-5" />
          </button>

          {/* Language switcher */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 p-2 rounded-md hover:bg-secondary text-muted-foreground">
              <Globe className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">{langLabels[lang]}</span>
            </button>
            {langOpen && (
              <div className="absolute top-full end-0 mt-1 bg-card border border-border rounded-lg shadow-elevated py-1 min-w-[120px]">
                {(Object.keys(langLabels) as Language[]).map(l => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`w-full text-start px-4 py-2 text-sm hover:bg-secondary transition-colors ${l === lang ? 'text-primary font-semibold' : 'text-foreground'}`}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-md hover:bg-secondary text-muted-foreground lg:hidden">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="container pb-3">
          <input
            type="text"
            placeholder={t.nav.search}
            className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-3 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              {t.nav.home}
            </Link>

            {/* Medical Services group */}
            <div className="pt-2">
              <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.nav.medicalServices}</span>
              <div className="mt-1 space-y-0.5">
                {medicalLinks.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ms-2 ${location.pathname === link.path ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/appointment" onClick={() => setMobileOpen(false)} className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${location.pathname === '/appointment' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              {t.nav.appointment}
            </Link>

            {/* About group */}
            <div className="pt-2">
              <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.nav.about}</span>
              <div className="mt-1 space-y-0.5">
                {aboutLinks.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ms-2 ${location.pathname === link.path ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
