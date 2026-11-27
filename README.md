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

- `assets/` – gemeinsames CSS, JS, Fonts und Bilder für alle Seiten
- `<ort>/index.html` – die Landingpage des Ortes
- `<ort>/img/` – ortsspezifische Bilder

## Arbeitsweise mit Git

- `main` ist immer der freigegebene Stand.
- Änderungen in kurzlebigen Branches, z. B. `feature/krumbach-texte` oder `fix/footer`, danach per Pull Request in `main` mergen und den Branch löschen.
- Keine dauerhaften Branches pro Ort.

## SEO-Hinweis

Jede Seite braucht eigenständigen Text, Title und Meta-Description sowie echte lokale Bezüge. Nur den Ortsnamen auszutauschen reicht nicht (Gefahr: Doorway Pages / Duplicate Content).
