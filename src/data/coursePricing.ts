// Kurs Fiyatları ve Tarihleri Data
export const coursePricing = {
  tr: {
    // Akademik Almanca Kursları Fiyatları (Yoğun)
    intensive: {
      a1: {
        fullCourse: "790€",
        lessons: "20+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "20+ 4",
      },
      a2: {
        fullCourse: "890€",
        lessons: "20+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "20+ 4",
      },
      b1: {
        fullCourse: "1090€",
        lessons: "25+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "25+ 4",
      },
      b2: {
        fullCourse: "1090€",
        lessons: "25+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "25+ 4",
      },
      c1: {
        fullCourse: "1190€",
        lessons: "25+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "25+ 4",
      },
    },
    // Online Almanca Kursları Fiyatları
    online: {
      a1: {
        fullCourse: "390€",
        lessons: "20+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "20+ 4",
      },
      a2: {
        fullCourse: "440€",
        lessons: "20+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "20+ 4",
      },
      b1: {
        fullCourse: "540€",
        lessons: "25+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "25+ 4",
      },
      b2: {
        fullCourse: "540€",
        lessons: "25+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "25+ 4",
      },
      c1: {
        fullCourse: "590€",
        lessons: "25+ 4 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "25+ 4",
      },
    },
    // Haftalık Kurs Fiyatları
    weeklyPricing: {
      a1a2: {
        "2": "Haftalık 260€",
        "4": "Haftalık 230€",
        "8": "Haftalık 200€",
        "16": "Haftalık 180€",
      },
      b1b2c1: {
        "2": "Haftalık 290€",
        "4": "Haftalık 250€",
        "8": "Haftalık 225€",
        "16": "Haftalık 200€",
      },
    },
    // Sınav Hazırlık Kursları Fiyatları
    examPrep: {
      goetheTelc: {
        a1: {
          fullCourse: "690€",
          lessons: "20+ 4 ders",
          duration: "8 hafta",
        },
        a2: {
          fullCourse: "740€",
          lessons: "20+ 4 ders",
          duration: "8 hafta",
        },
        b1: {
          fullCourse: "990€",
          lessons: "25+ 4 ders",
          duration: "8 hafta",
        },
        b2: {
          fullCourse: "1.050€",
          lessons: "25+ 4 ders",
          duration: "8 hafta",
        },
        c1: {
          fullCourse: "1.150€",
          lessons: "25+ 4 ders",
          duration: "8 hafta",
        },
      },
      testdafDsh: {
        fullCourse: "1.390€",
        lessons: "20+ 4 / 25+ 4 ders",
        duration: "8-10 hafta",
      },
    },
    // Kurs Zamanları
    schedule: {
      morning: {
        a1a2: {
          time: "09:00 – 12:30 (*)",
          break: "20 dakika mola - Günlük 4 Ders Saati",
          lessons: "Günlük 4 Ders Saati",
        },
        b1c1: {
          time: "09:00 – 12:30 (*)",
          break: "Toplam 30 dakika mola - Günlük 5 Ders Saati",
          lessons: "Günlük 5 Ders Saati",
        },
      },
      afternoon: {
        a1a2: {
          time: "13:00 – 16:30 (*)",
          break: "20 dakika mola",
          lessons: "Günlük 4 Ders Saati",
        },
        b1c1: {
          time: "13:00 – 16:30 (*)",
          break: "Toplam 30 dakika mola",
          lessons: "Günlük 5 Ders Saati",
        },
      },
      evening: {
        a1a2: {
          time: "18:30 – 22:00 (*)",
          break: "20 dakika mola",
          lessons: "Günlük 4 Ders Saati",
        },
        b1c1: {
          time: "18:30 – 22:00 (*)",
          break: "Toplam 30 dakika mola",
          lessons: "Günlük 5 Ders Saati",
        },
      },
      days: "Pazartesiden Cumaya ders olacak.",
    },
    // Kurs Başlangıç Tarihleri 2026
    // Ana başlangıç dönemleri (A1.1, A2.1, B1.1, B2.1, C1.1): 02.03, 04.05, 06.07, 02.09, 02.11
    // Ara başlangıç dönemleri (A1.2, A2.2, B1.2, B2.2, C1.2): 01.04, 03.06, 03.08, 01.10, 01.12
    startDates: {
      a1: {
        a1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        a1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      a2: {
        a2_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        a2_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      b1: {
        b1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        b1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      b2: {
        b2_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        b2_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      c1: {
        c1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        c1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
    },
    // Tatiller 2026
    holidays: [
      { name: "Neujahr", date: "Do, 01.01.2026" },
      { name: "Karfreitag", date: "Fr, 03.04.2026" },
      { name: "Ostermontag", date: "Mo, 06.04.2026" },
      { name: "Tag der Arbeit", date: "Fr, 01.05.2026" },
      { name: "Christi Himmelfahrt", date: "Do, 14.05.2026" },
      { name: "Pfingstmontag", date: "Mo, 25.05.2026" },
      { name: "Weihnachten", date: "Fr, 25.12.2026" },
      { name: "2. Weihnachtstag", date: "Sa, 26.12.2026" },
    ],
    // Vize Bilgisi
    visaInfo: "Vize davet mektubu için yoğun almanca kurslarından en az 2 tam kur alınmaktadır. Konsolosluk bağlamında hazırlık öğrencileri için C1 kursuna kadar kayıt etmeleri gerekmektedir.",
    // Ders Bilgisi
    lessonInfo: "1 ders = 45 dakika",
    // Online kurs notu
    onlineNote: "1 ders = 45 dakika, A1 - A2 haftalık 20 ders | B1-B2 - C1 haftalık 25 ders",
  },
  de: {
    // Akademik Almanca Kursları Fiyatları (Yoğun)
    intensive: {
      a1: {
        fullCourse: "790€",
        lessons: "20+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "20 UStd",
        totalLessons: "20+ 4",
      },
      a2: {
        fullCourse: "890€",
        lessons: "20+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "20 UStd",
        totalLessons: "20+ 4",
      },
      b1: {
        fullCourse: "1090€",
        lessons: "25+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "25 UStd",
        totalLessons: "25+ 4",
      },
      b2: {
        fullCourse: "1090€",
        lessons: "25+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "25 UStd",
        totalLessons: "25+ 4",
      },
      c1: {
        fullCourse: "1190€",
        lessons: "25+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "25 UStd",
        totalLessons: "25+ 4",
      },
    },
    // Online Almanca Kursları Fiyatları
    online: {
      a1: {
        fullCourse: "390€",
        lessons: "20+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "20 UStd",
        totalLessons: "20+ 4",
      },
      a2: {
        fullCourse: "440€",
        lessons: "20+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "20 UStd",
        totalLessons: "20+ 4",
      },
      b1: {
        fullCourse: "540€",
        lessons: "25+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "25 UStd",
        totalLessons: "25+ 4",
      },
      b2: {
        fullCourse: "540€",
        lessons: "25+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "25 UStd",
        totalLessons: "25+ 4",
      },
      c1: {
        fullCourse: "590€",
        lessons: "25+ 4 UStd",
        duration: "8 Wochen",
        weeklyLessons: "25 UStd",
        totalLessons: "25+ 4",
      },
    },
    // Haftalık Kurs Fiyatları
    weeklyPricing: {
      a1a2: {
        "2": "Wöchentlich 260€",
        "4": "Wöchentlich 230€",
        "8": "Wöchentlich 200€",
        "16": "Wöchentlich 180€",
      },
      b1b2c1: {
        "2": "Wöchentlich 290€",
        "4": "Wöchentlich 250€",
        "8": "Wöchentlich 225€",
        "16": "Wöchentlich 200€",
      },
    },
    // Sınav Hazırlık Kursları Fiyatları
    examPrep: {
      goetheTelc: {
        a1: {
          fullCourse: "690€",
          lessons: "20+ 4 UStd",
          duration: "8 Wochen",
        },
        a2: {
          fullCourse: "740€",
          lessons: "20+ 4 UStd",
          duration: "8 Wochen",
        },
        b1: {
          fullCourse: "990€",
          lessons: "25+ 4 UStd",
          duration: "8 Wochen",
        },
        b2: {
          fullCourse: "1.050€",
          lessons: "25+ 4 UStd",
          duration: "8 Wochen",
        },
        c1: {
          fullCourse: "1.150€",
          lessons: "25+ 4 UStd",
          duration: "8 Wochen",
        },
      },
      testdafDsh: {
        fullCourse: "1.390€",
        lessons: "20+ 4 / 25+ 4 UStd",
        duration: "8-10 Wochen",
      },
    },
    // Kurs Zamanları
    schedule: {
      morning: {
        a1a2: {
          time: "09:00 – 12:30 Uhr (*)",
          break: "20 Min Pause - Tägl. 4 UStd",
          lessons: "Tägl. 4 UStd",
        },
        b1c1: {
          time: "09:00 – 12:30 Uhr (*)",
          break: "30 Min Pause - Tägl. 5 UStd",
          lessons: "Tägl. 5 UStd",
        },
      },
      afternoon: {
        a1a2: {
          time: "13:00 – 16:30 Uhr (*)",
          break: "20 Min Pause",
          lessons: "Tägl. 4 UStd",
        },
        b1c1: {
          time: "13:00 – 16:30 Uhr (*)",
          break: "30 Min Pause",
          lessons: "Tägl. 5 UStd",
        },
      },
      evening: {
        a1a2: {
          time: "18:30 – 22:00 Uhr (*)",
          break: "20 Min Pause",
          lessons: "Tägl. 4 UStd",
        },
        b1c1: {
          time: "18:30 – 22:00 Uhr (*)",
          break: "30 Min Pause",
          lessons: "Tägl. 5 UStd",
        },
      },
      days: "Unterricht von Montag bis Freitag.",
    },
    // Kurs Başlangıç Tarihleri 2026
    // Ana başlangıç dönemleri (A1.1, A2.1, B1.1, B2.1, C1.1): 02.03, 04.05, 06.07, 02.09, 02.11
    // Ara başlangıç dönemleri (A1.2, A2.2, B1.2, B2.2, C1.2): 01.04, 03.06, 03.08, 01.10, 01.12
    startDates: {
      a1: {
        a1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        a1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      a2: {
        a2_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        a2_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      b1: {
        b1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        b1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      b2: {
        b2_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        b2_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
      c1: {
        c1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"], // Ana başlangıç
        c1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"], // Ara başlangıç
      },
    },
    // Tatiller 2026
    holidays: [
      { name: "Neujahr", date: "Do, 01.01.2026" },
      { name: "Karfreitag", date: "Fr, 03.04.2026" },
      { name: "Ostermontag", date: "Mo, 06.04.2026" },
      { name: "Tag der Arbeit", date: "Fr, 01.05.2026" },
      { name: "Christi Himmelfahrt", date: "Do, 14.05.2026" },
      { name: "Pfingstmontag", date: "Mo, 25.05.2026" },
      { name: "Weihnachten", date: "Fr, 25.12.2026" },
      { name: "2. Weihnachtstag", date: "Sa, 26.12.2026" },
    ],
    // Vize Bilgisi
    visaInfo: "Für ein Visums-Einladungsschreiben müssen mindestens 2 vollständige Kurse der Intensiv-Deutschkurse belegt werden. Im Konsulatskontext müssen sich Vorbereitungsstudenten bis zum C1-Kurs anmelden.",
    // Ders Bilgisi
    lessonInfo: "1 UStd = 45 Min",
    // Online kurs notu
    onlineNote: "1 Unterrichtsstunde = 45 Minuten, A1 - A2 wöchentlich 20 UStd | B1-B2 - C1 wöchentlich 25 UStd",
  },
  en: {
    // Academic German Courses Pricing (Intensive)
    intensive: {
      a1: {
        fullCourse: "790€",
        lessons: "20+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "20 lessons",
        totalLessons: "20+ 4",
      },
      a2: {
        fullCourse: "890€",
        lessons: "20+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "20 lessons",
        totalLessons: "20+ 4",
      },
      b1: {
        fullCourse: "1090€",
        lessons: "25+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "25 lessons",
        totalLessons: "25+ 4",
      },
      b2: {
        fullCourse: "1090€",
        lessons: "25+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "25 lessons",
        totalLessons: "25+ 4",
      },
      c1: {
        fullCourse: "1190€",
        lessons: "25+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "25 lessons",
        totalLessons: "25+ 4",
      },
    },
    // Online German Courses Pricing
    online: {
      a1: {
        fullCourse: "390€",
        lessons: "20+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "20 lessons",
        totalLessons: "20+ 4",
      },
      a2: {
        fullCourse: "440€",
        lessons: "20+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "20 lessons",
        totalLessons: "20+ 4",
      },
      b1: {
        fullCourse: "540€",
        lessons: "25+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "25 lessons",
        totalLessons: "25+ 4",
      },
      b2: {
        fullCourse: "540€",
        lessons: "25+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "25 lessons",
        totalLessons: "25+ 4",
      },
      c1: {
        fullCourse: "590€",
        lessons: "25+ 4 lessons",
        duration: "8 weeks",
        weeklyLessons: "25 lessons",
        totalLessons: "25+ 4",
      },
    },
    // Weekly Course Pricing
    weeklyPricing: {
      a1a2: {
        "2": "Weekly 260€",
        "4": "Weekly 230€",
        "8": "Weekly 200€",
        "16": "Weekly 180€",
      },
      b1b2c1: {
        "2": "Weekly 290€",
        "4": "Weekly 250€",
        "8": "Weekly 225€",
        "16": "Weekly 200€",
      },
    },
    // Exam Preparation Courses Pricing
    examPrep: {
      goetheTelc: {
        a1: {
          fullCourse: "690€",
          lessons: "20+ 4 lessons",
          duration: "8 weeks",
        },
        a2: {
          fullCourse: "740€",
          lessons: "20+ 4 lessons",
          duration: "8 weeks",
        },
        b1: {
          fullCourse: "990€",
          lessons: "25+ 4 lessons",
          duration: "8 weeks",
        },
        b2: {
          fullCourse: "1,050€",
          lessons: "25+ 4 lessons",
          duration: "8 weeks",
        },
        c1: {
          fullCourse: "1,150€",
          lessons: "25+ 4 lessons",
          duration: "8 weeks",
        },
      },
      testdafDsh: {
        fullCourse: "1,390€",
        lessons: "20+ 4 / 25+ 4 lessons",
        duration: "8-10 weeks",
      },
    },
    // Course Schedule
    schedule: {
      morning: {
        a1a2: {
          time: "09:00 – 12:30 (*)",
          break: "20 minutes break - Daily 4 lessons",
          lessons: "Daily 4 lessons",
        },
        b1c1: {
          time: "09:00 – 12:30 (*)",
          break: "Total 30 minutes break - Daily 5 lessons",
          lessons: "Daily 5 lessons",
        },
      },
      afternoon: {
        a1a2: {
          time: "13:00 – 16:30 (*)",
          break: "20 minutes break",
          lessons: "Daily 4 lessons",
        },
        b1c1: {
          time: "13:00 – 16:30 (*)",
          break: "Total 30 minutes break",
          lessons: "Daily 5 lessons",
        },
      },
      evening: {
        a1a2: {
          time: "18:30 – 22:00 (*)",
          break: "20 minutes break",
          lessons: "Daily 4 lessons",
        },
        b1c1: {
          time: "18:30 – 22:00 (*)",
          break: "Total 30 minutes break",
          lessons: "Daily 5 lessons",
        },
      },
      days: "Classes from Monday to Friday.",
    },
    // Course Start Dates 2026
    startDates: {
      a1: {
        a1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"],
        a1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"],
      },
      a2: {
        a2_1: ["02.03", "04.05", "06.07", "02.09", "02.11"],
        a2_2: ["01.04", "03.06", "03.08", "01.10", "01.12"],
      },
      b1: {
        b1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"],
        b1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"],
      },
      b2: {
        b2_1: ["02.03", "04.05", "06.07", "02.09", "02.11"],
        b2_2: ["01.04", "03.06", "03.08", "01.10", "01.12"],
      },
      c1: {
        c1_1: ["02.03", "04.05", "06.07", "02.09", "02.11"],
        c1_2: ["01.04", "03.06", "03.08", "01.10", "01.12"],
      },
    },
    // Holidays 2026
    holidays: [
      { name: "New Year", date: "Thu, 01.01.2026" },
      { name: "Good Friday", date: "Fri, 03.04.2026" },
      { name: "Easter Monday", date: "Mon, 06.04.2026" },
      { name: "Labor Day", date: "Fri, 01.05.2026" },
      { name: "Ascension Day", date: "Thu, 14.05.2026" },
      { name: "Whit Monday", date: "Mon, 25.05.2026" },
      { name: "Christmas", date: "Fri, 25.12.2026" },
      { name: "Boxing Day", date: "Sat, 26.12.2026" },
    ],
    // Visa Information
    visaInfo: "For a visa invitation letter, at least 2 complete intensive German courses must be enrolled. In the consulate context, preparatory students must register up to the C1 course.",
    // Lesson Information
    lessonInfo: "1 lesson = 45 minutes",
    // Online course note
    onlineNote: "1 lesson = 45 minutes, A1 - A2 weekly 20 lessons | B1-B2 - C1 weekly 25 lessons",
  },
};

// Helper function to get course pricing by level
export function getCoursePricing(lang: 'tr' | 'de' | 'en' | 'es', courseType: 'intensive' | 'online', level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1') {
  // İspanyolca için Almanca verilerini kullan
  const pricingLang = lang === 'es' ? 'de' : lang;
  return coursePricing[pricingLang][courseType][level];
}

// Helper function to get course dates by level
export function getCourseDates(lang: 'tr' | 'de' | 'en' | 'es', level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1') {
  // İspanyolca için Almanca verilerini kullan
  const pricingLang = lang === 'es' ? 'de' : lang;
  return coursePricing[pricingLang].startDates[level];
}

