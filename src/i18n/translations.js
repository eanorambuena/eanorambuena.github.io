const es = {
  nav: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    education: 'Educación',
    projects: 'Proyectos',
    skills: 'Skills',
    opensource: 'Open Source',
    charlas: 'Charlas',
    donar: 'Donar',
    contact: 'Contacto',
  },
  hero: {
    tagline: 'Product Engineer',
    desc: 'Fullstack product engineer basado en Chile.',
    descAccent: ' Construyo herramientas que ahorran dinero real: reduje costos de IA de $200/usuario a $0, creé plataformas para 1,500+ usuarios concurrentes.',
    btnProjects: 'Ver Proyectos',
    btnContact: 'Contactar',
  },
  about: {
    subtitle: 'Sobre mí',
    title: 'Builder en Chile',
    p1: "Soy un product engineer que desarrolla rápido y piensa en sistemas. He construido plataformas para <strong>1,500+ usuarios concurrentes</strong>, reducido costos de infraestructura de IA de <strong>$200/usuario a $0</strong>, y contribuido herramientas open source con <strong>1,000+ descargas totales en npm</strong>.",
    p2: 'En la <strong>Pontificia Universidad Católica de Chile</strong>, diseñé una plataforma de coevaluación que redujo el tiempo de corrección en 60%. En <strong>NeuralWorks</strong>, lideré una migración frontend que eliminó $200/mes por usuario en costos de IA.',
    p3: 'Conozco el ecosistema startup chileno — desde <strong>Platanus</strong> hasta <strong>Startup Chile</strong> — y busco un equipo fundador donde pueda ser dueño de productos, no solo de features. Desarrollo rápido, pienso en sistemas, y estoy construyendo hacia la próxima gran empresa tecnológica de Latinoamérica.',
    downloadCV: 'Descargar CV',
  },
  projects: {
    subtitle: 'Portafolio',
    title: 'Proyectos',
    desc: 'Productos reales para usuarios reales — de open source a fintech a minería.',
  },
  experience: {
    subtitle: 'Carrera',
    title: 'Experiencia',
    desc: 'Experiencia en startups construyendo productos que escalan.',
    items: [
      {
        role: 'Ingeniero de Software Fullstack Intern',
        desc: 'Arquitecté despliegue cross-platform con Expo/EAS y migré el UI de React Native Paper a Tamagui. Reduje costos de IA de $200 a $0 con Cursor Rules. Desplegué APIs serverless en AWS con SST y Pulumi.',
      },
      {
        role: 'Ingeniero de Software (Front-End)',
        desc: 'Construí app de visualización GIS desde cero para una minera global. Backend completo con FastAPI, Django y PostgreSQL. Frontend con React, TypeScript, Vite y Azure DevOps.',
      },
      {
        role: 'Arquitecto de Aplicaciones',
        desc: 'Diseñé plataforma de coevaluación para 1,500+ estudiantes UC con Next.js y React. Migré base de datos en Supabase y reduje tiempo de corrección manual en 60%.',
      },
      {
        role: 'Coordinador General',
        desc: 'Coordiné y gestioné la transmisión en vivo de charlas tecnológicas sobre diversos temas. Lideré equipos, logística y producción de eventos para la comunidad Open Source UC.',
      },
    ],
  },
  skills: {
    subtitle: 'Toolbox',
    title: 'Skills',
  },
  opensource: {
    subtitle: 'Open Source',
    title: 'Building in Public',
    desc: 'Herramientas que he construido y compartido con la comunidad.',
    viewAll: 'Ver todas las contribuciones en GitHub →',
  },
  education: {
    subtitle: 'Formación',
    title: 'Educación',
    items: [
      {
        school: 'Pontificia Universidad Católica de Chile',
        degree: 'Ingeniero Civil de Industrias con diploma en Computación',
        period: '2021 - 2026',
        gpa: '6.19/7.0',
      },
      {
        school: 'Maastricht University',
        degree: 'Liberal Arts and Sciences (Intercambio)',
        period: 'Ago 2024 - Mar 2025',
        note: 'Curso destacado: Advanced Instructional Design',
      },
    ],
  },
  charlas: {
    subtitle: 'Charlas',
    title: 'Hablando en Público',
    desc: 'Charla sobre Functional Web Components con emmy-dom en el ciclo de charlas de Open Source UC.',
  },
  contact: {
    subtitle: 'Construyamos',
    title: 'Hablemos',
    desc: '¿Construyendo algo que importa en Chile? Busco el equipo fundador correcto. Si te mueves rápido y piensas grande, hablemos.',
    btnEmail: 'Enviar Correo',
    btnLinkedin: 'Conectar en LinkedIn →',
  },
  footer: {
    built: 'Hecho con Astro, React & Three.js',
  },
  trustedBy: {
    subtitle: 'Confianza',
    title: 'Empresas que confían en mi trabajo',
  },
  opensourceGH: 'Ver en GitHub →',
  testimonios: {
    subtitle: 'Testimonios',
    title: 'Lo que dicen de mí',
    items: [
      {
        name: 'Jorge Araneda',
        role: 'Tech Lead @ Gosocket | Profesor Diplomado UC | Co-Founder Acofuz',
        text: 'Emma es de las personas que cuando conversas con él te das cuenta que vale la pena. Tiene un gran conocimiento pero comparte su conocimiento con el resto del equipo, enseñando de una manera agradable y clara. Es de las personas que dice que hará algo y realmente lo cumple. Trabajar con él ha sido un placer.',
      },
      {
        name: 'Sofía Schwarzenberg',
        role: 'Technical Product Manager @ NeuralWorks',
        text: 'Emmanuel ha demostrado un muy buen desempeño durante su práctica. Trabaja con autonomía, entrega código de alta calidad y logra abordar tareas complejas. No se limita a implementar lo asignado: toma iniciativa para mejorar el código existente y crear componentes reutilizables que benefician a todo el equipo.',
      },
      {
        name: 'Marcelo Orellana',
        role: 'Head of Tech and Sales @ Acofuz',
        text: 'Trabajar en el frontend de Smartlokus fue muy fácil gracias a lo extensible y ordenado del código base, gracias a Emma.',
      },
      {
        name: 'Alejandro Held',
        role: 'Game Developer & Computer Science Student, PUC',
        text: 'Tuve el privilegio de trabajar con Emmanuel en múltiples contextos exigentes. Destaca su capacidad de traducir requisitos complejos en soluciones sólidas. Su compromiso con la ejecución, liderazgo natural y habilidad para gestionar equipos demuestran que es un profesional extremadamente confiable y proactivo.',
      },
    ],
  },
}

const en = {
  nav: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    opensource: 'Open Source',
    charlas: 'Talks',
    donar: 'Donate',
    contact: 'Contact',
  },
  hero: {
    tagline: 'Product Engineer',
    desc: 'Fullstack product engineer based in Chile.',
    descAccent: ' I build tools that save real money — reduced AI infra costs from $200/user to $0, built platforms serving 1,500+ concurrent users.',
    btnProjects: 'View Projects',
    btnContact: 'Get in Touch',
  },
  about: {
    subtitle: 'About',
    title: 'Builder based in Chile',
    p1: "I'm a product engineer who ships fast and thinks in systems. I've built platforms serving <strong>1,500+ concurrent users</strong>, reduced AI infrastructure costs from <strong>$200/user to $0</strong>, and contributed open source tools with <strong>1,000+ total npm downloads</strong>.",
    p2: 'At <strong>Pontificia Universidad Católica de Chile</strong>, I architected a peer evaluation platform that cut grading time by 60%. At <strong>NeuralWorks</strong>, I led a frontend migration that eliminated $200/month per user in AI tooling costs.',
    p3: 'I know the Chilean startup ecosystem — from <strong>Platanus</strong> to <strong>Startup Chile</strong> — and I\'m looking for a founding team where I can own products, not just features. I ship fast, think in systems, and I\'m building toward the next great LatAm tech company.',
    downloadCV: 'Download CV',
  },
  projects: {
    subtitle: 'Portfolio',
    title: 'Projects',
    desc: 'Real products shipped for real users — from open source to fintech to mining.',
  },
  experience: {
    subtitle: 'Career',
    title: 'Experience',
    desc: 'Startup experience building products that scale.',
    items: [
      {
        role: 'Fullstack Software Engineer Intern',
        desc: 'Architected cross-platform deployment with Expo/EAS and led UI migration from React Native Paper to Tamagui. Reduced AI costs from $200 to $0 using Cursor Rules. Deployed serverless APIs on AWS with SST and Pulumi.',
      },
      {
        role: 'Software Engineer (Front-End)',
        desc: 'Built GIS visualization app from scratch for a global mining company. Complete backend with FastAPI, Django, and PostgreSQL. Frontend with React, TypeScript, Vite, and Azure DevOps.',
      },
      {
        role: 'Application Architect',
        desc: 'Architected peer evaluation platform for 1,500+ UC students using Next.js and React. Managed Supabase database migration and cut manual grading time by 60%.',
      },
      {
        role: 'General Coordinator',
        desc: 'Coordinated and managed live streaming of tech talks on various topics. Led teams, logistics, and event production for the Open Source UC community.',
      },
    ],
  },
  skills: {
    subtitle: 'Toolbox',
    title: 'Skills',
  },
  opensource: {
    subtitle: 'Open Source',
    title: 'Building in Public',
    desc: 'Tools I\'ve built and shared with the community.',
    viewAll: 'View all contributions on GitHub →',
  },
  education: {
    subtitle: 'Education',
    title: 'Education',
    items: [
      {
        school: 'Pontificia Universidad Católica de Chile',
        degree: 'Computer Engineering',
        period: '2021 - 2026',
        gpa: '6.19/7.0',
      },
      {
        school: 'Maastricht University',
        degree: 'Liberal Arts and Sciences (Exchange)',
        period: 'Aug 2024 - Mar 2025',
        note: 'Notable course: Advanced Instructional Design',
      },
    ],
  },
  charlas: {
    subtitle: 'Talks',
    title: 'Speaking in Public',
    desc: 'Talk about Functional Web Components with emmy-dom at the Open Source UC talk series.',
  },
  contact: {
    subtitle: "Let's Build",
    title: 'Get in Touch',
    desc: "Building something in Chile that matters? I'm looking for the right founding team. If you move fast and think big, let's talk.",
    btnEmail: 'Send an Email',
    btnLinkedin: 'Connect on LinkedIn →',
  },
  footer: {
    built: 'Built with Astro, React & Three.js',
  },
  trustedBy: {
    subtitle: 'Trust',
    title: 'Companies That Trust Me',
  },
  opensourceGH: 'View on GitHub →',
  testimonios: {
    subtitle: 'Testimonials',
    title: 'What People Say',
    items: [
      {
        name: 'Jorge Araneda',
        role: 'Tech Lead @ Gosocket | Profesor Diplomado UC | Co-Founder Acofuz',
        text: 'Emma is one of those people that when you talk to him, you realize he is worth it. He has great knowledge but shares it with the rest of the team, teaching in a pleasant and clear way. He is the kind of person who says he will do something and actually does it. Working with him has been a pleasure.',
      },
      {
        name: 'Sofía Schwarzenberg',
        role: 'Technical Product Manager @ NeuralWorks',
        text: 'Emmanuel demonstrated very good performance during his internship. He works autonomously, delivers high-quality code, and tackles complex tasks. He does not limit himself to implementing what is assigned: he takes initiative to improve existing code and create reusable components that benefit the entire team.',
      },
      {
        name: 'Marcelo Orellana',
        role: 'Head of Tech and Sales @ Acofuz',
        text: 'Working on the Smartlokus frontend was very easy thanks to how extensible and clean the codebase was, thanks to Emma.',
      },
      {
        name: 'Alejandro Held',
        role: 'Game Developer & Computer Science Student, PUC',
        text: 'I had the privilege of working with Emmanuel in multiple demanding contexts. His ability to translate complex requirements into solid, well-structured solutions stands out. His commitment to execution, natural leadership, and ability to manage teams prove he is an extremely reliable and proactive professional.',
      },
    ],
  },
}

const donateEs = {
  subtitle: 'Apoya mi trabajo',
  title: 'Invítame un café',
  desc: 'Si mi trabajo te ha sido útil, considera hacer una donación. Los fondos ayudan a mantener mis proyectos open source y a crear más herramientas gratuitas.',
  buda: 'Donar con Buda (cripto en Chile)',
  budaDesc: 'Recibe al instante, sin comisiones. Solo necesitas una cuenta Buda.',
  thanks: 'Gracias por tu apoyo!',
}

const donateEn = {
  subtitle: 'Support my work',
  title: 'Buy Me a Coffee',
  desc: 'If my work has been useful to you, consider making a donation. Funds help maintain my open source projects and create more free tools.',
  buda: 'Donate with Buda (crypto in Chile)',
  budaDesc: 'Instant, no fees. You just need a Buda account.',
  thanks: 'Thank you for your support!',
}

export { es, en, donateEs, donateEn }
