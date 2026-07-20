# Für Nadia – von Jakob

Eine persönliche, private Liebeswebsite als filmische Scroll-Reise für Nadia. Das Projekt enthält weder Tracking noch externe Bilder, Medien oder Datenerfassung; eigene Fotos und Musik werden bewusst nicht mitgeliefert.

## Technologien

- Next.js (App Router), React und TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- `next/image` und `next/font`

## Installation

```bash
npm install
npm run dev
```

Danach `http://localhost:3000` öffnen.

## Produktionsbuild

```bash
npm run build
npm start
```

## Persönliche Inhalte ändern

Alle Texte, Namen, das Beziehungsdatum, Timeline-Einträge, Liebesgründe, Galerie-Metadaten, Zukunftswünsche, Nachrichten und der Musikpfad liegen zentral in [`src/data/loveStory.ts`](src/data/loveStory.ts). Die Beispielinhalte dort sind mit `placeholder: true` gekennzeichnet und können direkt ersetzt werden.

### Beziehungsdatum ändern

Ändere `relationshipStart` in `src/data/loveStory.ts` (ISO-Datum mit Zeitzone). Der Live-Zähler berechnet Kalenderjahre und -monate, nicht pauschale 30-Tage-Monate.

### Timeline erweitern

```ts
{ date: "14.02.2026", title: "Unser Moment", description: "Eure persönliche Erinnerung." }
```

Füge den Eintrag im `timeline`-Array hinzu.

### Galerie erweitern

```ts
{ src: "/images/memory-7.jpg", alt: "Beschreibung", caption: "Eure Erinnerung", date: "14.02.2026", location: "Ort" }
```

Füge Bild und Objekt in `memories` ein. Die Galerie reagiert automatisch auf zusätzliche Einträge.

## Bilder austauschen

Lege Bilder in `public/images/` ab. Erwartete aktuelle Namen sind:

- `hero.jpg`
- `memory-1.jpg` bis `memory-6.jpg`

Empfohlen sind JPG oder WebP, mindestens 1600 px auf der längeren Kante. Bei fehlenden Bildern zeigt die Anwendung bewusst gestaltete Platzhalter an, damit die Seite stabil bleibt.

## Musik einfügen

Lege eine eigene, rechtlich zulässige Datei unter `public/music/our-song.mp3` ab. Musik startet ausschließlich nach dem Öffnen des Intros durch Nadia. Ohne Datei bleibt die Bedienung stumm und fehlerfrei.

## Deployment auf Vercel

1. Projekt zu GitHub pushen.
2. Bei Vercel anmelden und das Repository importieren.
3. Framework Preset **Next.js** wählen.
4. Build Command: `npm run build`.
5. Deployment starten.

Es sind keine Environment-Variablen und keine `vercel.json` erforderlich.

## Fehlerbehebung

- **Bilder fehlen:** Pfade und Schreibweise in `public/images` prüfen; Fallbacks sind normal.
- **Musik fehlt:** `our-song.mp3` unter `public/music` ablegen; externe Musik wird absichtlich nicht geladen.
- **Build-Probleme:** `rm -rf .next node_modules && npm install && npm run build` ausführen.
- **Veraltete Ansicht:** Browser-Cache leeren bzw. Hard Reload durchführen.
