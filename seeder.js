const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("./utils/password");
const prisma = new PrismaClient();

const tags = [
    { id: 1, label: "JavaScript", color: "#f7df1e" },
    { id: 2, label: "CSS", color: "#2965f1" },
    { id: 3, label: "HTML", color: "#e34c26" },
    { id: 4, label: "React", color: "#61dafb" },
    { id: 5, label: "Node.js", color: "#3c873a" },
    { id: 6, label: "MongoDB", color: "#47A248" },
    { id: 7, label: "Express", color: "#023047" },
    { id: 8, label: "Angular", color: "#dd1b16" },
    { id: 9, label: "Vue", color: "#4FC08D" },
    { id: 10, label: "SQL", color: "#336791" }
];

const categories = [
    { id: 1, label: "Frontend", color: "#1f77b4" },
    { id: 2, label: "Backend", color: "#ff7f0e" },
    { id: 3, label: "Database", color: "#2ca02c" },
    { id: 4, label: "DevOps", color: "#d62728" },
    { id: 5, label: "Mobile", color: "#9467bd" },
    { id: 6, label: "AI", color: "#8c564b" },
    { id: 7, label: "Security", color: "#e377c2" },
    { id: 8, label: "Cloud", color: "#7f7f7f" },
    { id: 9, label: "Testing", color: "#bcbd22" },
    { id: 10, label: "UI/UX", color: "#17becf" }
];

const users = [
    {
        id: 1,
        isAdmin: true,
        isOwner: false,
        name: "Mario Rossi",
        email: "mario.rossi@example.com",
        password: "MarioRossi123!"
    },
    {
        id: 2,
        isAdmin: false,
        isOwner: false,
        name: "Luca Bianchi",
        email: "luca.bianchi@example.com",
        password: "LucaBianchi456!"
    },
    {
        id: 3,
        isAdmin: false,
        isOwner: false,
        name: "Giulia Verdi",
        email: "giulia.verdi@example.com",
        password: "GiuliaVerdi789!"
    },
    {
        id: 4,
        isAdmin: true,
        isOwner: false,
        name: "Anna Neri",
        email: "anna.neri@example.com",
        password: "AnnaNeri321!"
    },
    {
        id: 5,
        isAdmin: false,
        isOwner: false,
        name: "Paolo Gialli",
        email: "paolo.gialli@example.com",
        password: "PaoloGialli654!"
    },
    {
        id: 7,
        isAdmin: true,
        isOwner: true,
        name: "Santiago Galvan",
        email: "santiago.galvan@example.com",
        password: "password"
    }
];

const posts = [
    {
        id: 1,
        title: "Introduzione a JavaScript",
        tags: [1, 3, 4],
        content: "In questo articolo esploreremo le basi di JavaScript, un linguaggio di programmazione essenziale per lo sviluppo web.",
        categoryId: 6,
        userId: 1,
        published: true,
        slug: "introduzione-javascript"
    },
    {
        id: 2,
        title: "Guida al CSS Flexbox",
        tags: [2, 3],
        content: "Flexbox è un layout model in CSS3 progettato per aiutare a distribuire spazio lungo un container e allineare gli elementi.",
        categoryId: 1,
        userId: 2,
        published: true,
        slug: "guida-css-flexbox"
    },
    {
        id: 3,
        title: "Comprendere le Promesse in JavaScript",
        tags: [1, 5],
        content: "Le Promesse in JavaScript rappresentano il completamento (o fallimento) eventuale di un'operazione asincrona e i suoi valori risultanti.",
        categoryId: 9,
        userId: 3,
        published: true,
        slug: "comprendere-promesse-javascript"
    },
    {
        id: 4,
        title: "Introduzione a TypeScript",
        tags: [1, 4],
        content: "TypeScript è un superset tipizzato di JavaScript che si compila in JavaScript semplice.",
        categoryId: 10,
        userId: 4,
        published: true,
        slug: "introduzione-typescript"
    },
    {
        id: 5,
        title: "Creare API RESTful con Node.js",
        tags: [4, 5],
        content: "Impara come creare un'API RESTful utilizzando Node.js ed Express.",
        categoryId: 2,
        userId: 5,
        published: false,
        slug: "creare-api-restful-nodejs"
    },
    {
        id: 6,
        title: "Guida a Async/Await in JavaScript",
        tags: [1, 4, 6],
        content: "Async/Await semplifica la scrittura di codice asincrono in JavaScript, rendendolo simile al codice sincrono.",
        categoryId: 2,
        userId: 1,
        published: true,
        slug: "guida-async-await-javascript"
    },
    {
        id: 7,
        title: "Vue.js per Principianti",
        tags: [9],
        content: "Vue.js è un framework progressivo per costruire interfacce utente.",
        categoryId: 1,
        userId: 2,
        published: true,
        slug: "vuejs-principianti"
    },
    {
        id: 8,
        title: "Gestione dello Stato con Redux",
        tags: [1, 4],
        content: "Redux è un contenitore di stato prevedibile per applicazioni JavaScript.",
        categoryId: 1,
        userId: 3,
        published: true,
        slug: "gestione-stato-redux"
    },
    {
        id: 9,
        title: "Introduzione a GraphQL",
        tags: [1, 3, 5],
        content: "GraphQL è un linguaggio di query per API e un runtime per l'esecuzione di tali query.",
        categoryId: 2,
        userId: 4,
        published: true,
        slug: "introduzione-graphql"
    },
    {
        id: 10,
        title: "Caratteristiche Moderne di JavaScript",
        tags: [1],
        content: "Esploriamo alcune delle caratteristiche moderne disponibili in JavaScript (ES6 e oltre).",
        categoryId: 2,
        userId: 5,
        published: true,
        slug: "caratteristiche-moderne-javascript"
    },
    {
        id: 11,
        title: "Creare App Mobili con React Native",
        tags: [4],
        content: "React Native permette di creare app veramente native e non compromette l'esperienza degli utenti.",
        categoryId: 5,
        userId: 1,
        published: false,
        slug: "creare-app-mobili-react-native"
    },
    {
        id: 12,
        title: "Rendering Server-Side con Next.js",
        tags: [4, 6],
        content: "Next.js è un framework React che abilita il rendering server-side e la generazione statica del sito.",
        categoryId: 2,
        userId: 2,
        published: true,
        slug: "rendering-server-side-nextjs"
    },
    {
        id: 13,
        title: "Comprendere il DOM",
        tags: [3],
        content: "Il DOM (Document Object Model) è una rappresentazione ad albero di un documento HTML o XML.",
        categoryId: 1,
        userId: 3,
        published: true,
        slug: "comprendere-dom"
    },
    {
        id: 14,
        title: "Introduzione a Docker",
        tags: [5],
        content: "Docker è una piattaforma per sviluppatori e amministratori di sistema per sviluppare, spedire ed eseguire applicazioni in container.",
        categoryId: 4,
        userId: 4,
        published: true,
        slug: "introduzione-docker"
    },
    {
        id: 15,
        title: "Configurazione di un Server Nginx",
        tags: [7],
        content: "Nginx è un web server ad alte prestazioni e reverse proxy server.",
        categoryId: 4,
        userId: 5,
        published: true,
        slug: "configurazione-server-nginx"
    },
    {
        id: 16,
        title: "Nozioni di Base di SQL",
        tags: [10],
        content: "SQL (Structured Query Language) è un linguaggio standard per l'interazione con i database relazionali.",
        categoryId: 3,
        userId: 1,
        published: true,
        slug: "nozioni-base-sql"
    },
    {
        id: 17,
        title: "Costruire e Gestire Database con MongoDB",
        tags: [6],
        content: "MongoDB è un database NoSQL orientato ai documenti che offre alta scalabilità e flessibilità.",
        categoryId: 3,
        userId: 2,
        published: true,
        slug: "costruire-gestire-database-mongodb"
    },
    {
        id: 18,
        title: "Introduzione al Machine Learning",
        tags: [6],
        content: "Scopri le basi del Machine Learning e come iniziare a costruire modelli predittivi.",
        categoryId: 6,
        userId: 3,
        published: true,
        slug: "introduzione-machine-learning"
    },
    {
        id: 19,
        title: "Proteggere le API con JWT",
        tags: [7],
        content: "JSON Web Token (JWT) è uno standard per la creazione di token di accesso che possono essere utilizzati in applicazioni web.",
        categoryId: 7,
        userId: 4,
        published: true,
        slug: "proteggere-api-jwt"
    },
    {
        id: 20,
        title: "Deploy di Applicazioni su AWS",
        tags: [8],
        content: "Impara come fare il deploy di applicazioni web su AWS, una delle piattaforme cloud più popolari.",
        categoryId: 8,
        userId: 5,
        published: false,
        slug: "deploy-applicazioni-aws"
    },
    {
        id: 21,
        title: "Testare Applicazioni con Jest",
        tags: [1, 4],
        content: "Jest è un framework di testing per JavaScript che permette di scrivere test unitari e di integrazione.",
        categoryId: 9,
        userId: 1,
        published: true,
        slug: "testare-applicazioni-jest"
    },
    {
        id: 22,
        title: "Ottimizzazione delle Prestazioni Web",
        tags: [1, 2],
        content: "Scopri come migliorare le prestazioni dei siti web con tecniche di ottimizzazione e strumenti di analisi.",
        categoryId: 1,
        userId: 2,
        published: true,
        slug: "ottimizzazione-prestazioni-web"
    },
    {
        id: 23,
        title: "Introduzione a Kubernetes",
        tags: [5, 7],
        content: "Kubernetes è un sistema di orchestrazione per container che automatizza il deployment, il ridimensionamento e la gestione delle applicazioni.",
        categoryId: 4,
        userId: 3,
        published: true,
        slug: "introduzione-kubernetes"
    },
    {
        id: 24,
        title: "Costruire Interfacce Utente con Bootstrap",
        tags: [2, 3],
        content: "Bootstrap è un framework front-end open-source che aiuta a creare interfacce utente reattive e moderne.",
        categoryId: 10,
        userId: 4,
        published: false,
        slug: "costruire-interfacce-bootstrap"
    },
    {
        id: 25,
        title: "Sviluppo Mobile con Flutter",
        tags: [5],
        content: "Flutter è un framework open-source di Google per la costruzione di applicazioni mobili nativamente compilate.",
        categoryId: 5,
        userId: 5,
        published: true,
        slug: "sviluppo-mobile-flutter"
    },
    {
        id: 26,
        title: "Creare Applicazioni in Tempo Reale con WebSockets",
        tags: [1, 5],
        content: "WebSockets permette la comunicazione bidirezionale tra client e server, ideale per applicazioni in tempo reale.",
        categoryId: 2,
        userId: 1,
        published: true,
        slug: "creare-applicazioni-realtime-websockets"
    },
    {
        id: 27,
        title: "Utilizzare Git e GitHub",
        tags: [7],
        content: "Git è un sistema di controllo versione distribuito, mentre GitHub è una piattaforma di hosting per progetti Git.",
        categoryId: 4,
        userId: 2,
        published: true,
        slug: "utilizzare-git-github"
    },
    {
        id: 28,
        title: "Sicurezza delle Applicazioni Web",
        tags: [7],
        content: "Scopri le principali vulnerabilità delle applicazioni web e come proteggerle da attacchi comuni.",
        categoryId: 7,
        userId: 3,
        published: true,
        slug: "sicurezza-applicazioni-web"
    },
    {
        id: 29,
        title: "Testing End-to-End con Cypress",
        tags: [1, 4],
        content: "Cypress è un framework di testing end-to-end per applicazioni web, progettato per rendere i test facili e affidabili.",
        categoryId: 9,
        userId: 4,
        published: true,
        slug: "testing-end-to-end-cypress"
    },
    {
        id: 30,
        title: "Progettare API con Swagger",
        tags: [5],
        content: "Swagger è uno strumento open-source per la progettazione, costruzione, documentazione e consumo di API.",
        categoryId: 2,
        userId: 5,
        published: true,
        slug: "progettare-api-swagger"
    },
    {
        id: 31,
        title: "React vs. Angular vs. Vue",
        tags: [4, 8, 9],
        content: "Un confronto tra i tre principali framework JavaScript per lo sviluppo front-end: React, Angular e Vue.",
        categoryId: 1,
        userId: 1,
        published: false,
        slug: "react-angular-vue"
    },
    {
        id: 32,
        title: "Introduzione a Terraform",
        tags: [7, 8],
        content: "Terraform è un tool open-source per il provisioning e la gestione dell'infrastruttura tramite codice.",
        categoryId: 8,
        userId: 2,
        published: true,
        slug: "introduzione-terraform"
    },
    {
        id: 33,
        title: "Creare e Gestire Microservizi",
        tags: [5, 7],
        content: "Un'introduzione all'architettura a microservizi e come implementarli efficacemente.",
        categoryId: 2,
        userId: 3,
        published: true,
        slug: "creare-gestire-microservizi"
    },
    {
        id: 34,
        title: "Ottimizzazione delle Query SQL",
        tags: [10],
        content: "Tecniche avanzate per migliorare le prestazioni delle query SQL nei database relazionali.",
        categoryId: 3,
        userId: 4,
        published: true,
        slug: "ottimizzazione-query-sql"
    },
    {
        id: 35,
        title: "Implementare OAuth in Applicazioni Web",
        tags: [7],
        content: "OAuth è uno standard aperto per l'autorizzazione, comunemente utilizzato per concedere l'accesso a risorse tra server.",
        categoryId: 7,
        userId: 5,
        published: true,
        slug: "implementare-oauth-applicazioni-web"
    },
    {
        id: 36,
        title: "Gestione della Configurazione con Ansible",
        tags: [7, 8],
        content: "Ansible è uno strumento open-source per la gestione della configurazione, l'orchestrazione delle applicazioni e il provisioning.",
        categoryId: 8,
        userId: 1,
        published: true,
        slug: "gestione-configurazione-ansible"
    },
    {
        id: 37,
        title: "Creare Componenti UI Riutilizzabili",
        tags: [4, 9],
        content: "Scopri come creare componenti UI riutilizzabili in React per migliorare la modularità e la manutenibilità del codice.",
        categoryId: 10,
        userId: 2,
        published: true,
        slug: "creare-componenti-ui-riutilizzabili"
    },
    {
        id: 38,
        title: "Gestire lo Stato Globale con Context API",
        tags: [1, 4],
        content: "La Context API di React permette di gestire lo stato globale dell'applicazione senza la necessità di librerie esterne.",
        categoryId: 1,
        userId: 3,
        published: true,
        slug: "gestire-stato-globale-context-api"
    },
    {
        id: 39,
        title: "Automatizzare i Deployment con Jenkins",
        tags: [7],
        content: "Jenkins è uno strumento open-source di integrazione continua e consegna continua (CI/CD) per automatizzare i processi di deployment.",
        categoryId: 4,
        userId: 4,
        published: true,
        slug: "automatizzare-deployment-jenkins"
    },
    {
        id: 40,
        title: "Costruire Interfacce Utente con Material-UI",
        tags: [4, 8, 10],
        content: "Jenkins è uno strumento open-source di integrazione continua e consegna continua (CI/CD) per automatizzare i processi di deployment.",
        categoryId: 4,
        userId: 4,
        published: false,
        slug: "costruire-interfacce-utente-con-material-ui"
    }
];


// Categorie
prisma.category.createMany({
    data: categories
})
    .then()
    .catch(err => console.error(err));

// Tag
prisma.tag.createMany({
    data: tags
})
    .then()
    .catch(err => console.error(err));

// User
users.forEach(async (user) => {
    const { id, email, name, password, isAdmin, isOwner } = user;

    const passwordDb = await hashPassword(password);

    const data = {
        id,
        email,
        name,
        password: passwordDb,
        isAdmin,
        isOwner
    };

    prisma.user.create({ data }).then().catch(err => console.error(err));
})

// Posts
posts.forEach(post => {

    const { id, title, slug, content, categoryId, published, tags, userId } = post;

    const data = {
        id,
        title,
        slug,
        content,
        categoryId,
        published,
        userId,
        tags: { connect: tags.map(id => ({ id })) }
    }

    prisma.post.create({ data }).then().catch(err => console.error(err));

})
