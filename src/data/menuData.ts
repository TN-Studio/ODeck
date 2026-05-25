export interface MenuItem {
  name: string;
  desc?: string;
  price: string;
}

export interface MenuSection {
  id: string;
  label: string;
  group?: 'food' | 'drink';
  eyebrow?: string;
  items: MenuItem[];
  note?: string;
}

export const DEFAULT_MENU: MenuSection[] = [
  {
    id: 'formules',
    label: 'Formules',
    group: 'food',
    eyebrow: 'Midi, soir et dimanche',
    items: [
      { name: 'Menu entrée + plat ou plat + dessert', desc: 'Tzatziki ou terrine, puis curry de poissons, brochette de volaille ou paccheri au pesto.', price: '24' },
      { name: 'Menu entrée + plat + dessert', desc: 'Formule complète avec dessert du moment.', price: '29,5' },
      { name: 'Plat du jour', desc: 'Du lundi au vendredi midi, hors jours fériés.', price: '14,5' },
      { name: 'Buffet brunch adulte', desc: 'Tous les dimanches midi jusqu’à 16h. Buffet à volonté, boisson chaude et jus d’orange.', price: '29' },
      { name: 'Buffet brunch avec Spritz', desc: 'Brunch adulte accompagné d’un cocktail Spritz.', price: '34' },
      { name: 'Menu enfant', desc: 'Volaille panée, frites ou mac and cheese bacon grillé, glace et boisson.', price: '12' },
      { name: 'Brunch enfant', desc: 'De 4 à 12 ans, accès au buffet avec chocolat chaud ou jus d’orange.', price: '15' },
    ],
  },
  {
    id: 'entrees-planches',
    label: 'Entrées & planches',
    group: 'food',
    eyebrow: 'À partager ou pour commencer',
    items: [
      { name: 'Tzatziki maison et pain à dipper', price: '8' },
      { name: 'Garlic bread', desc: 'Pain au levain et sarrasin du MOF Frédéric Lalos, beurre à l’ail.', price: '7' },
      { name: 'Burrata crémeuse', desc: 'Tomates anciennes, fraises, confiture de tomate et pignons grillés.', price: '15' },
      { name: 'Falafels', desc: 'Sauce au yaourt et herbes fraîches.', price: '11' },
      { name: 'Rillettes de poisson', desc: 'Rillettes crémeuses à l’aneth.', price: '9' },
      { name: 'Petit camembert rôti', desc: 'Miel, thym et mesclun. Chiffonnade de jambon en option.', price: '12,5' },
      { name: 'Terrine de campagne et pickles', price: '8' },
      { name: 'Planche de charcuteries', desc: 'Jambon blanc truffé, saucisse perchée, jambon di parma, terrine maison et condiments.', price: '16' },
      { name: 'Planche de fromages AOP', desc: 'Rocamadour, tomme de brebis, morbier et comté 24 mois.', price: '17' },
      { name: 'Planche mixte', desc: 'Charcuteries et fromages AOP.', price: '19' },
    ],
  },
  {
    id: 'plats',
    label: 'Plats',
    group: 'food',
    eyebrow: 'Cuisine de saison',
    items: [
      { name: 'Paccheri au pesto maison', desc: 'Noix de cajou grillées, parmesan, option jambon blanc truffé ou di parma.', price: '17' },
      { name: 'Curry de poissons au lait de coco', desc: 'Servi avec riz thaï.', price: '18,5' },
      { name: 'Chirashi mixte', desc: 'Mayo spicy, sésame, tartare de saumon et poisson blanc, avocat, concombre et riz vinaigré.', price: '20' },
      { name: 'Pêche du moment', desc: 'Vierge citronnée et frites de polenta.', price: '24' },
      { name: 'Gourmet Burger Nantais', desc: 'Charolais origine France, Curé nantais, salade, tomate, sauce tartare, salicorne et frites maison.', price: '21' },
      { name: 'Burger feuilleté', desc: 'Poulet crispy ou steak veggie, crème d’avocat, salade, tomate, sauce tartare et frites maison.', price: '19' },
      { name: 'Brochette de volaille', desc: 'Citron paprika, smashed potatoes et sauce boursin.', price: '20' },
      { name: 'Cuisse de canard confite', desc: 'Pommes sarladaises et sauce poivre.', price: '23' },
      { name: 'Tigre qui pleure', desc: 'Émincé de poire de bœuf marinée à la thaï, salade de chou blanc et riz.', price: '24' },
      { name: 'Noix de faux-filet Angus 250g', desc: 'Une sauce et un accompagnement au choix.', price: '29,5' },
    ],
  },
  {
    id: 'salades-partage',
    label: 'Salades & partage',
    group: 'food',
    eyebrow: 'Grandes assiettes',
    items: [
      { name: 'Salade chèvre et lard fumé', desc: 'Mesclun, toasts chèvre et lard fumé, tomates et oignons crispy.', price: '19,5' },
      { name: 'Salade de poulpe', desc: 'Mesclun, poulpe mariné, pommes sautées, poivrons marinés et oignons rouges.', price: '22' },
      { name: 'BIG mac and cheese', desc: 'Bacon grillé et oignons frits. Possible pour une personne.', price: '30' },
      { name: 'Stone bowl péruvien', desc: 'Riz sauté au wok, poulet mariné, crevettes, légumes et coriandre.', price: '32' },
    ],
    note: 'Les plats familiaux sont pensés pour 2 à 3 personnes.',
  },
  {
    id: 'desserts',
    label: 'Desserts',
    group: 'food',
    eyebrow: 'Finir face à la Loire',
    items: [
      { name: 'Mousse menthe pastille et chocolat', desc: 'Façon After Eight.', price: '9' },
      { name: 'Soupe de fraises', desc: 'Menthe fraîche et glace vanille.', price: '8,5' },
      { name: 'Café gourmand / Prosecco gourmand', price: '10 / 14' },
      { name: 'Moelleux au chocolat', desc: 'Crème anglaise.', price: '12' },
      { name: 'Cheesecake citron vert', desc: 'Speculoos.', price: '9,5' },
      { name: 'Le Nantilus Vincent Guerlais', desc: 'Création chocolatée exclusive par l’artisan chocolatier nantais.', price: '14' },
      { name: 'Coupe 3 boules', desc: 'Sorbets citron, mangue, passion, pêche. Glaces vanille, chocolat, café.', price: '9' },
    ],
  },
  {
    id: 'vins-blancs',
    label: 'Vins blancs',
    group: 'drink',
    eyebrow: 'Vifs, tendres ou plus ronds',
    items: [
      { name: 'Vin de France, Chapeau Melon', desc: 'Jérémie Huchet, blanc.', price: '15 cl 4 / 25 cl 6,5 / 75 cl 18' },
      { name: 'AOC Muscadet, Terroirs', desc: 'Lucas-Salmon, blanc, en conversion bio.', price: '15 cl 6 / 25 cl 10 / 75 cl 22' },
      { name: 'AOP Quincy', desc: 'Gérard Bigonneau, blanc.', price: '15 cl 8 / 25 cl 13 / 75 cl 29' },
      { name: 'IGP Ardèche, Chardonnay', desc: 'Louis Latour, blanc.', price: '15 cl 7,5 / 25 cl 12 / 75 cl 26' },
      { name: 'AOC Chablis', desc: 'Louis Latour, blanc.', price: '75 cl 45' },
    ],
    note: 'La cave propose d’autres références à prix caviste avec droit de bouchon de 10 euros pour consommer sur place.',
  },
  {
    id: 'vins-roses',
    label: 'Vins rosés',
    group: 'drink',
    eyebrow: 'Frais et faciles',
    items: [
      { name: 'IGP du Var, L’après plage', desc: 'Domaine Tour Saint Honoré, rosé.', price: '15 cl 6 / 25 cl 10 / 75 cl 22' },
      { name: 'Vin de France, Chapeau Melon', desc: 'Jérémie Huchet, rosé.', price: '15 cl 4 / 25 cl 6,5 / 75 cl 18' },
    ],
    note: 'La cave propose d’autres références à prix caviste avec droit de bouchon de 10 euros pour consommer sur place.',
  },
  {
    id: 'vins-rouges',
    label: 'Vins rouges',
    group: 'drink',
    eyebrow: 'Légers, fruités ou plus structurés',
    items: [
      { name: 'AOC Chinon, Cuvée du Domaine', desc: 'Charles Pain, rouge.', price: '15 cl 7 / 25 cl 11 / 75 cl 24' },
      { name: 'AOC Côtes du Roussillon, Cuvée Tradition', desc: 'Piquemal, rouge.', price: '15 cl 7 / 25 cl 11 / 75 cl 24' },
      { name: 'IGP Bouches-du-Rhône, Merlot', desc: 'Rouge.', price: '15 cl 4 / 25 cl 6,5' },
      { name: 'AOC Bordeaux, Château Tour le Pin', desc: 'Rouge.', price: '15 cl 7 / 25 cl 11 / 75 cl 24' },
      { name: 'AOP Pic Saint-Loup, Le Mas de Jon', desc: 'Famille Gravegal, rouge.', price: '15 cl 8 / 25 cl 13 / 75 cl 30' },
      { name: 'AOC Graves, Château Haut-Selve', desc: 'Rouge, HVE. Riche & soyeux.', price: '75 cl 56' },
    ],
    note: 'La cave propose d’autres références à prix caviste avec droit de bouchon de 10 euros pour consommer sur place.',
  },
  {
    id: 'vins-bulles',
    label: 'Moelleux & bulles',
    group: 'drink',
    eyebrow: 'Festifs et plaisir',
    items: [
      { name: 'AOC Coteaux de l’Aubance', desc: 'Famille Lebreton, blanc moelleux bio.', price: '15 cl 7 / 25 cl 11 / 75 cl 24' },
      { name: 'Champagne Henri Abelé', desc: 'Brut blanc, coupe 12 cl ou bouteille. Doux & éclatant.', price: 'Coupe 13 / 75 cl 73' },
    ],
    note: 'La cave propose d’autres références à prix caviste avec droit de bouchon de 10 euros pour consommer sur place.',
  },
  {
    id: 'softs-cafe',
    label: 'Softs & café',
    group: 'drink',
    eyebrow: 'Boissons fraîches et chaudes',
    items: [
      { name: 'Orangina, Schweppes Agrum, Ice Tea maison pêche', price: '4' },
      { name: 'Coca-Cola, Coca-Cola Zero, Perrier', price: '4' },
      { name: 'La French', desc: 'Ginger beer bio, tonic nature ou soda pamplemousse.', price: '4,2' },
      { name: 'Jus de fruits', desc: 'Orange, pomme, ananas, pamplemousse ou tomate.', price: '4,2' },
      { name: 'Limonade artisanale française', price: '4' },
      { name: 'Vittel ou Eau de Perrier', desc: '50 cl / 1 l.', price: '4 / 6' },
      { name: 'Café bio Massaya, noisette, déca', price: '2,5' },
      { name: 'Thé ou infusion Dammann Frères', price: '4' },
      { name: 'Double expresso, chocolat, cappuccino', price: '4,5' },
      { name: 'Café bio Massaya frappé', price: '6' },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    group: 'drink',
    eyebrow: 'Avec ou sans alcool',
    items: [
      { name: 'St-Germain Spritz', desc: 'Liqueur St-Germain, prosecco, eau gazeuse.', price: '11,5' },
      { name: 'Classic Aperol Spritz', desc: 'Aperol, prosecco, eau gazeuse.', price: '9' },
      { name: 'Mojito Prosecco', desc: 'Bacardi Carta Oro, menthe, citron vert, cassonade, prosecco.', price: '11' },
      { name: 'La Vie en Rose', desc: 'Gin Bombay Sapphire, pamplemousse, citron, sirop de romarin maison.', price: '11' },
      { name: 'Saint Gin Tonic', desc: 'Gin Bombay Sapphire, St-Germain, tonic La French.', price: '12' },
      { name: 'Margarita', desc: 'Tequila, Cointreau, citron vert.', price: '11' },
      { name: 'Mojito classique ou fruit', desc: 'Nature, mangue, framboise ou passion.', price: '9 / 10,5' },
      { name: 'Virgin tiki', desc: 'Orange, ananas, pêche, sirop fraise.', price: '7,5' },
      { name: 'Rose Berry', desc: 'Martini Vibrante sans alcool, passion, pulco, tonic pamplemousse.', price: '8,9' },
      { name: 'Intox Detox', desc: 'Concombre, menthe, gingembre, pulco, limonade.', price: '8' },
    ],
  },
  {
    id: 'aperitifs-bieres',
    label: 'Apéritifs & bières',
    group: 'drink',
    eyebrow: 'Avant le repas',
    items: [
      { name: 'Martini, Campari ou Suze', desc: '6 cl.', price: '6' },
      { name: 'Pastis 51 ou Ricard', desc: '3 cl.', price: '4' },
      { name: 'Kir au Sauvignon', desc: '12 cl.', price: '4' },
      { name: 'Heineken pression', desc: '25 cl / 50 cl.', price: '3,9 / 6,9' },
      { name: 'Affligem pression', desc: '25 cl / 50 cl.', price: '4,5 / 7,9' },
      { name: 'Bière pression du moment', desc: '25 cl / 50 cl.', price: '4,5 / 7,9' },
      { name: 'Bière artisanale locale Plormel', desc: 'Bouteille 33 cl, brassée à Vieillevigne.', price: '6,9' },
    ],
  },
  {
    id: 'spiritueux',
    label: 'Spiritueux',
    group: 'drink',
    eyebrow: 'Sélection bar',
    items: [
      { name: 'Whisky', desc: 'Ballantines, Jack Daniels, Aberlour, Nikka, Talisker, Lagavulin, Oban.', price: '7 à 16,5' },
      { name: 'Gin', desc: 'Bombay Sapphire ou Hendricks.', price: '8 / 10' },
      { name: 'Rhum', desc: 'Saint James, Bacardi, Diplomatico, La Hechicera, Mezan, Don Papa, Doorlys XO.', price: '6 à 11' },
      { name: 'Nouveau monde', desc: 'Tequila Jose Cuervo, Cachaça, Patron XO Café, Patron Silver.', price: '6 à 15' },
      { name: 'Vodka', desc: 'Zubrowka ou Grey Goose.', price: '7 / 12' },
      { name: 'Cognac, Armagnac et eaux de vie', desc: 'Hennessy, Laubade, Poire Williams, Mirabelle, Calvados.', price: '7 à 29' },
      { name: 'Liqueurs', desc: 'Menthe Pastille, Get, Manzana, Limoncello, Baileys, Cointreau, Amaretto, Absinthe, St-Germain.', price: '5 à 14' },
    ],
    note: 'Accompagnement softs et jus : +2 euros, servis en carafe de 25 cl.',
  },
];

const STORAGE_KEY = 'odeck-menu-v6';

function normalizeMenu(menu: MenuSection[]): MenuSection[] {
  const normalized = menu.map((section) => ({
    ...section,
    group: section.group ?? (['bar', 'vins', 'cocktails', 'boissons', 'spiritueux'].includes(section.id) ? 'drink' : 'food'),
  }));

  if (!normalized.some((section) => section.group === 'drink')) {
    return [...normalized, ...DEFAULT_MENU.filter((section) => section.group === 'drink')];
  }

  return normalized;
}

export function loadMenu(): MenuSection[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_MENU;
    const parsed = JSON.parse(stored) as MenuSection[];
    return Array.isArray(parsed) && parsed.length ? normalizeMenu(parsed) : DEFAULT_MENU;
  } catch {
    return DEFAULT_MENU;
  }
}

export function saveMenu(menu: MenuSection[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
  window.dispatchEvent(new CustomEvent('menu-updated', { detail: menu }));
}
