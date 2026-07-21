"use client";

import { CalendarDays, Camera, ChevronDown, Coffee, Flower2, Heart, Music2, Sparkles, Trees, Utensils, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { bucketListCategories } from "@/data/loveStory";

type Filter = "all" | "completed" | "open";
const STORAGE_KEY = "nadia-jakob-bucket-list-completed";
const EXPANDED_KEY = "nadia-jakob-bucket-list-expanded";
const icons = { heart: Heart, sparkles: Sparkles, utensils: Utensils, trees: Trees, music: Music2, flower: Flower2, calendar: CalendarDays, camera: Camera, coffee: Coffee };

export default function BucketList() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([bucketListCategories[0].id, bucketListCategories[1].id]);
  const [filter, setFilter] = useState<Filter>("all");
  const [hydrated, setHydrated] = useState(false);
  const allItems = useMemo(() => bucketListCategories.flatMap((category) => category.items), []);

  useEffect(() => {
    const loadSavedState = window.setTimeout(() => {
      try {
        const storedCompleted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
        const storedExpanded = JSON.parse(localStorage.getItem(EXPANDED_KEY) ?? "null");
        if (Array.isArray(storedCompleted)) setCompleted(storedCompleted);
        if (Array.isArray(storedExpanded)) setExpanded(storedExpanded);
      } catch { /* Ein ungültiger lokaler Wert wird einfach ignoriert. */ }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(loadSavedState);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); }, [completed, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(EXPANDED_KEY, JSON.stringify(expanded)); }, [expanded, hydrated]);

  const completedSet = new Set(completed);
  const done = allItems.filter((item) => completedSet.has(item.id)).length;
  const toggleItem = (id: string) => setCompleted((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  const toggleCategory = (id: string) => setExpanded((current) => current.includes(id) ? current.filter((categoryId) => categoryId !== id) : [...current, id]);
  const reset = () => { if (window.confirm("Möchtest du wirklich alle gespeicherten Haken zurücksetzen?")) setCompleted([]); };

  return <section id="bucket-list" className="section bucket-list" aria-labelledby="bucket-list-title">
    <p className="kicker">Unsere gemeinsame Bucket List</p>
    <h2 id="bucket-list-title">Was wir schon erlebt haben – und was noch auf uns wartet.</h2>
    <p className="bucket-subtitle">Unsere Erinnerungen, Ideen und gemeinsamen Pläne an einem Ort.</p>
    <div className="bucket-overview" aria-label="Fortschritt der gemeinsamen Bucket List">
      <div><strong>{allItems.length}</strong><span>Erlebnisse</span></div><div><strong>{done}</strong><span>Schon erlebt</span></div><div><strong>{allItems.length - done}</strong><span>Noch offen</span></div><div><strong>{Math.round(done / allItems.length * 100)}%</strong><span>Gemeinsam</span></div>
      <p><b>{done} von {allItems.length}</b> gemeinsamen Erlebnissen</p>
    </div>
    <div className="bucket-actions"><div className="bucket-filters" role="group" aria-label="Bucket List filtern">{([['all', 'Alle'], ['completed', 'Schon erlebt'], ['open', 'Noch offen']] as const).map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div><button className="reset-button" onClick={reset} disabled={!completed.length}>Haken zurücksetzen</button></div>
    <div className="bucket-categories">{bucketListCategories.map((category) => {
      const Icon = icons[category.icon as keyof typeof icons];
      const categoryDone = category.items.filter((item) => completedSet.has(item.id)).length;
      const visibleItems = category.items.filter((item) => filter === "all" || filter === "completed" ? completedSet.has(item.id) : !completedSet.has(item.id));
      const isExpanded = expanded.includes(category.id);
      return <article className="bucket-category" key={category.id}>
        <button className="category-heading" onClick={() => toggleCategory(category.id)} aria-expanded={isExpanded} aria-controls={`${category.id}-items`}>
          <span className="category-icon"><Icon size={18} /></span><span className="category-copy"><strong>{category.title}</strong><small>{categoryDone} von {category.items.length} erlebt</small><i><i style={{ width: `${categoryDone / category.items.length * 100}%` }} /></i></span><ChevronDown className={isExpanded ? "chevron open" : "chevron"} aria-hidden="true" />
        </button>
        {isExpanded && <div className="bucket-items" id={`${category.id}-items`}>{visibleItems.length ? visibleItems.map((item) => { const checked = completedSet.has(item.id); return <label className={checked ? "bucket-item completed" : "bucket-item"} key={item.id}><input type="checkbox" checked={checked} onChange={() => toggleItem(item.id)} /><span className="custom-check" aria-hidden="true"><Check size={14} /></span><span>{item.text}</span></label>; }) : <p className="empty-filter">In dieser Kategorie gibt es für diesen Filter noch keine Einträge.</p>}</div>}
      </article>;
    })}</div>
  </section>;
}
