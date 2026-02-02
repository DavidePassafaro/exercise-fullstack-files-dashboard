# Files Dashboard

Un'applicazione full-stack per la gestione e la visualizzazione di file CSV e XLSX.
Permette agli utenti di caricare file, visualizzare una preview del contenuto e configurare i tipi di dati per ogni colonna.

## Come avviare l'applicazione

### Prerequisiti

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/) (solo per avvio manuale)

### Avvio rapido con Docker (Raccomandato)

Il repository fornisce gia un file `.env` al fine di facilitare l'avvio dell'applicazione, normalmente non dovrebbe essere presente e dovrebbe essere nei file ignorati da Git.

1. **Avvia i container:**

   ```bash
   npm run start-docker
   ```

2. **Accedi all'applicazione:**
   - Frontend: [http://localhost:4200](http://localhost:4200)

### Avvio Manuale (Sviluppo Locale)

#### 1. Database

Assicurati di avere un'istanza di MongoDB attiva su `localhost:27017`.

#### 2. Backend

```bash
cd server
npm install
npm run dev
```

Il server sarà attivo su [http://localhost:4000](http://localhost:4000).

#### 3. Frontend

```bash
cd webapp
npm install
npm start
```

La webapp sarà attiva su [http://localhost:4200](http://localhost:4200).

---

## 🏗️ Architettura e Scelte Tecniche

### Frontend: Angular 21

L'applicazione è stata sviluppata con Angular 21 come da requisiti (16+).

Tra le varie feature implementate troviamo:

- **Standalone Components:** Utilizzo dei componenti standalone per una struttura più snella e moderna.
- **Angular CDK Virtual Scroll:** Implementato per predisporre l'interfaccia a gestire dataset di grandi dimensioni con performance ottimali.
- **Signals:** Utilizzo dei segnali per la gestione reattiva dello stato.
- **Nginx:** In ambiente Docker, il frontend viene servito tramite un container Nginx pre-configurato.

La struttura del frontend è stata pensata per essere modulare e scalabile, permettendo di aggiungere facilmente nuove funzionalità in futuro.

Molte delle funzionalità implementate sono state già predisposte per essere scalabili, ad esempio la creazione del breadcrumb a partire dal file di routing, l'utilizzo di componenti standalone, l'utilizzo di Signals, ecc.

Per quanto riguarda la gestione dello stato applicativo, ho optato per un approccio ibrido, utilizzando i segnali per la gestione dello stato locale dei componenti e RxJS per la gestione dello stato globale e delle chiamate API. Una miglioria potrebbe essere l'adozione di una libreria di gestione dello stato globale come NgRx, tuttavia, per un'applicazione di queste dimensioni, e per valocizzare lo sviluppo, ho ritenuto che l'approccio ibrido fosse sufficiente, cosi da poter mostrare la mia padronanza con i Signals ed RxJS.

Infine, per quanto riguarda la gestione del design, ho optato per un approccio minimalista, utilizzando i componenti base di Angular e CSS per la stilizzazione. Una miglioria potrebbe essere l'adozione di un design system custom e l'utilizzo appropriato di design tokens.

Per motivi di tempo non ho potuto approfondire ulteriormente aspetti come accessibilità, performance, SEO, unit testing e E2E testing.

### Backend: Node.js & Express

L'applicativo backend è stato sviluppato con Node.js come da requisiti.

Tra le varie scelte e feature implementate troviamo:

- **Express:** Framework per la gestione delle rotte e delle richieste HTTP.
- **RESTful API:** Endpoint strutturati per la gestione di utenti e file.
- **Mongoose:** ODM per l'interazione con MongoDB.
- **Multer:** Middleware per la gestione del caricamento di file multipart/form-data.
- **XLSX (SheetJS):** Libreria utilizzata per il parsing di file CSV e XLSX direttamente sul server.

La scelta di Express è dovuta alla mia poca familiarità con altri framework Node.js.

Non escludo ci siano notevoli margini di miglioramento, tuttavia, data la mia poca esperienza con Node.js, l'implementazione di questo server è stata fonte di grande apprendimento e sfide.

Le API dei file sono state pensate per essere scalabili, ad esempio la gestione dei file tramite Multer, l'utilizzo di middleware per la validazione dei dati, e l'utilizzo di librerie come XLSX per il parsing dei file. Estendendo le API per supportare altri formati di file sarebbe molto semplice, basterebbe strutturare questi middleware per il parsing del file e aggiornare i tipi di dati supportati.

### Database: MongoDB

L'utilizzo di MongoDB è stato dettato dai requisiti dell'esercizio.

L'utilizzo di mongoose come ODM ha reso molto semplice l'interazione con il database, permettendo di definire schemi e modelli per i dati in modo intuitivo e sicuro.

### Docker

L'utilizzo di Docker è stato suggerito come punto addizionale dai requisiti dell'esercizio.

L'utilizzo di Docker Compose per la gestione dei tre servizi (frontend, backend, database) garantisce la comunicazione interna tramite una rete dedicata, semplificando notevolmente l'avvio e la gestione dell'applicazione.

Non escludo che ci siano configurazioni più efficienti, tuttavia, ho cercato di implementare le funzionalità richieste nel modo più efficiente possibile con le conoscenze che ho acquisito solo recentemente.

---

## ⚠️ Limitazioni e Assunzioni

1. **Autenticazione:**
   - Il sistema utilizza un'autenticazione basata su cookie (`token`). In questa versione, il token corrisponde all'ID dell'utente (simulazione di un sistema di sessione semplice).
   - Il flussoo di autenticazione nella webapp non richiede alcun pattern per la password e non fornisce un meccanismo di recupero di quest'ultima.
2. **Storage dei File:**
   - I file caricati vengono salvati localmente nella cartella `server/uploads`. In un ambiente di produzione reale, si raccomanda l'uso di un servizio di Object Storage (come AWS S3 o simili). Probabilmente ci sono soluzioni più efficienti utilizzando Docket in locale come ho fatto, ma al momento non mi sono soffermato su questo aspetto.
3. **Dimensione File:**
   - Il parsing dei file avviene in memoria. File estremamente pesanti potrebbero richiedere ottimizzazioni tramite streaming.
4. **State Management:**
   - In previsione di crescita del progetto, sarebbe opportuno implementare una soluzione di state management più robusta, come NgRx. Questa, permetterebbe di gestire lo stato globale dell'applicazione in modo più efficiente e scalabile, oltre a fornire strumenti per la gestione degli effetti collaterali e la gestione degli errori. Una webapp con molte entità e interazioni tra di esse, come cambio di permessi e collaborazione real time (mediante websocket), beneficerebbe enormemente di una soluzione di state management centralizzata.
