# Aiki-do — HTML-hjemmeside

Den nye hjemmeside ligger i **site/** og består af almindelig HTML, CSS, JavaScript og billeder. Siden kan bruges og udgives direkte uden installation eller build.

## Se og rediger

Åbn `site/index.html` i browseren. Rediger indhold i `site/index.html`, design i `site/styles.css` og animation/mobilmenu/Facebook-indlejring i `site/script.js`.

Der er nu tre selvstændige HTML-sider:

- `site/index.html`: forsiden med Jan-intro, træningstider, kontakt og Facebook-feed.
- `site/instruktører/index.html`: instruktører samt andre funktioner i klubben.
- `site/om-klubben/index.html`: klubbens baggrund, historiske foto og tidslinje.

## GitHub Pages

Workflowet `.github/workflows/pages.yaml` udgiver `site/` direkte. GitHub Pages skal bruge **GitHub Actions** som source. Ved push til `main`, som ændrer `site/` eller workflowet, udgives siden. Workflowet kan også startes manuelt.

Domæne og mailopsætning ændres ikke af disse lokale filer. Bevar den eksisterende domæneindstilling i GitHub Pages. Der er ikke foretaget commit, push eller onlineudgivelse som del af den lokale redesignleverance.

Kun `site/` bliver uploadet. Projektet indeholder den aktuelle HTML-hjemmeside, udgivelsesopsætningen og dokumentation.

## Indhold

Kluboplysninger, historie, instruktørnavne, grader og fotos stammer fra det eksisterende projekt. Bekræft at oplysningerne stadig er aktuelle før lancering. Undersiderne bruger de oprindelige portrætter og klubbens historiske foto.

Introen er en AI-bearbejdet animation af Jan Sell, lavet ud fra portrættet på instruktørsiden. Tre transparente billeder viser ham stående, tage et skridt frem og bukke i sin sorte gi med rødt/hvidt bælte. Det er ikke en videooptagelse af Jan. Billeder og CSS kombinerer fremtræden, buk og åbning af facaden på ca. 5,8 sekunder. Prompts og metode findes i `docs/jan-image-prompts.txt`.

Besøgende kan springe introen over med knappen eller Escape. Reduceret bevægelse, direkte sektionslinks og undersider springer introen over. Den kan afspilles igen fra forsidens sidefod. Uden JavaScript eller ved billedfejl er hjemmesiden tilgængelig; en indledende facade har desuden en timeout på seks sekunder ved langsom forbindelse.

Facebook-feedet bruger Metas Page Plugin og opretter først forbindelse til Facebook, når besøgende vælger **Vis Facebook-feed**. Den faktiske visning afhænger af Meta, sidens offentlige tilgængelighed og browserens beskyttelse. Direkte link er altid tilgængeligt. Ingen API-nøgler er nødvendige. Indlejringens oprettelse er testet; liveopslag er ikke verificeret.

Skrifttyper hentes fra Google Fonts med lokale fallback-skrifter. Alle billeder ligger lokalt i `site/assets`.
