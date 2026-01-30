// Canonical RAG Context for Cyrus Khiabani's Portfolio Chatbot
// Last Updated: January 2025

export const PORTFOLIO_CONTEXT = `
# Cyrus Khiabani — Portfolio Context

## Identity & Philosophy

I am a systems-driven software developer focused on usefulness, correctness, and reality. I build tools that remove friction, surface truth, and respect constraints. I reject performative tech, shallow abstractions, and cleverness without utility.

Programming is not a career pivot—it is a convergence of how I think, learn, and solve problems. I would do this work without financial incentive.

### Builder Priorities (In Order)
1. **Usefulness** — solves a real problem
2. **Correctness** — works reliably and reflects reality
3. **Speed** — matters only after the first two

### What Discipline Means to Me
Discipline means showing up every day, working hard, learning obsessively, and doing the right thing. I live clean: no drinking, no smoking, daily exercise. I work on my craft continuously.

Zero tolerance for dishonesty, shortcuts, laziness, self-absorption, and needy behavior.

---

## Technical Profile

### Core Technologies
- **Languages**: TypeScript, JavaScript, Python, Go, SQL, HTML/CSS
- **Frontend**: React 19, Next.js 14+, TanStack Router, TanStack Query, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Fastify, Express.js, Go HTTP servers
- **Databases**: PostgreSQL, Drizzle ORM, Prisma, MongoDB
- **AI/ML Integration**: Claude API, OpenAI API, MCP Protocol, LangChain, Vector Embeddings, Pinecone
- **Auth & Security**: OAuth2, JWT, Clerk, HIPAA-compliant data handling
- **Tools**: Git, Docker, Vite, Vercel, GitHub Actions, Zod validation

### Specialized Expertise
- **Model Context Protocol (MCP)**: Production MCP server development for Claude Desktop integration
- **Healthcare APIs**: Dexcom CGM integration, real-time glucose monitoring systems
- **Construction Tech**: TSheets/QuickBooks Time API, Sage 100 Contractor formatting
- **Workflow Automation**: AI-powered document processing, automated reporting pipelines

---

## Featured Projects

### Personal Diabetes AI Tracker (Flagship Project)
Experimental system integrating Dexcom CGM data via OAuth with activity tracking (Peloton), nutrition logging, and insulin formulas. Uses AI to reason about glucose behavior holistically—correlating meals, exercise, stress, and medication timing.

Never publicly deployed due to sensitive health data. Built for personal precision and learning.

**Why it matters**: This reflects how I think—systems, feedback, reality, accountability. Managing Type 1 diabetes since age 2 means I understand what it takes to build tools that must work reliably, every single day.

**Tech**: Next.js, TypeScript, Fastify, PostgreSQL, Prisma, Dexcom API, OpenAI GPT-4o, Pinecone vector store

---

### TSheets MCP Server (Production)
MCP server enabling Claude AI to interact with QuickBooks Time API. Automates timesheet extraction with OAuth2 authentication, type-safe Zod validation, and intelligent job notes processing.

Eliminated approximately 6 hours of weekly manual data entry. Aggregates, formats, and groups field notes for Sage 100 Contractor billing. Reduced errors and removed administrative drag from real construction workflows.

**What used to take 30 minutes now takes 5.**

**Tech**: TypeScript, Node.js, MCP Protocol, OAuth2, Zod, TSheets API, Express.js

**GitHub**: https://github.com/cykj40/Tsheets-MCP

---

### JournalAI
Full-stack journaling platform with AI-powered sentiment analysis. Features real-time autosave rich text editor, mood detection with sentiment scoring (-10 to +10 scale), interactive analytics dashboard, and natural language Q&A over journal history using vector embeddings.

Turns reflection into actionable insight by identifying recurring mood patterns and emotional triggers.

**Tech**: Next.js 14, TypeScript, OpenAI API, LangChain, PostgreSQL, Drizzle ORM, Clerk auth, TipTap editor, Recharts

**GitHub**: https://github.com/cykj40/journal-ai-app
**Live**: https://journal-ai-app-eta.vercel.app

---

### Dexcom MCP Server
OAuth2-enabled MCP server for glucose monitoring data with native Claude Desktop integration. Enables AI assistants to query real-time CGM data, analyze trends, and provide contextual health insights with HIPAA-compliant data handling.

**Tech**: TypeScript, OAuth2, Dexcom API, MCP Protocol

---

### ReelingIt
Full-stack Go web application demonstrating backend template rendering, RESTful routing, and stateful data persistence for movie list management. Built without frontend frameworks to showcase Go's http/template package and HTTP server capabilities.

**Tech**: Go, HTML, CSS, JavaScript, html/template
**GitHub**: https://github.com/cykj40/MovieList
**Live**: https://movie-list-eight-gamma.vercel.app

---

### Fungi Finders
Educational web application for mushroom foraging enthusiasts. Features real-time filtering by season and edibility, interactive mushroom database with detailed identification notes, and custom light/dark theme implementation. Built with semantic HTML and vanilla JavaScript—no framework dependencies.

**Tech**: HTML, CSS, JavaScript, CSS Grid, Flexbox
**GitHub**: https://github.com/cykj40/Fungi-Finders
**Live**: https://fem-class-fungi-finder-wonderfu.netlify.app

---

### Secure Password Generator PWA
Installable Progressive Web App with real-time strength analysis using zxcvbn algorithm. Features customizable generation rules, visual strength meter, and clipboard integration. Offline-first architecture with service worker caching—zero server interaction for complete privacy.

**Tech**: Next.js, TypeScript, PWA, zxcvbn, next-pwa, Tailwind CSS
**GitHub**: https://github.com/cykj40/password-generator
**Live**: https://password-generator-ashy-gamma.vercel.app

---

### Periodic Table Word Speller
Educational tool using recursive algorithms to spell words with chemical element symbols. Features real-time validation and interactive element cards displaying atomic details.

**Tech**: JavaScript, HTML5, CSS3, Recursive Algorithms
**GitHub**: https://github.com/cykj40/periodic-table-name-finder
**Live**: https://periodic-table-name-finder.vercel.app

---

## Professional Experience

### Long & DeLosa Construction Group | Brooklyn, NY
**Technical Project Manager** | February 2020 – Present

- **MCP Server Development**: Built production QuickBooks Time MCP server with OAuth2, reducing manual timesheet processing by 90%
- **AI Integration**: Deployed Claude AI and Claude Code into operations, automating invoice generation and document processing
- **Full-Stack Automation**: Developed type-safe tools with TypeScript, Zod validation, and PostgreSQL for construction workflow automation
- **Platform Administration**: Manage Bluebeam and Procore Technologies for 50+ users
- **Process Engineering**: Created Excel/VBA macros reducing billing tasks from 30 to 5 minutes; designed LLM pipelines converting field notes to client reports

---

## Education & Continuous Learning

### Frontend Masters | 2023 – Present
459+ hours covering React, Next.js, Node.js, PostgreSQL, algorithms, system design, and performance optimization.

### Rutgers University Coding Bootcamp | 2022 – 2023
Full-stack development, MERN stack, RESTful services, Git workflows, testing methodologies.

### Santa Monica College | 2018 – 2020
Associate of Science, General Sciences. Mathematics through Calculus I, Chemistry, Biology, C++ fundamentals.

### Certifications
- IBM Web Development Professional Certificate
- Procore Technologies: Project Management, Field Productivity
- DeepLearning.ai: Open Source Models (Hugging Face), Knowledge Graphs for RAG
- Kaggle: Python, Machine Learning, Pandas, Intermediate ML
- FreeCodeCamp: JavaScript Algorithms & Data Structures, Front End Development Libraries

---

## Life Timeline & Formation

### Early Life
- Born in Glen Cove, raised in Staten Island
- Diagnosed with Type 1 diabetes at age 2—managing a chronic condition from childhood shaped my relationship with systems, discipline, and accountability
- Highly independent from childhood
- Early attraction to technology: Super Mario Bros., The Legend of Zelda, Mike Tyson's Punch-Out!!, Atari
- Comfortable with DOS, files, commands, and executables from a young age
- Watched my uncle (a programmer) run games by launching .exe files—software was explicit, mechanical, and understandable

### Education & Athletics
- **Staten Island Academy**: Strong aptitude in science; excelled in soccer (frequently scored multiple goals per game), played basketball
- **St. Peter's Boys High School**: High-discipline environment; continued athletics

Sports provided structure and feedback long before academics did.

### Early Career
- Brief college, then prioritized experience
- Worked as a stockbroker—learned how markets actually behave; developed skepticism toward narratives detached from incentives

### California Years (2011–2021)
- Lived in Los Angeles (Sawtelle, Little Tokyo)
- Met Violetta (together 11 years)
- Traded stocks and crypto
- Daily running along the beach; fitness at Equinox
- Regular travel to Mendocino, Lake Tahoe, Utah, Montana, Wyoming, Idaho

Nature, endurance, and solitude became essential for clarity.

### Turning Point (Age 33)
Everything changed:
- Met Violetta
- Stopped drinking entirely
- Committed to disciplined learning
- Enrolled at Santa Monica College
- A counseling course identified a strong aptitude for science
- Learning became obsessive

### Science → Programming Convergence
- Pursued chemistry seriously after returning to New Jersey
- Accepted to Rutgers University for chemistry; chose not to enroll
- Attended a coding bootcamp instead
- Programming clicked immediately: precision, logic, feedback loops, real consequences
- Fully committed since

This was selection, not avoidance.

---

## Personal

### Location
Based in New Jersey (Jersey Shore area). Work in Brooklyn.

### Health & Fitness
- Type 1 diabetic since age 2—this isn't a limitation, it's context for why I care about reliable systems
- Daily exercise: running, weightlifting, yoga
- Live clean: no drinking, no smoking

### Interests
- **Nature**: Hiking, backpacking, forest exploration
- **Montana**: Wide-open landscapes represent clarity, restraint, and reality. Montana embodies the opposite of noise-driven tech culture—space to think and build.
- **Long-term aspiration**: A home with a barn/workshop to prototype software and hardware. Space, autonomy, deep work.

### Relationship
With Violetta for 11 years. She's been part of my transformation and growth.

---

## What I'm Looking For

- Real problems, real feedback
- Competence over performance
- Systems with accountability
- Teams that value clarity and discipline
- Roles in AI engineering, full-stack development, or automation architecture

---

## Services I Offer

### Full-Stack Development
End-to-end web application development with React, TypeScript, Node.js, and modern frameworks. Clean, maintainable code that scales.

### AI Integration & Automation
Production-grade AI systems—chatbots, agents, and MCP servers—using Claude and OpenAI APIs to automate real workflows.

### Operations & Business Systems Integration
Custom integrations between time tracking, billing, and internal systems. Automate reporting and reduce operational overhead.

### Software Modernization
Modernizing legacy codebases and translating systems between languages and stacks. Java → TypeScript conversions, API refactoring, architecture simplification.

---

## Contact Information

- **Email**: cyrus@cyruskhiabani.com
- **GitHub**: https://github.com/cykj40
- **LinkedIn**: https://www.linkedin.com/in/cyrus-jalili-khiabani-44605b163
- **Location**: New Jersey Shore, USA

---

## The Impression I Want to Leave

This person:
- Builds real systems
- Thinks long-term
- Respects reality
- Takes responsibility
- Does not posture

I am not looking to impress anyone with buzzwords or inflated claims. I build things that work, solve real problems, and stand up to scrutiny. If that resonates with you, let's talk.
`;

// System prompt for the AI assistant
export const CHAT_SYSTEM_PROMPT = `You are the AI assistant on Cyrus Khiabani's portfolio website. Your role is to help visitors learn about Cyrus's skills, projects, experience, and values.

PERSONALITY & TONE:
- Direct and honest, like Cyrus himself
- No corporate speak or empty phrases
- Concise but thorough when detail matters
- Friendly but not performative
- Respect the visitor's time

KNOWLEDGE BASE:
You have access to comprehensive information about Cyrus including:
- Technical skills and projects
- Work experience and education
- Personal philosophy and values
- Life story and background
- Contact information

GUIDELINES:
1. Answer questions accurately based on the portfolio context
2. If asked about something not covered, say so honestly
3. For technical questions, be specific about technologies and approaches
4. Share relevant project examples when they illustrate a point
5. If someone asks about hiring or working together, encourage them to reach out via email
6. Don't make up information—stick to what's documented
7. You can share personal details Cyrus has chosen to make public (like his interests in nature, Montana, fitness)
8. Be proud of the work but not boastful—let the projects speak for themselves

TOPICS TO HANDLE WELL:
- "What does Cyrus do?" → Full-stack developer, AI automation specialist, MCP server development
- "What projects has he built?" → Diabetes AI Tracker, TSheets MCP, JournalAI, etc.
- "What's his background?" → Self-taught, bootcamp, continuous learning, former stockbroker
- "Why should I hire him?" → Real systems, real results, discipline, accountability
- "What's he looking for?" → Real problems, competent teams, systems with accountability

If asked about topics completely unrelated to Cyrus or his work, politely redirect:
"I'm here to help you learn about Cyrus's work and experience. Is there something specific about his projects or skills I can help with?"

Remember: Cyrus values authenticity over performance. Represent him accurately.`;

// Quick facts for fast retrieval
export const QUICK_FACTS = {
  name: "Cyrus Khiabani",
  title: "Full-Stack Developer & AI Automation Specialist",
  location: "New Jersey Shore, USA",
  workLocation: "Brooklyn, NY",
  email: "cyrus@cyruskhiabani.com",
  github: "https://github.com/cykj40",
  linkedin: "https://www.linkedin.com/in/cyrus-jalili-khiabani-44605b163",

  coreLanguages: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
  frontendStack: ["React 19", "Next.js", "TanStack Router", "TanStack Query", "Tailwind CSS", "Framer Motion"],
  backendStack: ["Node.js", "Fastify", "Express.js", "Go", "PostgreSQL", "Drizzle ORM"],
  aiStack: ["Claude API", "OpenAI API", "MCP Protocol", "LangChain", "Pinecone"],

  flagshipProject: "Personal Diabetes AI Tracker",
  productionProject: "TSheets MCP Server",

  currentRole: "Technical Project Manager at Long & DeLosa Construction Group",
  yearsInRole: "Since February 2020",

  education: [
    "Frontend Masters (459+ hours)",
    "Rutgers Coding Bootcamp (2022-2023)",
    "Santa Monica College (Associate of Science)"
  ],

  interests: ["Hiking", "Montana", "Running", "Weightlifting", "Yoga", "Nature"],

  values: ["Usefulness", "Correctness", "Discipline", "Authenticity", "Accountability"]
};
