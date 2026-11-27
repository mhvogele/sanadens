# Sanadens – Lokale Landingpages

Fünf Landingpages, eine pro Ort. Gemeinsame Technik, eigenständige Inhalte.

| Ort | Ordner |
|---|---|
| Burgau | `burgau/` |
| Krumbach | `krumbach/` |
| Ichenhausen | `ichenhausen/` |
| Günzburg | `guenzburg/` |
| Zusmarshausen | `zusmarshausen/` |

## Struktur

- `lp-assets/` – gemeinsames CSS, JS, Fonts und Bilder für alle Seiten
- `<ort>/index.html` – die Landingpage des Ortes
- `<ort>/img/` – ortsspezifische Bilder

## Einbindung in WordPress

Die Ordner werden in den Webroot der Sanadens-WordPress-Seite gelegt und sind dann unter `https://<domain>/burgau/` usw. erreichbar. Details siehe [BEST-PRACTICES.md](BEST-PRACTICES.md#1-einbindung-in-wordpress).

## Arbeitsweise mit Git

- `dev` ist der Arbeitsbranch. Alle Änderungen werden direkt dort committet und gepusht.
- `main` ist der freigegebene Stand. Nur nach Abnahme wird `dev` in `main` gemergt, und nur `main` wird auf den Server deployt.
- Vorschau des aktuellen Arbeitsstands: https://raw.githack.com/mhvogele/sanadens/dev/burgau/index.html (Ortsordner im Link austauschen)

## SEO-Hinweis

Ausführliche Regeln und die Checkliste vor dem Merge: [BEST-PRACTICES.md](BEST-PRACTICES.md).


Jede Seite braucht eigenständigen Text, Title und Meta-Description sowie echte lokale Bezüge. Nur den Ortsnamen auszutauschen reicht nicht (Gefahr: Doorway Pages / Duplicate Content).
