export type PlacementLang = 'tr' | 'de' | 'en' | 'es';
export type PlacementLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type PlacementOption = {
  id: string;
  text: string;
  correct?: boolean;
};

export type PlacementQuestion = {
  id: string;
  prompt: string;
  options: PlacementOption[];
};

/** 10 soruluk Almanca seviye testi (CEFR kabaca) */
export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'q1',
    prompt: 'Wie heißt du?',
    options: [
      { id: 'a', text: 'Ich heiße Anna.', correct: true },
      { id: 'b', text: 'Ich bin müde.' },
      { id: 'c', text: 'Das ist teuer.' },
      { id: 'd', text: 'Guten Appetit.' },
    ],
  },
  {
    id: 'q2',
    prompt: 'Wo wohnst du?',
    options: [
      { id: 'a', text: 'Ich wohne in Bremen.', correct: true },
      { id: 'b', text: 'Ich esse Brot.' },
      { id: 'c', text: 'Ich spreche langsam.' },
      { id: 'd', text: 'Das Wetter ist schön.' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Was machst du am Wochenende?',
    options: [
      { id: 'a', text: 'Ich treffe Freunde und gehe spazieren.', correct: true },
      { id: 'b', text: 'Ich bin ein Buch.' },
      { id: 'c', text: 'Das Haus ist blau.' },
      { id: 'd', text: 'Drei Euro bitte.' },
    ],
  },
  {
    id: 'q4',
    prompt: 'Welche Form ist richtig?',
    options: [
      { id: 'a', text: 'Er geht jeden Tag zur Arbeit.', correct: true },
      { id: 'b', text: 'Er gehen jeden Tag zur Arbeit.' },
      { id: 'c', text: 'Er gehst jeden Tag zur Arbeit.' },
      { id: 'd', text: 'Er gehe jeder Tag zur Arbeit.' },
    ],
  },
  {
    id: 'q5',
    prompt: 'Was bedeutet „Termin“?',
    options: [
      { id: 'a', text: 'Appointment / randevu', correct: true },
      { id: 'b', text: 'Window / pencere' },
      { id: 'c', text: 'Ticket / bilet' },
      { id: 'd', text: 'Kitchen / mutfak' },
    ],
  },
  {
    id: 'q6',
    prompt: 'Welcher Satz ist korrekt?',
    options: [
      { id: 'a', text: 'Wenn ich Zeit habe, lerne ich Deutsch.', correct: true },
      { id: 'b', text: 'Wenn ich Zeit habe, ich lerne Deutsch.' },
      { id: 'c', text: 'Wenn habe ich Zeit, lerne ich Deutsch.' },
      { id: 'd', text: 'Wenn ich Zeit habe, Deutsch lerne ich.' },
    ],
  },
  {
    id: 'q7',
    prompt: 'Was passt am besten?',
    options: [
      { id: 'a', text: 'Obwohl es regnete, sind wir spazieren gegangen.', correct: true },
      { id: 'b', text: 'Obwohl es regnete, wir sind spazieren gegangen.' },
      { id: 'c', text: 'Obwohl regnete es, sind wir spazieren gegangen.' },
      { id: 'd', text: 'Obwohl es regnete, spazieren gegangen wir.' },
    ],
  },
  {
    id: 'q8',
    prompt: 'Welches Wort fehlt? „Ich freue mich ___ deine Nachricht.“',
    options: [
      { id: 'a', text: 'über', correct: true },
      { id: 'b', text: 'auf' },
      { id: 'c', text: 'mit' },
      { id: 'd', text: 'bei' },
    ],
  },
  {
    id: 'q9',
    prompt: 'Welcher Satz klingt am natürlichsten?',
    options: [
      { id: 'a', text: 'Es wäre besser gewesen, früher anzufangen.', correct: true },
      { id: 'b', text: 'Es wäre besser, früher angefangen gewesen.' },
      { id: 'c', text: 'Es wäre besser gewesen, früher angefangen.' },
      { id: 'd', text: 'Es wäre besser, früher angefangen zu gewesen.' },
    ],
  },
  {
    id: 'q10',
    prompt: 'Was bedeutet der Satz? „Die Ergebnisse lassen sich nur schwer verallgemeinern.“',
    options: [
      { id: 'a', text: 'The results are hard to generalize.', correct: true },
      { id: 'b', text: 'The results are easy to print.' },
      { id: 'c', text: 'The results will arrive tomorrow.' },
      { id: 'd', text: 'The results are not ready yet.' },
    ],
  },
];

export function scoreToLevel(correctCount: number): PlacementLevel {
  if (correctCount <= 2) return 'A1';
  if (correctCount <= 4) return 'A2';
  if (correctCount <= 6) return 'B1';
  if (correctCount <= 8) return 'B2';
  return 'C1';
}

export const placementUi = {
  tr: {
    title: 'Seviyeni Şimdi Ölç - Campus German',
    heroTitle: 'Seviyeni şimdi ölç',
    heroDescription: '10 soruluk kısa testle Almanca seviyeni öğren. Sonucunu görmek için bilgilerini gir, paylaş veya randevu oluştur.',
    quizTitle: 'Seviye testi',
    questionOf: 'Soru {current} / {total}',
    next: 'Sonraki',
    finish: 'Bitir',
    formTitle: 'Sonucunu görmek için bilgilerini gir',
    formSubtitle: 'Sonuç neredeyse hazır — iletişim bilgilerinle sonucu açıp randevu oluşturabilirsin.',
    name: 'Ad Soyad',
    email: 'E-posta',
    phone: 'Telefon',
    privacy: 'Gizlilik Politikasını kabul ediyorum.',
    showResult: 'Sonucumu göster',
    resultTitle: 'Tahmini seviyen',
    resultHint: 'Bu kısa test yönlendiricidir; kesin seviye için danışmanımızla görüşebilirsin.',
    share: 'Sonucu paylaş',
    copied: 'Kopyalandı',
    book: 'Randevu oluştur',
    whatsapp: 'WhatsApp ile sor',
    restart: 'Testi yeniden yap',
    correctLabel: 'Doğru cevap',
    of: '/',
  },
  de: {
    title: 'Niveau jetzt messen - Campus German',
    heroTitle: 'Niveau jetzt messen',
    heroDescription: 'Mit einem kurzen 10-Fragen-Test dein Deutschniveau einschätzen. Für das Ergebnis Kontaktdaten eingeben, teilen oder Termin buchen.',
    quizTitle: 'Einstufungstest',
    questionOf: 'Frage {current} / {total}',
    next: 'Weiter',
    finish: 'Fertig',
    formTitle: 'Kontaktdaten für dein Ergebnis',
    formSubtitle: 'Dein Ergebnis ist fast fertig — öffne es mit deinen Kontaktdaten und buche einen Termin.',
    name: 'Vor- und Nachname',
    email: 'E-Mail',
    phone: 'Telefon',
    privacy: 'Ich akzeptiere die Datenschutzrichtlinie.',
    showResult: 'Ergebnis anzeigen',
    resultTitle: 'Geschätztes Niveau',
    resultHint: 'Dieser Kurztest ist orientierend; für eine genaue Einstufung sprich mit uns.',
    share: 'Ergebnis teilen',
    copied: 'Kopiert',
    book: 'Termin erstellen',
    whatsapp: 'Per WhatsApp fragen',
    restart: 'Test wiederholen',
    correctLabel: 'Richtige Antworten',
    of: '/',
  },
  en: {
    title: 'Check your level now - Campus German',
    heroTitle: 'Check your level now',
    heroDescription: 'Estimate your German level with a short 10-question test. Enter your details to see the result, share it, or book an appointment.',
    quizTitle: 'Level test',
    questionOf: 'Question {current} / {total}',
    next: 'Next',
    finish: 'Finish',
    formTitle: 'Enter your details to see the result',
    formSubtitle: 'Your result is almost ready — unlock it with your contact details and book an appointment.',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    privacy: 'I accept the Privacy Policy.',
    showResult: 'Show my result',
    resultTitle: 'Estimated level',
    resultHint: 'This short test is indicative; talk to us for a precise placement.',
    share: 'Share result',
    copied: 'Copied',
    book: 'Book appointment',
    whatsapp: 'Ask on WhatsApp',
    restart: 'Retake test',
    correctLabel: 'Correct answers',
    of: '/',
  },
  es: {
    title: 'Mide tu nivel ahora - Campus German',
    heroTitle: 'Mide tu nivel ahora',
    heroDescription: 'Estima tu nivel de alemán con un test corto de 10 preguntas. Introduce tus datos para ver el resultado, compartirlo o pedir cita.',
    quizTitle: 'Test de nivel',
    questionOf: 'Pregunta {current} / {total}',
    next: 'Siguiente',
    finish: 'Terminar',
    formTitle: 'Introduce tus datos para ver el resultado',
    formSubtitle: 'Tu resultado está casi listo — ábrelo con tus datos y reserva una cita.',
    name: 'Nombre completo',
    email: 'Email',
    phone: 'Teléfono',
    privacy: 'Acepto la Política de Privacidad.',
    showResult: 'Ver mi resultado',
    resultTitle: 'Nivel estimado',
    resultHint: 'Este test corto es orientativo; habla con nosotros para una evaluación precisa.',
    share: 'Compartir resultado',
    copied: 'Copiado',
    book: 'Crear cita',
    whatsapp: 'Preguntar por WhatsApp',
    restart: 'Repetir test',
    correctLabel: 'Respuestas correctas',
    of: '/',
  },
} as const;
