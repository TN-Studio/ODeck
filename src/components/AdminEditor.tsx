import { useState, type FormEvent } from 'react';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { loadMenu, saveMenu, type MenuItem, type MenuSection } from '../data/menuData';

const normalize = (value: string) =>
  value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');

export default function AdminEditor({ onExit }: { onExit: () => void }) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [menu, setMenu] = useState<MenuSection[]>(() => loadMenu());
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('');

  const current = menu[active] ?? menu[0];

  const unlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!['odeck', 'hodec', 'o2deck'].includes(normalize(code))) {
      setError('Code incorrect');
      return;
    }
    setUnlocked(true);
    setError('');
  };

  const updateSection = (patch: Partial<MenuSection>) => {
    setMenu((items) => items.map((section, index) => (index === active ? { ...section, ...patch } : section)));
    setStatus('');
  };

  const updateItem = (itemIndex: number, patch: Partial<MenuItem>) => {
    setMenu((items) =>
      items.map((section, index) =>
        index === active
          ? {
              ...section,
              items: section.items.map((item, nextIndex) => (nextIndex === itemIndex ? { ...item, ...patch } : item)),
            }
          : section,
      ),
    );
    setStatus('');
  };

  const addSection = () => {
    setMenu((items) => [
      ...items,
      { id: `section-${Date.now()}`, label: 'Nouvelle section', group: 'food', eyebrow: '', items: [{ name: 'Nouveau plat', desc: '', price: '' }] },
    ]);
    setActive(menu.length);
  };

  const removeSection = () => {
    if (menu.length <= 1) return;
    setMenu((items) => items.filter((_, index) => index !== active));
    setActive((index) => Math.max(0, index - 1));
  };

  const addItem = () => updateSection({ items: [...current.items, { name: 'Nouveau plat', desc: '', price: '' }] });
  const removeItem = (itemIndex: number) => updateSection({ items: current.items.filter((_, index) => index !== itemIndex) });

  const save = () => {
    saveMenu(menu);
    setStatus('Carte enregistrée');
  };

  if (!unlocked) {
    return (
      <main className="admin-login">
        <button className="ghost-link" onClick={onExit}><ArrowLeft size={18} /> Retour au site</button>
        <section className="login-card">
          <img src="/odeck/logo-odeck.svg" alt="O Deck" />
          <p>Mode éditeur</p>
          <h1>Carte du restaurant</h1>
          <form onSubmit={unlock}>
            <input value={code} onChange={(event) => setCode(event.target.value)} type="password" autoFocus placeholder="Code admin" />
            {error && <span>{error}</span>}
            <button>Entrer</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <span>O Deck</span>
          <h1>Modifier la carte</h1>
        </div>
        <div className="admin-actions">
          <button onClick={onExit}><ArrowLeft size={16} /> Site</button>
          <button className="save" onClick={save}><Save size={16} /> Enregistrer</button>
        </div>
      </header>
      {status && <p className="admin-status">{status}</p>}
      <div className="admin-layout">
        <aside>
          <div className="admin-aside-title">
            <h2>Sections</h2>
            <button onClick={addSection} aria-label="Ajouter une section"><Plus size={16} /></button>
          </div>
          {menu.map((section, index) => (
            <button key={section.id} className={index === active ? 'active' : ''} onClick={() => setActive(index)}>
              {section.label}
            </button>
          ))}
        </aside>
        {current && (
          <section className="editor-panel">
            <div className="editor-grid">
              <label>Nom de section<input value={current.label} onChange={(event) => updateSection({ label: event.target.value })} /></label>
              <label>Sous-titre<input value={current.eyebrow ?? ''} onChange={(event) => updateSection({ eyebrow: event.target.value })} /></label>
              <label>Carte
                <select value={current.group ?? 'food'} onChange={(event) => updateSection({ group: event.target.value as MenuSection['group'] })}>
                  <option value="food">Repas</option>
                  <option value="drink">Boissons</option>
                </select>
              </label>
              <button className="danger" onClick={removeSection} disabled={menu.length <= 1}><Trash2 size={16} /> Supprimer</button>
            </div>
            <div className="dish-editor-list">
              {current.items.map((item, index) => (
                <div className="dish-editor" key={`${current.id}-${index}`}>
                  <input value={item.name} onChange={(event) => updateItem(index, { name: event.target.value })} placeholder="Nom" />
                  <textarea value={item.desc ?? ''} onChange={(event) => updateItem(index, { desc: event.target.value })} placeholder="Description" />
                  <input value={item.price} onChange={(event) => updateItem(index, { price: event.target.value })} placeholder="Prix" />
                  <button onClick={() => removeItem(index)} aria-label="Supprimer"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <button className="add-line" onClick={addItem}><Plus size={16} /> Ajouter une ligne</button>
            <label className="note-field">Note<textarea value={current.note ?? ''} onChange={(event) => updateSection({ note: event.target.value })} /></label>
          </section>
        )}
      </div>
    </main>
  );
}
