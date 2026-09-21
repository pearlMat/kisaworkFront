import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const en = {
  nav: {
    services: 'Services',
    about: 'About',
    howItWorks: 'How It Works',
    contact: 'Contact',
    bookCta: 'Book a Consultation',
  },
  footer: {
    tagline:
      'Professional consulting services for individuals and families navigating counseling, social, and student visa needs.',
    services: 'Services',
    company: 'Company',
    copyright: '© {{year}} KISA Work Solutions. All rights reserved.',
    links: {
      counseling: 'Individual Counseling',
      social: 'Social Consulting',
      visa: 'Student Visa',
      about: 'About Us',
      hiw: 'How It Works',
      contact: 'Contact',
      book: 'Book a Consultation',
    },
  },
  home: {
    hero: {
      title1: 'Expert Consulting for a',
      title2: 'Better Future',
      subtitle:
        'KISA Work Solutions offers professional counseling, social consulting, and student visa support to help you reach your goals with clarity and confidence.',
      bookCta: 'Book a Consultation',
      servicesCta: 'Our Services',
    },
    offer: {
      heading: 'What We Offer',
      sub: 'Tailored services designed around your needs.',
      learnMore: 'Learn more',
    },
    steps: {
      heading: 'How It Works',
      sub: 'Three simple steps to get started.',
      seeAll: 'See the full process',
    },
    cta: {
      heading: 'Ready to Take the Next Step?',
      sub: 'Book a consultation today and speak with one of our experienced consultants.',
      btn: 'Book Now',
    },
    services: {
      counseling: {
        title: 'Individual Counseling',
        desc: 'Personalised guidance to help you navigate life transitions, personal challenges, and professional growth.',
      },
      social: {
        title: 'Social Consulting',
        desc: 'Expert advice on social integration, community engagement, and building meaningful connections.',
      },
      visa: {
        title: 'Student Visa',
        desc: 'Comprehensive informational support for students pursuing education abroad.',
      },
    },
    howSteps: {
      s1: { title: 'Book a Consultation', desc: 'Choose a service and pick a date that works for you.' },
      s2: { title: 'Meet Your Consultant', desc: 'Connect with one of our experienced professionals.' },
      s3: { title: 'Get Your Plan', desc: 'Receive a tailored action plan to move forward with confidence.' },
    },
  },
  about: {
    hero: {
      title: 'About KISA Work Solutions',
      sub: 'A dedicated team of professionals committed to your success.',
    },
    mission: {
      heading: 'Our Mission',
      body: 'KISA Work Solutions was founded to bridge the gap between individuals seeking guidance and the expert support they deserve. We believe that access to quality consulting should not be a luxury — it should be a resource available to anyone who needs to move forward with clarity and confidence.',
    },
    values: {
      heading: 'Our Values',
      empathy: { title: 'Empathy', desc: 'We listen first and tailor every engagement to the individual.' },
      integrity: { title: 'Integrity', desc: 'Honest, transparent advice — always in your best interest.' },
      excellence: { title: 'Excellence', desc: 'High professional standards in everything we do.' },
      accessibility: { title: 'Accessibility', desc: 'Making expert guidance available to everyone who needs it.' },
    },
    team: {
      heading: 'Meet the Team',
      sub: 'Our team content is managed through the admin CMS.',
    },
    cta: {
      heading: 'Work With Us',
      sub: 'Ready to get started? Book a consultation today.',
      btn: 'Book a Consultation',
    },
  },
  hiw: {
    hero: {
      title: 'How It Works',
      sub: 'Getting started with KISA Work Solutions is simple.',
    },
    steps: {
      s1: {
        title: 'Book a Consultation',
        desc: 'Visit our booking page, choose the service that best fits your needs, and select a date and time. Fill in your details and any relevant notes so we can prepare for your session.',
      },
      s2: {
        title: 'Meet Your Consultant',
        desc: 'At your scheduled time, connect with one of our experienced consultants. We take the time to understand your unique situation before offering any guidance.',
      },
      s3: {
        title: 'Receive Your Plan',
        desc: 'After your session, we provide a clear, actionable plan tailored to your goals — so you always know exactly what to do next.',
      },
    },
    cta: {
      heading: 'Ready to Begin?',
      sub: 'Book your first consultation — it only takes a minute.',
      btn: 'Book Now',
    },
  },
  services: {
    hero: {
      title: 'Our Services',
      sub: 'Professional consulting services tailored to your needs.',
    },
    learnMore: 'Learn more',
    counseling: {
      title: 'Individual Counseling',
      desc: 'One-on-one support to help you work through personal challenges, life transitions, and professional development goals.',
    },
    social: {
      title: 'Social Consulting',
      desc: 'Guidance on social integration, community engagement, cross-cultural communication, and building support networks.',
    },
    visa: {
      title: 'Student Visa',
      desc: 'Informational consulting to help students understand the process of studying abroad and navigating visa documentation.',
    },
  },
  counseling: {
    label: 'Services',
    title: 'Individual Counseling',
    p1: 'Our Individual Counseling service provides personalised, one-on-one support designed to help you navigate life\'s challenges with greater clarity and confidence.',
    p2: 'Whether you\'re facing a career transition, personal difficulties, or looking to develop new strategies for growth, our consultants will work with you to identify your goals and create a practical path forward.',
    included: "What's included",
    items: {
      i1: 'Initial needs assessment',
      i2: 'Personalised action plan',
      i3: 'Follow-up support session',
      i4: 'Resource recommendations',
    },
    book: 'Book a Session',
    back: 'Back to Services',
  },
  social: {
    label: 'Services',
    title: 'Social Consulting',
    p1: 'Our Social Consulting service helps individuals and families navigate social environments, build community connections, and develop the interpersonal skills needed to thrive.',
    p2: 'From cross-cultural communication to community integration, we provide evidence-informed guidance that empowers you to build meaningful relationships and support networks.',
    areas: 'Areas we cover',
    items: {
      i1: 'Social integration and adaptation',
      i2: 'Cross-cultural communication',
      i3: 'Community engagement strategies',
      i4: 'Conflict resolution and mediation',
    },
    book: 'Book a Session',
    back: 'Back to Services',
  },
  visa: {
    label: 'Services',
    title: 'Student Visa Consulting',
    disclaimer: {
      prefix: 'Important: ',
      body: 'KISA Work Solutions provides consulting and informational support only and does not offer legal representation.',
    },
    p1: 'Navigating the student visa process can feel overwhelming. Our consultants provide clear, up-to-date informational guidance to help you understand your options and prepare your application with confidence.',
    p2: 'We cover a wide range of student visa pathways across multiple destination countries, helping you understand requirements, timelines, and documentation needs.',
    helpWith: 'What we help with',
    items: {
      i1: 'Understanding visa types and eligibility',
      i2: 'Documentation checklist and preparation',
      i3: 'Application timeline planning',
      i4: 'Frequently asked questions and common pitfalls',
    },
    book: 'Book a Session',
    back: 'Back to Services',
  },
  book: {
    hero: {
      title: 'Book a Consultation',
      sub: "Fill in the form below and we'll confirm your appointment.",
    },
    fields: {
      service: 'Service',
      serviceRequired: 'Service *',
      servicePlaceholder: 'Select a service…',
      date: 'Preferred Date & Time *',
      name: 'Full Name *',
      namePlaceholder: 'Jane Doe',
      email: 'Email *',
      emailPlaceholder: 'you@email.com',
      phone: 'Phone (optional)',
      phonePlaceholder: '+1 555 000 0000',
      notes: 'Message / Notes (optional)',
      notesPlaceholder: 'Anything we should know before the session…',
      attachments: 'Attachments (optional)',
    },
    options: {
      counseling: 'Individual Counseling',
      social: 'Social Consulting',
      visa: 'Student Visa',
    },
    errors: {
      service: 'Please select a service.',
      date: 'Please choose a date and time.',
      name: 'Full name is required.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Enter a valid email address.',
    },
    submit: 'Request Booking',
    submitting: 'Submitting…',
    toast: {
      success: "Booking submitted! We'll confirm your appointment shortly.",
      error: 'Something went wrong. Please try again.',
    },
  },
  contact: {
    hero: {
      title: 'Contact Us',
      sub: "We'd love to hear from you.",
    },
    form: {
      heading: 'Send a Message',
      name: 'Name',
      namePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      subject: 'Subject',
      subjectPlaceholder: 'How can we help?',
      message: 'Message',
      messagePlaceholder: 'Tell us more…',
      attachments: 'Attachments (optional)',
      send: 'Send Message',
      sending: 'Sending…',
    },
    info: {
      heading: 'Get in Touch',
      email: 'Email',
      phone: 'Phone',
      hours: 'Office Hours',
      hoursValue: 'Monday – Friday, 9 am – 5 pm',
      mapPlaceholder: 'Map embed — configure in admin settings',
    },
    toast: {
      success: "Message sent! We'll get back to you soon.",
      error: 'Something went wrong. Please try again.',
    },
  },
}

const de: typeof en = {
  nav: {
    services: 'Leistungen',
    about: 'Über uns',
    howItWorks: 'Wie es funktioniert',
    contact: 'Kontakt',
    bookCta: 'Beratung buchen',
  },
  footer: {
    tagline:
      'Professionelle Beratungsleistungen für Einzelpersonen und Familien bei Beratungs-, Sozial- und Studentenvisa-Angelegenheiten.',
    services: 'Leistungen',
    company: 'Unternehmen',
    copyright: '© {{year}} KISA Work Solutions. Alle Rechte vorbehalten.',
    links: {
      counseling: 'Individuelle Beratung',
      social: 'Soziale Beratung',
      visa: 'Studentenvisum',
      about: 'Über uns',
      hiw: 'Wie es funktioniert',
      contact: 'Kontakt',
      book: 'Beratung buchen',
    },
  },
  home: {
    hero: {
      title1: 'Professionelle Beratung für eine',
      title2: 'bessere Zukunft',
      subtitle:
        'KISA Work Solutions bietet professionelle Beratung, soziale Konsultation und Unterstützung bei Studentenvisa, um Ihnen zu helfen, Ihre Ziele mit Klarheit und Selbstvertrauen zu erreichen.',
      bookCta: 'Beratung buchen',
      servicesCta: 'Unsere Leistungen',
    },
    offer: {
      heading: 'Was wir anbieten',
      sub: 'Maßgeschneiderte Leistungen für Ihre Bedürfnisse.',
      learnMore: 'Mehr erfahren',
    },
    steps: {
      heading: 'Wie es funktioniert',
      sub: 'Drei einfache Schritte für den Einstieg.',
      seeAll: 'Vollständigen Prozess ansehen',
    },
    cta: {
      heading: 'Bereit für den nächsten Schritt?',
      sub: 'Buchen Sie noch heute eine Beratung und sprechen Sie mit einem unserer erfahrenen Berater.',
      btn: 'Jetzt buchen',
    },
    services: {
      counseling: {
        title: 'Individuelle Beratung',
        desc: 'Persönliche Begleitung für Lebensübergänge, persönliche Herausforderungen und berufliche Weiterentwicklung.',
      },
      social: {
        title: 'Soziale Beratung',
        desc: 'Fachkundige Beratung zu sozialer Integration, Gemeinschaftsengagement und dem Aufbau bedeutungsvoller Verbindungen.',
      },
      visa: {
        title: 'Studentenvisum',
        desc: 'Umfassende Informationsunterstützung für Studierende, die eine Ausbildung im Ausland anstreben.',
      },
    },
    howSteps: {
      s1: { title: 'Beratung buchen', desc: 'Wählen Sie einen Service und ein passendes Datum.' },
      s2: { title: 'Treffen Sie Ihren Berater', desc: 'Verbinden Sie sich mit einem unserer erfahrenen Fachleute.' },
      s3: { title: 'Erhalten Sie Ihren Plan', desc: 'Erhalten Sie einen maßgeschneiderten Aktionsplan, um sicher voranzuschreiten.' },
    },
  },
  about: {
    hero: {
      title: 'Über KISA Work Solutions',
      sub: 'Ein engagiertes Team von Fachleuten, das sich Ihrem Erfolg widmet.',
    },
    mission: {
      heading: 'Unsere Mission',
      body: 'KISA Work Solutions wurde gegründet, um die Lücke zwischen Einzelpersonen, die Orientierung suchen, und der fachkundigen Unterstützung, die sie verdienen, zu schließen. Wir glauben, dass der Zugang zu qualitativ hochwertiger Beratung kein Luxus sein sollte – es sollte eine Ressource sein, die jedem zur Verfügung steht, der mit Klarheit und Selbstvertrauen vorankommen möchte.',
    },
    values: {
      heading: 'Unsere Werte',
      empathy: { title: 'Empathie', desc: 'Wir hören zuerst zu und passen jede Zusammenarbeit an den Einzelnen an.' },
      integrity: { title: 'Integrität', desc: 'Ehrliche, transparente Beratung – immer in Ihrem besten Interesse.' },
      excellence: { title: 'Exzellenz', desc: 'Hohe professionelle Standards in allem, was wir tun.' },
      accessibility: { title: 'Zugänglichkeit', desc: 'Fachkundige Beratung für jeden zugänglich machen, der sie benötigt.' },
    },
    team: {
      heading: 'Das Team',
      sub: 'Unser Teaminhalt wird über das Admin-CMS verwaltet.',
    },
    cta: {
      heading: 'Arbeiten Sie mit uns',
      sub: 'Bereit loszulegen? Buchen Sie noch heute eine Beratung.',
      btn: 'Beratung buchen',
    },
  },
  hiw: {
    hero: {
      title: 'Wie es funktioniert',
      sub: 'Der Einstieg bei KISA Work Solutions ist einfach.',
    },
    steps: {
      s1: {
        title: 'Beratung buchen',
        desc: 'Besuchen Sie unsere Buchungsseite, wählen Sie den Service, der am besten zu Ihren Bedürfnissen passt, und wählen Sie Datum und Uhrzeit. Geben Sie Ihre Daten und relevante Anmerkungen ein, damit wir uns auf Ihre Sitzung vorbereiten können.',
      },
      s2: {
        title: 'Treffen Sie Ihren Berater',
        desc: 'Verbinden Sie sich zum vereinbarten Zeitpunkt mit einem unserer erfahrenen Berater. Wir nehmen uns Zeit, Ihre individuelle Situation zu verstehen, bevor wir Ratschläge geben.',
      },
      s3: {
        title: 'Erhalten Sie Ihren Plan',
        desc: 'Nach Ihrer Sitzung erhalten Sie einen klaren, umsetzbaren Plan, der auf Ihre Ziele zugeschnitten ist – damit Sie immer genau wissen, was als Nächstes zu tun ist.',
      },
    },
    cta: {
      heading: 'Bereit anzufangen?',
      sub: 'Buchen Sie Ihre erste Beratung – es dauert nur eine Minute.',
      btn: 'Jetzt buchen',
    },
  },
  services: {
    hero: {
      title: 'Unsere Leistungen',
      sub: 'Professionelle Beratungsleistungen, maßgeschneidert für Ihre Bedürfnisse.',
    },
    learnMore: 'Mehr erfahren',
    counseling: {
      title: 'Individuelle Beratung',
      desc: 'Persönliche Einzelunterstützung bei persönlichen Herausforderungen, Lebensübergängen und beruflichen Entwicklungszielen.',
    },
    social: {
      title: 'Soziale Beratung',
      desc: 'Beratung zu sozialer Integration, Gemeinschaftsengagement, interkultureller Kommunikation und dem Aufbau von Unterstützungsnetzwerken.',
    },
    visa: {
      title: 'Studentenvisum',
      desc: 'Informationsberatung, die Studierenden hilft, den Prozess des Auslandsstudiums und die Visadokumentation zu verstehen.',
    },
  },
  counseling: {
    label: 'Leistungen',
    title: 'Individuelle Beratung',
    p1: 'Unser individueller Beratungsservice bietet persönliche Einzelunterstützung, die Ihnen hilft, die Herausforderungen des Lebens mit mehr Klarheit und Selbstvertrauen zu meistern.',
    p2: 'Ob Sie vor einer beruflichen Veränderung stehen, persönliche Schwierigkeiten haben oder neue Wachstumsstrategien entwickeln möchten – unsere Berater arbeiten mit Ihnen zusammen, um Ihre Ziele zu identifizieren und einen praktischen Weg vorwärts zu schaffen.',
    included: 'Was enthalten ist',
    items: {
      i1: 'Erstbedarfsermittlung',
      i2: 'Persönlicher Aktionsplan',
      i3: 'Nachfolgende Unterstützungssitzung',
      i4: 'Ressourcenempfehlungen',
    },
    book: 'Sitzung buchen',
    back: 'Zurück zu Leistungen',
  },
  social: {
    label: 'Leistungen',
    title: 'Soziale Beratung',
    p1: 'Unser sozialer Beratungsservice hilft Einzelpersonen und Familien dabei, soziale Umgebungen zu navigieren, Gemeinschaftsverbindungen aufzubauen und die zwischenmenschlichen Fähigkeiten zu entwickeln, die für das Gedeihen erforderlich sind.',
    p2: 'Von interkultureller Kommunikation bis hin zur Gemeinschaftsintegration bieten wir evidenzbasierte Beratung, die Sie befähigt, bedeutungsvolle Beziehungen und Unterstützungsnetzwerke aufzubauen.',
    areas: 'Bereiche, die wir abdecken',
    items: {
      i1: 'Soziale Integration und Anpassung',
      i2: 'Interkulturelle Kommunikation',
      i3: 'Strategien für Gemeinschaftsengagement',
      i4: 'Konfliktlösung und Mediation',
    },
    book: 'Sitzung buchen',
    back: 'Zurück zu Leistungen',
  },
  visa: {
    label: 'Leistungen',
    title: 'Studentenvisum-Beratung',
    disclaimer: {
      prefix: 'Wichtig: ',
      body: 'KISA Work Solutions bietet ausschließlich Beratungs- und Informationsunterstützung an und bietet keine rechtliche Vertretung.',
    },
    p1: 'Der Studienvisum-Prozess kann überwältigend erscheinen. Unsere Berater bieten klare, aktuelle Informationsberatung, um Ihnen zu helfen, Ihre Optionen zu verstehen und Ihren Antrag mit Sicherheit vorzubereiten.',
    p2: 'Wir decken eine breite Palette von Studienvisum-Wegen in verschiedenen Zielländern ab und helfen Ihnen, Anforderungen, Zeitpläne und Dokumentationsanforderungen zu verstehen.',
    helpWith: 'Womit wir helfen',
    items: {
      i1: 'Verstehen von Visatypen und Anspruchsberechtigung',
      i2: 'Dokumentencheckliste und Vorbereitung',
      i3: 'Planung des Antragszeitplans',
      i4: 'Häufig gestellte Fragen und häufige Fallstricke',
    },
    book: 'Sitzung buchen',
    back: 'Zurück zu Leistungen',
  },
  book: {
    hero: {
      title: 'Beratung buchen',
      sub: 'Füllen Sie das untenstehende Formular aus und wir bestätigen Ihren Termin.',
    },
    fields: {
      service: 'Leistung',
      serviceRequired: 'Leistung *',
      servicePlaceholder: 'Leistung auswählen…',
      date: 'Bevorzugtes Datum und Uhrzeit *',
      name: 'Vollständiger Name *',
      namePlaceholder: 'Max Mustermann',
      email: 'E-Mail *',
      emailPlaceholder: 'sie@email.com',
      phone: 'Telefon (optional)',
      phonePlaceholder: '+49 30 000 00000',
      notes: 'Nachricht / Anmerkungen (optional)',
      notesPlaceholder: 'Was wir vor der Sitzung wissen sollten…',
      attachments: 'Anhänge (optional)',
    },
    options: {
      counseling: 'Individuelle Beratung',
      social: 'Soziale Beratung',
      visa: 'Studentenvisum',
    },
    errors: {
      service: 'Bitte wählen Sie einen Service aus.',
      date: 'Bitte wählen Sie ein Datum und eine Uhrzeit.',
      name: 'Vollständiger Name ist erforderlich.',
      emailRequired: 'E-Mail ist erforderlich.',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    },
    submit: 'Buchung anfragen',
    submitting: 'Wird gesendet…',
    toast: {
      success: 'Buchung eingereicht! Wir werden Ihren Termin in Kürze bestätigen.',
      error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    },
  },
  contact: {
    hero: {
      title: 'Kontakt',
      sub: 'Wir freuen uns von Ihnen zu hören.',
    },
    form: {
      heading: 'Nachricht senden',
      name: 'Name',
      namePlaceholder: 'Ihr vollständiger Name',
      email: 'E-Mail',
      emailPlaceholder: 'ihre@email.com',
      subject: 'Betreff',
      subjectPlaceholder: 'Wie können wir helfen?',
      message: 'Nachricht',
      messagePlaceholder: 'Erzählen Sie uns mehr…',
      attachments: 'Anhänge (optional)',
      send: 'Nachricht senden',
      sending: 'Wird gesendet…',
    },
    info: {
      heading: 'Kontakt aufnehmen',
      email: 'E-Mail',
      phone: 'Telefon',
      hours: 'Bürozeiten',
      hoursValue: 'Montag – Freitag, 9–17 Uhr',
      mapPlaceholder: 'Karteneinbettung – in den Admin-Einstellungen konfigurieren',
    },
    toast: {
      success: 'Nachricht gesendet! Wir melden uns in Kürze bei Ihnen.',
      error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, de: { translation: de } },
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
