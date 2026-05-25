import { useEffect, useRef, useState } from 'react';
import {
  Anchor,
  Bike,
  CalendarDays,
  Car,
  ChevronRight,
  Clock,
  ExternalLink,
  Gift,
  MapPin,
  Menu,
  Phone,
  Sailboat,
  ShoppingBag,
  Star,
  TrainFront,
  Utensils,
  Video,
  Waves,
  Wine,
  X,
} from 'lucide-react';
import AdminEditor from './components/AdminEditor';
import { loadMenu, type MenuSection } from './data/menuData';
import './App.css';

const logo = '/odeck/logo-odeck.svg';

const heroSlides = [
  '/odeck/hero-interior.webp',
  '/odeck/room-day.webp',
  '/odeck/hero-table.webp',
];

const carouselRows = [
  [
    { src: '/odeck/carousel/odeck-carousel-01.jpg', label: 'Table au bord des baies vitrées', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-07.jpg', label: 'Salle lumineuse sur le Nantilus', shape: 'wide' },
    { src: '/odeck/carousel/odeck-carousel-10.jpg', label: 'Vue Loire au coucher du soleil', shape: 'wide' },
    { src: '/odeck/carousel/odeck-carousel-17.jpg', label: 'Bar et cave en lumière', shape: 'wide' },
    { src: '/odeck/carousel/odeck-carousel-08.jpg', label: 'Table en terrasse couverte', shape: 'wide' },
    { src: '/odeck/carousel/odeck-carousel-27.jpg', label: 'Bouteille sélectionnée par la cave', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-31.jpg', label: 'Cocktail frais face aux quais', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-40.jpg', label: 'Déjeuner convivial à partager', shape: 'portrait' },
  ],
  [
    { src: '/odeck/carousel/odeck-carousel-03.jpg', label: 'Dessert chocolat caramel', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-06.jpg', label: 'Viande grillée minute', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-11.jpg', label: 'Plat signature à partager', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-12.jpg', label: 'Service à table', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-20.jpg', label: 'Assiettes fraîches et vin blanc', shape: 'wide' },
    { src: '/odeck/carousel/odeck-carousel-24.jpg', label: 'Cuisine de saison', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-29.jpg', label: 'Sauce minute', shape: 'portrait' },
    { src: '/odeck/carousel/odeck-carousel-33.jpg', label: 'Falafels et salade croquante', shape: 'portrait' },
  ],
];

const plateImages = [
  '/odeck/steak-board-close.webp',
  '/odeck/burger.webp',
  '/odeck/share-dish.webp',
  '/odeck/chef-pot.webp',
];

const drinkImages = [
  '/odeck/wine-bottle.webp',
  '/odeck/green-cocktail.webp',
  '/odeck/bar.webp',
  '/odeck/wine-moment.webp',
];

function parseWinePrices(price: string) {
  return price.split('/').map((chunk) => {
    const clean = chunk.trim();
    const match = clean.match(/^(.*?)(\d+(?:,\d+)?)$/);
    if (!match) return { size: clean, price: '' };
    return { size: match[1].trim(), price: `${match[2]}€` };
  });
}

const usefulLinks = [
  {
    title: 'Réserver une table',
    text: 'Réservation instantanée via Guestonline, le lien officiel utilisé par O Deck.',
    href: 'https://ib.guestonline.fr/instabook/bookings/uOUCwQB',
    cta: 'Réserver',
    icon: CalendarDays,
  },
  {
    title: 'Commander en ligne',
    text: 'Accès au module officiel de commande pour profiter de la carte autrement.',
    href: 'https://odeck.commander.menu/order?l=fr#/restaurant/10393/collection/9997',
    cta: 'Commander',
    icon: ShoppingBag,
  },
  {
    title: 'Offrir un moment',
    text: 'Bons cadeaux disponibles pour partager un repas, un brunch ou un verre face à la Loire.',
    href: 'tel:0240717100',
    cta: 'Appeler',
    icon: Gift,
  },
  {
    title: 'Organiser un groupe',
    text: 'Événement privé ou professionnel : déjeuner, cocktail, réunion, séminaire ou dîner sur mesure.',
    href: 'https://www.odeck.fr/offre-groupe',
    cta: 'Offre groupes',
    icon: Anchor,
  },
  {
    title: 'Voir les avis',
    text: 'Les retours clients officiels pour se faire une idée avant de monter à bord.',
    href: 'https://reviews.customer-alliance.com/restaurant/o-deck-nantes-fa8be06a6c00ef35.html?_locale=fr',
    cta: 'Avis clients',
    icon: Star,
  },
  {
    title: 'Visiter le lieu',
    text: 'Une visite virtuelle utile pour découvrir la salle, la terrasse et l’ambiance du bateau.',
    href: 'http://www.restovisio.com/restaurant/o-deck-2716.htm',
    cta: 'Visite 360',
    icon: Video,
  },
];

const accessOptions = [
  {
    icon: Car,
    title: 'Dépose minute',
    text: 'Au bout de la rue René Siegfried, puis quelques pas vers la Loire derrière le Carrousel.',
  },
  {
    icon: Bike,
    title: 'Bicloo',
    text: 'Station Machines de l’Île, à environ trois minutes du pont numéro 2 du Nantilus.',
  },
  {
    icon: TrainFront,
    title: 'Tram ligne 1',
    text: 'Arrêt Chantiers Navals, puis balade courte jusqu’au quai Fernand Crouan.',
  },
];

function Nav({ onAdminTrigger }: { onAdminTrigger: () => void }) {
  const [open, setOpen] = useState(false);
  const clicks = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  const logoClick = () => {
    window.clearTimeout(timer.current);
    clicks.current += 1;
    if (clicks.current >= 5) {
      clicks.current = 0;
      setOpen(false);
      onAdminTrigger();
      return;
    }
    timer.current = window.setTimeout(() => {
      clicks.current = 0;
    }, 4500);
  };

  const links = [
    ['Le lieu', '#lieu'],
    ['Repas', '#carte'],
    ['Boissons', '#boissons'],
    ['Galerie', '#galerie'],
    ['Infos', '#infos'],
  ];

  return (
    <header className="nav">
      <button className="brand" onClick={logoClick} aria-label="O Deck">
        <img src={logo} alt="O Deck" decoding="async" />
      </button>
      <nav>
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="https://ib.guestonline.fr/instabook/bookings/uOUCwQB" target="_blank" rel="noreferrer">Réserver</a>
      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Ouvrir le menu"><Menu /></button>
      {open && (
        <div className="mobile-menu">
          <button onClick={() => setOpen(false)} aria-label="Fermer le menu"><X /></button>
          <img src={logo} alt="O Deck" onClick={logoClick} decoding="async" />
          {links.map(([label, href]) => <a href={href} onClick={() => setOpen(false)} key={href}>{label}</a>)}
          <a className="nav-cta" href="https://ib.guestonline.fr/instabook/bookings/uOUCwQB" target="_blank" rel="noreferrer">Réserver</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero-film" aria-hidden="true">
        {heroSlides.map((src) => <span key={src} style={{ backgroundImage: `url(${src})` }} />)}
      </div>
      <div className="hero-shade" />
      <img className="hero-line" src="/odeck/rive-illustration.svg" alt="" aria-hidden="true" decoding="async" />
      <div className="hero-content">
        <p className="eyebrow"><Sailboat size={15} /> Restaurant flottant à Nantes</p>
        <h1 className="sr-only">O Deck, restaurant flottant à Nantes</h1>
        <img className="hero-logo" src={logo} alt="O Deck" fetchPriority="high" decoding="async" />
        <p className="hero-copy">
          Cuisine de saison, grandes baies vitrées, terrasse sur le pont et vue directe sur les quais de Nantes.
        </p>
        <div className="hero-actions">
          <a href="#carte">Découvrir la carte <ChevronRight size={18} /></a>
          <a href="https://ib.guestonline.fr/instabook/bookings/uOUCwQB" target="_blank" rel="noreferrer">Réserver</a>
        </div>
      </div>
      <div className="hero-glass">
        <span>O Deck</span>
        <p>Pont 2 du Nantilus, 30 Quai Fernand Crouan, Nantes.</p>
      </div>
    </section>
  );
}

function PlaceSection() {
  return (
    <section className="place-section" id="lieu">
      <div className="place-copy">
        <p className="eyebrow"><Anchor size={15} /> Le lieu</p>
        <h2>Bienvenue à bord du Nantilus.</h2>
        <p>
          Installé pont numéro 2, O Deck occupe une barge de 75 mètres construite à Saint-Nazaire puis remorquée jusqu’au Parc des Chantiers. Depuis la salle vitrée et la terrasse, le restaurant ouvre une vue directe sur la Loire, la ville et le Carrousel des Mondes Marins.
        </p>
        <div className="place-highlights">
          <article>
            <Waves size={20} />
            <h3>Vue panoramique</h3>
            <p>Une salle lumineuse et une terrasse pour déjeuner, dîner ou simplement prendre un verre sur l’eau.</p>
          </article>
          <article>
            <Wine size={20} />
            <h3>Cave à vins</h3>
            <p>Plus de 200 références, avec une belle place donnée aux vins de Loire et aux moments d’apéritif.</p>
          </article>
          <article>
            <CalendarDays size={20} />
            <h3>Dimanche brunch</h3>
            <p>Brunch buffet le dimanche midi, carte de saison le reste de la semaine, midi et soir.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className="access-section">
      <div>
        <p className="eyebrow"><MapPin size={15} /> Nous trouver</p>
        <h2>Au pied du Carrousel, face aux quais.</h2>
        <p>
          O Deck se trouve au Pont 2 du Nantilus, 30 quai Fernand Crouan, au cœur du Parc des Chantiers. Parking Machines, Bicloo, tram ligne 1 ou promenade le long de la Loire : l’arrivée fait déjà partie de l’expérience.
        </p>
      </div>
      <div className="access-grid">
        {accessOptions.map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <Icon size={20} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MenuCardSection({
  id,
  group,
  eyebrow,
  title,
  text,
  images,
}: {
  id: string;
  group: 'food' | 'drink';
  eyebrow: string;
  title: string;
  text: string;
  images: string[];
}) {
  const [menu, setMenu] = useState<MenuSection[]>(() => loadMenu());
  const [active, setActive] = useState(() => menu.find((section) => (section.group ?? 'food') === group)?.id ?? '');

  useEffect(() => {
    const update = (event: Event) => {
      const next = (event as CustomEvent<MenuSection[]>).detail ?? loadMenu();
      setMenu(next);
      const visible = next.filter((section) => (section.group ?? 'food') === group);
      if (!visible.some((section) => section.id === active)) setActive(visible[0]?.id ?? next[0]?.id ?? 'entrees');
    };
    window.addEventListener('menu-updated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('menu-updated', update);
      window.removeEventListener('storage', update);
    };
  }, [active, group]);

  const visibleMenu = menu.filter((section) => (section.group ?? 'food') === group);
  const current = visibleMenu.find((section) => section.id === active) ?? visibleMenu[0] ?? menu[0];
  const isWineSection = current?.id.startsWith('vins-');
  if (!current) return null;

  return (
    <section className={`menu-section ${group === 'drink' ? 'drink-section' : ''}`} id={id}>
      <div className="section-heading">
        <p className="eyebrow"><Utensils size={15} /> {eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="menu-layout">
        <div className="plate-strip">
          {images.map((src) => <img key={src} src={src} alt="" loading="lazy" decoding="async" />)}
        </div>
        <div>
          <div className="tabs">
            {visibleMenu.map((section) => (
              <button key={section.id} className={active === section.id ? 'active' : ''} onClick={() => setActive(section.id)}>
                {section.label}
              </button>
            ))}
          </div>
          <div className="menu-card">
            <div className="menu-card-head">
              <span>{current.eyebrow}</span>
              <h3>{current.label}</h3>
            </div>
            <div>
              {current.items.map((item, index) => (
                <article className={`dish-row ${isWineSection ? 'wine-row' : ''}`} key={`${item.name}-${index}`}>
                  <div>
                    <h4>{item.name}</h4>
                    {item.desc && <p>{item.desc}</p>}
                  </div>
                  {isWineSection ? (
                    <div className="wine-price-grid" aria-label={`Prix ${item.name}`}>
                      <div className="wine-price-sizes">
                        {parseWinePrices(item.price).map(({ size }, priceIndex) => <span key={`${item.name}-size-${priceIndex}`}>{size}</span>)}
                      </div>
                      <div className="wine-price-values">
                        {parseWinePrices(item.price).map(({ price }, priceIndex) => <strong key={`${item.name}-price-${priceIndex}`}>{price}</strong>)}
                      </div>
                    </div>
                  ) : (
                    <strong>{item.price}</strong>
                  )}
                </article>
              ))}
            </div>
            {current.note && <p className="menu-note">{current.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSectionBlock() {
  return (
    <>
      <MenuCardSection
        id="carte"
        group="food"
        eyebrow="Carte des repas"
        title="Les assiettes à bord."
        text="Brunch du dimanche, menus, planches, plats de saison et desserts maison : une carte généreuse pensée pour les tables au bord de l’eau."
        images={plateImages}
      />
      <MenuCardSection
        id="boissons"
        group="drink"
        eyebrow="Carte des boissons"
        title="La cave et le bar."
        text="Vins blancs, rosés et rouges, cocktails, bulles, softs, bières et spiritueux pour accompagner le déjeuner, l’apéritif ou un coucher de soleil sur la Loire."
        images={drinkImages}
      />
    </>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section" id="experiences">
      <div className="experience-panel">
        <div className="experience-media">
          <img src="/odeck/hero-table.webp" alt="Table dressée chez O Deck" loading="lazy" decoding="async" />
          <div>
            <span>O Deck pratique</span>
            <p>Réservation, commande, groupes et visite virtuelle.</p>
          </div>
        </div>
        <div className="experience-content">
          <p className="eyebrow"><ExternalLink size={15} /> Accès rapides</p>
          <h2>Préparer son moment à bord.</h2>
          <p>
            Les accès utiles sont réunis ici, avec les liens officiels d’O Deck pour organiser une table, une commande ou un événement.
          </p>
          <div className="experience-list">
            {usefulLinks.map(({ title, text, href, cta, icon: Icon }) => (
              <a className="experience-link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} key={title}>
                <span className="experience-icon"><Icon size={19} /></span>
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <em>{cta}</em>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="gallery-section" id="galerie">
      <div className="gallery-intro carousel-intro">
        <p className="eyebrow"><Waves size={15} /> Le restaurant en images</p>
        <h2>La salle, la terrasse, les assiettes.</h2>
        <p>
          Un aperçu du bateau, des tables avec vue, du bar et de la cuisine servie à bord.
        </p>
      </div>
      <div className="double-carousel" aria-label="Galerie O Deck">
        {carouselRows.map((row, rowIndex) => (
          <div className={`carousel-lane ${rowIndex === 1 ? 'reverse' : ''}`} key={rowIndex}>
            <div className="carousel-track">
              {[...row, ...row].map((image, index) => (
                <figure className={`carousel-card ${image.shape}`} key={`${image.src}-${index}`}>
                  <img src={image.src} alt={image.label} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
        ))}
        <div className="carousel-panel">
          <span>O Deck à bord</span>
          <p>Ambiance de salle, terrasse sur la Loire, cocktails et plats à partager.</p>
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  return (
    <section className="infos" id="infos">
      <div className="infos-panel">
        <div className="infos-heading">
          <p className="eyebrow"><MapPin size={15} /> Infos pratiques</p>
          <h2>Monter à bord.</h2>
          <p>O Deck vous accueille au Pont 2 du Nantilus, face aux quais de Nantes.</p>
        </div>
        <div className="infos-grid">
          <div className="info-card">
            <MapPin />
            <h3>Adresse</h3>
            <p>Pont 2 du Nantilus<br />30 Quai Fernand Crouan, Nantes</p>
          </div>
          <div className="info-card">
            <Clock />
            <h3>Service</h3>
            <p>Midi, soir, terrasses et tables avec vue selon météo.</p>
          </div>
          <div className="info-card">
            <Phone />
            <h3>Réservation</h3>
            <p><a href="tel:0240717100">02 40 71 71 00</a><br />Réserver une table à bord</p>
          </div>
          <div className="info-card">
            <CalendarDays />
            <h3>Groupes</h3>
            <p>Repas d’entreprise, afterworks et événements privés.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [admin, setAdmin] = useState(false);
  if (admin) return <AdminEditor onExit={() => setAdmin(false)} />;

  return (
    <>
      <Nav onAdminTrigger={() => setAdmin(true)} />
      <Hero />
      <PlaceSection />
      <MenuSectionBlock />
      <ExperienceSection />
      <GallerySection />
      <AccessSection />
      <InfoSection />
      <footer>
        <div className="footer-brand">
          <img src={logo} alt="O Deck" loading="lazy" decoding="async" />
          <p>Restaurant flottant sur le Nantilus, au cœur du Parc des Chantiers à Nantes.</p>
        </div>
        <div className="footer-links" aria-label="Liens utiles">
          <a href="https://ib.guestonline.fr/instabook/bookings/uOUCwQB" target="_blank" rel="noreferrer">Réserver</a>
          <a href="https://odeck.commander.menu/order?l=fr#/restaurant/10393/collection/9997" target="_blank" rel="noreferrer">Commander</a>
          <a href="https://www.odeck.fr/offre-groupe" target="_blank" rel="noreferrer">Groupes</a>
          <a href="tel:0240717100">02 40 71 71 00</a>
        </div>
      </footer>
    </>
  );
}

export default App;
