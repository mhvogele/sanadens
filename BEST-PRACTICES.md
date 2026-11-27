# Best Practices für die Sanadens-Landingpages

Abgeleitet aus der freigegebenen ECO-Hochwasserschutz-Landingpage (`mhvogele/eco-landingpage`, Stand 17.11.2026).
Gilt als Checkliste für Burgau und für jede daraus abgeleitete Seite.

---

## 1. Einbindung in WordPress

Die Landingpages sind statisches HTML. Sie liegen als echte Ordner im WordPress-Root:

```
<webroot>/            ← WordPress (wp-admin, wp-content, index.php …)
├── lp-assets/        ← gemeinsame Assets aller Landingpages
├── burgau/index.html → https://<domain>/burgau/
├── krumbach/index.html
└── …
```

- Apache (Standard-`.htaccess` von WordPress) und nginx (`try_files $uri $uri/ /index.php`) liefern existierende Ordner **vor** WordPress aus. Es ist keine Änderung an WordPress nötig.
- In WordPress darf es **keine Seite oder kein Beitrag mit demselben Slug** geben (`burgau`, `krumbach` …). Sonst gibt es zwei Inhalte für eine URL.
- Assets heißen bewusst `lp-assets/`, damit sie nicht mit Ordnern von WordPress, Theme oder Plugins kollidieren.
- URLs immer **mit abschließendem Slash** (`/burgau/`), auch im Canonical. `/burgau` leitet der Server automatisch auf `/burgau/` um.
- Caching- oder Security-Plugins (z. B. WP Rocket, Wordfence) betreffen die statischen Seiten nicht. Ein CDN (z. B. Cloudflare) dagegen schon, nach dem Deploy also den Cache leeren.

### Sitemap und interne Verlinkung
- Die WordPress-Sitemap (Yoast/Rank Math) kennt die statischen Seiten nicht. Deshalb eine eigene `lp-sitemap.xml` pflegen und in der `robots.txt` per `Sitemap:`-Zeile eintragen bzw. in der Google Search Console einreichen.
- Die WordPress-Seite muss auf die Landingpages verlinken (Footer, Standortseite, passende Leistungsseiten). Ohne interne Links ranken die Seiten deutlich schlechter.
- Die Landingpages verlinken zurück auf die Hauptseite (Logo, Footer, Impressum, Datenschutz).

### Deployment
- Nur die Landingpage-Ordner und `lp-assets/` hochladen, **niemals den ganzen Webroot synchronisieren**.
- Ein `--delete` (rsync) nur innerhalb dieser Ordner verwenden, nie auf den Webroot. Sonst ist WordPress weg.
- Deployt wird ausschließlich der Stand von `main`.

---

## 2. SEO

- Genau ein `h1` pro Seite, mit Leistung und Ort. Danach saubere Hierarchie `h2` → `h3`, ohne übersprungene Ebenen (auch nicht im Footer).
- Der Ort steht in: URL, `<title>`, Meta-Description, `h1`, Einleitungstext, Bild-Alt-Texten (wo passend) und JSON-LD.
- Vollständiger `<head>`: `canonical`, `robots`, Open Graph (inkl. `og:image` mit Breite, Höhe und Alt-Text), Twitter-Card, `theme-color`, Favicon.
- JSON-LD `LocalBusiness` (bzw. den passenden Untertyp) mit Adresse, Telefon, `areaServed` (Ort plus Umland) und `knowsAbout`.
- Bilddateien mit Keywords benennen (`leistung-ort-motiv.webp`). Alt-Texte beschreiben das Bild, statt nur Keywords aufzureihen.
- Bilder **verlinken, nicht als Base64 einbetten**, sonst findet die Google-Bildersuche sie nicht.

### Fünf Seiten ohne Duplicate Content
Größtes Risiko bei abgeleiteten Seiten sind Doorway Pages, also Seiten, die sich nur im Ortsnamen unterscheiden. Pro Ort **eigenständig** zu schreiben:
- `<title>`, Meta-Description, `h1`-Zusatz, Hero-Text
- Lokaler Abschnitt: Ortsteile, Nachbarorte, Anfahrt bzw. Entfernung, örtliche Besonderheiten
- Referenzen oder Projekte aus dem Ort (wenn vorhanden)
- Mindestens zwei FAQ-Fragen mit lokalem Bezug
- Eigenes Hero-Bild bzw. `og:image`, wenn möglich

Gemeinsam sein dürfen: Layout, Design, Leistungsbeschreibungen in Grundzügen, USP-Block, Kontaktdaten.

---

## 3. Code-Struktur

- **CSS und JS liegen in `lp-assets/`**, nicht inline. Eine Korrektur wirkt sofort auf allen fünf Seiten.
- **Keine Inline-Styles** (`style="…"`), immer Klassen.
- **Nur eine Quelldatei pro Seite.** Keine zweite Fassung mit eingebetteten Bildern, die parallel gepflegt werden muss.
- Design-Werte als CSS-Variablen (`--max`, `--gutter`, `--section`, Farben). Abstände und Schriftgrößen mit `clamp()`.
- SVG-Icons und Logo als `<symbol>`-Sprite, eingebunden per `<use>`.
- Progressive Enhancement: Ohne JavaScript ist jeder Inhalt sichtbar (Tabs, Akkordeons, Einblend-Effekte). JS setzt die Klasse `js` am `<html>` und erst dann greifen Effekte.

---

## 4. Datenschutz (DSGVO)

- **Schriften selbst hosten** (`lp-assets/fonts/`). Kein Google Fonts per CDN, denn das überträgt die IP-Adresse an Google (LG München, 2022).
- Keine externen Skripte, Karten oder Videos ohne Einwilligung. Google Maps nur als **Link**, nicht als eingebettete Karte.
- Impressum und Datenschutz verlinken auf die Seiten der WordPress-Hauptseite.

---

## 5. Performance

- Hero-Bild: `<link rel="preload">` + `fetchpriority="high"`. Alle anderen Bilder `loading="lazy"`.
- `width` und `height` an jedem Bild, damit das Layout beim Laden nicht springt (CLS).
- WebP für die Seite, JPG nur für `og:image`.
- **`srcset` mit 2–3 Größen** (z. B. 800/1400/2000 px), damit das Handy kein Desktop-Bild lädt.
- Zielgröße: Hero-WebP < 200 KB, Galerie-Bilder < 150 KB.

---

## 6. Barrierefreiheit (BFSG)

- Sichtbarer Fokus (`:focus-visible`) in der Markenfarbe.
- Kontrast mindestens 4,5:1 für Fließtext. Mit der Markenfarbe vorher prüfen.
- Dekorative SVGs mit `aria-hidden="true"`, bedeutungstragende SVGs mit `role="img"` + `aria-label`.
- Tabs: `role="tablist"`, `aria-selected`, `aria-controls`, Pfeiltasten-Steuerung.
- FAQ mit nativem `<details>`/`<summary>`.
- Mobiles Menü: `aria-expanded`, `aria-controls`, Schließen mit Escape, Fokus bleibt im offenen Menü.
- `prefers-reduced-motion` schaltet alle Animationen ab (Ken-Burns, Parallax, Einblenden, Smooth Scroll).

---

## 7. Responsive

- Max. Inhaltsbreite plus Mindestrand links/rechts auf allen Geräten.
- Breakpoints: Tablet (761–1080 px) mit mehr Luft zwischen den Sektionen, Handy (≤ 760 px) mit allem untereinander, sehr kleine Handys (≤ 400 px) mit Silbentrennung.
- Lange Wörter: `overflow-wrap: break-word`, `hyphens: auto` nur auf sehr kleinen Screens.
- Mobile Kontaktleiste (Anrufen / Anfrage), die am Seitenende ausgeblendet wird.
- Testen bei 320, 375, 768, 1024, 1280 und 1440 px.

---

## 8. Texte

- Nicht mit Angst werben. Themen sachlich als rationale Maßnahme mit zusätzlichem Nutzen herleiten.
- Keine Platzhalter auf der Live-Seite. Lieber einen Abschnitt weglassen als ihn mit Blindtext zu füllen.
- Steht die FAQ im HTML **und** im JSON-LD, müssen beide Texte identisch sein. Bei jeder Änderung beide anpassen.

---

## Checkliste vor dem Merge in `main`

- [ ] Title, Meta-Description, `h1`, Canonical mit Ort und abschließendem Slash
- [ ] Ortsspezifische Abschnitte eigenständig formuliert (kein reiner Ortsnamen-Tausch)
- [ ] JSON-LD validiert (https://validator.schema.org)
- [ ] FAQ im HTML und im JSON-LD identisch
- [ ] Alle Bilder: WebP, `srcset`, `width`/`height`, Alt-Text, sprechender Dateiname
- [ ] Keine externen Fonts oder Skripte
- [ ] Keine Inline-Styles, keine Platzhalter
- [ ] Responsive geprüft (320–1440 px)
- [ ] Tastaturbedienung und `prefers-reduced-motion` geprüft
- [ ] `lp-sitemap.xml` aktualisiert
- [ ] Kein gleichnamiger Slug in WordPress
