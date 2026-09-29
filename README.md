# Aiki-do — HTML-hjemmeside

Den nye hjemmeside ligger i **site/** og består af almindelig HTML, CSS, JavaScript og billeder. Siden kan bruges og udgives direkte uden installation eller build.

## Se og rediger

Åbn `site/index.html` i browseren. Rediger indhold i `site/index.html`, design i `site/styles.css` og animation/mobilmenu/Facebook-indlejring i `site/script.js`.

Der er nu tre selvstændige HTML-sider:

- `site/index.html`: forsiden med Jan-intro, træningstider, kontakt og Facebook-feed.
- `site/instruktører/index.html`: instruktører samt andre funktioner i klubben.
- `site/om-klubben/index.html`: klubbens baggrund, historiske foto og tidslinje.

## Find rundt i koden

Selvom projektmappen hedder hugo-aikido-noa, er hjemmesiden almindelig HTML, CSS og JavaScript. Du behøver ikke Hugo eller et buildværktøj.

| Det vil du ændre | Her skal du kigge |
| --- | --- |
| Forsidens tekster, træningstider og kontaktoplysninger | [site/index.html](site/index.html) |
| Instruktørnavne, grader og beskrivelser | [site/instruktører/index.html](site/instruktører/index.html) |
| Klubbens historie og tidslinje | [site/om-klubben/index.html](site/om-klubben/index.html) |
| Farver, skrifter, menu og forsidens afsnit | [site/css/base.css](site/css/base.css) |
| Undersidernes layout og instruktørafsnittet længere nede på forsiden | [site/css/pages.css](site/css/pages.css) |
| De tre store portrætter øverst på forsiden | [site/css/trainers.css](site/css/trainers.css) |
| Jans introanimation og de afsluttende mobiltilpasninger | [site/css/intro.css](site/css/intro.css) |
| Intro, mobilmenu, årstal og Facebook-indlæsning | [site/script.js](site/script.js) |
| Billeder og logo | [site/assets/](site/assets/) |
| Automatisk udgivelse | [.github/workflows/pages.yaml](.github/workflows/pages.yaml) |

### Sådan finder du et afsnit

HTML-filerne har indrykning og kommentarer ved navngivne afsnit. Søg for eksempel efter `id="traening"` for træningstider eller `id="kontakt"` for kontaktoplysninger. En HTML-klasse som `training-card` findes i CSS som `.training-card`.

[site/styles.css](site/styles.css) indlæser de fire CSS-filer i rækkefølge. Bevar rækkefølgen: senere regler tilpasser tidligere regler. Søg efter `@media` for skærmstørrelser og reduceret bevægelse. De eksisterende afsluttende mobilregler ligger i intro.css, fordi deres placering påvirker designet på alle tre sider.

JavaScript starter nederst i script.js med fire funktioner: `setupIntro()`, `setupMobileMenu()`, `updateCopyrightYear()` og `setupFacebookFeed()`. Indstillinger for introlængde og Facebook-adresse står øverst.

Menu og sidefod er skrevet i hver af de tre HTML-filer. Når du ændrer fælles links, skal du rette alle tre. Undersider bruger `../` foran stier til fælles filer.

### Kontroller en ændring

Åbn site/index.html i en browser, og besøg begge undersider. Kontroller både et bredt og et smalt vindue. Ved ændringer i JavaScript: prøv mobilmenuen, Escape, introens spring-over-knap og “Se intro igen”. Facebook opretter først forbindelse, når du trykker “Vis Facebook-feed”.

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
