export type AdvisorLang = 'tr' | 'de' | 'en' | 'es';

export type PersonalAdvisor = {
  id: 'elif' | 'lara' | 'emir';
  name: string;
  photo: string;
  spoken: string[];
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  role: Record<AdvisorLang, string>;
  bubble: Record<AdvisorLang, string>;
  personalLine: Record<AdvisorLang, string>;
};

/** CHECK24 tarzı kişisel danışmanlar — varsayılan: tr→emir, de/en→elif, es→lara */
export const PERSONAL_ADVISORS: PersonalAdvisor[] = [
  {
    id: 'elif',
    name: 'Elif',
    photo: '/images/help/elif.jpg',
    spoken: ['English', 'German'],
    phoneDisplay: '+49 421 4851 7985',
    phoneHref: 'tel:+4942148517985',
    whatsappHref: 'https://wa.me/4915203823792',
    role: {
      tr: 'Campus German danışmanı',
      de: 'Campus German Beraterin',
      en: 'Campus German advisor',
      es: 'Asesora de Campus German',
    },
    bubble: {
      tr: 'Kurs ve vize sorularında size kişisel olarak yardımcı olurum.',
      de: 'Ich berate Sie persönlich zu Kurs und Visum.',
      en: 'I am happy to help you personally with course and visa questions.',
      es: 'Le ayudo personalmente con el curso y el visado.',
    },
    personalLine: {
      tr: 'Sizin için kişisel olarak buradayım',
      de: 'Ich bin persönlich für Sie da',
      en: 'I am here for you personally',
      es: 'Estoy aquí para usted personalmente',
    },
  },
  {
    id: 'lara',
    name: 'Lara',
    photo: '/images/help/lara.jpg',
    spoken: ['Spanish', 'English'],
    phoneDisplay: '+49 421 4851 7985',
    phoneHref: 'tel:+4942148517985',
    whatsappHref: 'https://wa.me/4915203823792',
    role: {
      tr: 'Campus German danışmanı',
      de: 'Campus German Beraterin',
      en: 'Campus German advisor',
      es: 'Asesora de Campus German',
    },
    bubble: {
      tr: 'İspanyolca veya İngilizce danışmanlık için yazın — birlikte planlarız.',
      de: 'Beratung auf Spanisch oder Englisch — wir planen gemeinsam.',
      en: 'Reach out in Spanish or English — we will plan together.',
      es: 'Escríbame en español o inglés — planificamos juntos.',
    },
    personalLine: {
      tr: 'Sizin için kişisel olarak buradayım',
      de: 'Ich bin persönlich für Sie da',
      en: 'I am here for you personally',
      es: 'Estoy aquí para usted personalmente',
    },
  },
  {
    id: 'emir',
    name: 'Emir',
    photo: '/images/help/emir.jpg',
    spoken: ['Türkçe'],
    phoneDisplay: '+49 421 4851 7985',
    phoneHref: 'tel:+4942148517985',
    whatsappHref: 'https://wa.me/4915203823792',
    role: {
      tr: 'Campus German danışmanı',
      de: 'Campus German Berater',
      en: 'Campus German advisor',
      es: 'Asesor de Campus German',
    },
    bubble: {
      tr: 'Türkçe olarak kurs seçimi ve kayıt sürecinde yanınızdayım.',
      de: 'Ich begleite Sie auf Türkisch bei Kurswahl und Anmeldung.',
      en: 'I support you in Turkish with course choice and enrolment.',
      es: 'Le acompaño en turco en la elección del curso y la inscripción.',
    },
    personalLine: {
      tr: 'Sizin için kişisel olarak buradayım',
      de: 'Ich bin persönlich für Sie da',
      en: 'I am here for you personally',
      es: 'Estoy aquí para usted personalmente',
    },
  },
];

export function defaultAdvisorIdForLang(lang: string): PersonalAdvisor['id'] {
  if (lang === 'tr') return 'emir';
  if (lang === 'es') return 'lara';
  return 'elif';
}

export function getAdvisorById(id: string): PersonalAdvisor | undefined {
  return PERSONAL_ADVISORS.find((a) => a.id === id);
}
