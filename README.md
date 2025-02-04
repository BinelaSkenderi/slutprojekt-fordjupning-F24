# 🌍 **Weather Forecast App**

Detta är en väderprognos-app som använder OpenWeatherMap API för att hämta väderdata och Unsplash API för att visa en bild av den sökta staden.
<br>
<br>

## 🛠️ Instalation och körning
1. Klona projektet: <br>
        git clone <https://github.com/BinelaSkenderi/slutprojekt-fordjupning-F24.git>
2. Installera beroenden: <br>      ```- npm install```
3. Kompilera och köra projektet:<br>
       ``` - npm run dev```
<br>
<br>

## 🌟 Funktioner
- Sök efter en stad och få aktuell väderinformation.

- Se en 5-dagarsprognos för vald stad.

- Dynamisk bakgrundsbild baserad på vald stad.

- Responsiv design som fungerar på både mobil och desktop.
<br>
<br>

## 🌐 API:er som används
1. **OpenWeatherMpap**: <https://api.openweathermap.org/data/2.5/>
- Aktuell väderdata: 
````
{
  "weather": [
    { "description": "clear sky" }
  ],
  "main": {
    "temp": 15.0
  },
  "wind": {
    "speed": 3.5
  }
}
````

- 5-dagars prognos: 
````{
  "list": [
    {
      "dt": 1618308000,
      "main": { "temp": 14.5 },
      "weather": [{ "description": "light rain" }],
      "wind": { "speed": 4.1 }
    }
  ]
}
````

2. **UnsplashAPI**: <https://api.unsplash.com/>
- Hämtar stadens bild baserat på staden namn
````{
  "results": [
    { "urls": { "regular": "https://image.url" } }
  ]
}
````
<br>
<br>

## 🧰 Använda teknologier 
- **TypeScript** - För typad och strukturerad JavaScript-kod.

- **SCSS** - För avancerad och modulär CSS.

- **Fetch API** - För att hämta data från externa API:er med async/await.

- **HTML/CSS/JavaScript** - Grundläggande webbteknologier.
<br>
<br>

## 📂 Projektstruktur
````
/weather-forecast-app
/src
  /scripts
    - main.ts          // Huvudfil för logiken
    - api.ts           // Funktioner för API-anrop
    - ui.ts            // Funktioner för att uppdatera användargränssnittet
  /styles
    - main.scss        // Huvud-SCSS-fil
    - variables.scss   // SCSS-variabler
    - mixins.scss      // SCSS-mixins
/readme.md             // Projektbeskrivning
/index.html            // Grundläggande HTML
/package.json          // Beroenden och scripts
/tsconfig.json         // TypeScript-konfiguration
│── README.md            # Dokumentation
````
<br>
<br>

## 💡 Framtida förbättringar
- Lägg till fler väderdetaljer, t.ex. luftfuktighet och nederbörd.

- Implementera en sökfunktion som föreslår städer automatiskt.

- Möjlighet att spara favoritstäder.
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>




## :handshake: Kontakt
    Skapare: Binela Skenderi
    LinkedIn: <https://www.linkedin.com/in/binela-skenderi/>
    GitHub: <https://github.com/BinelaSkenderi>