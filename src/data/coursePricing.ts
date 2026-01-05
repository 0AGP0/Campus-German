// Kurs Fiyatları ve Tarihleri Data
export const coursePricing = {
  tr: {
    // Akademik Almanca Kursları Fiyatları (Yoğun)
    intensive: {
      a1: {
        fullCourse: "790€",
        lessons: "Yaklaşık 160 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "160",
      },
      a2: {
        fullCourse: "890€",
        lessons: "Yaklaşık 160 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "160",
      },
      b1: {
        fullCourse: "1090€",
        lessons: "Yaklaşık 200 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "200",
      },
      b2: {
        fullCourse: "1090€",
        lessons: "Yaklaşık 200 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "200",
      },
      c1: {
        fullCourse: "1190€",
        lessons: "Yaklaşık 200 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "200",
      },
    },
    // Online Almanca Kursları Fiyatları
    online: {
      a1: {
        fullCourse: "390€",
        lessons: "Yaklaşık 160 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "160",
      },
      a2: {
        fullCourse: "440€",
        lessons: "Yaklaşık 160 ders",
        duration: "8 hafta",
        weeklyLessons: "20 ders",
        totalLessons: "160",
      },
      b1: {
        fullCourse: "540€",
        lessons: "Yaklaşık 200 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "200",
      },
      b2: {
        fullCourse: "540€",
        lessons: "Yaklaşık 200 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "200",
      },
      c1: {
        fullCourse: "590€",
        lessons: "Yaklaşık 200 ders",
        duration: "8 hafta",
        weeklyLessons: "25 ders",
        totalLessons: "200",
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
          lessons: "160 ders",
          duration: "8 hafta",
        },
        a2: {
          fullCourse: "740€",
          lessons: "160 ders",
          duration: "8 hafta",
        },
        b1: {
          fullCourse: "990€",
          lessons: "200 ders",
          duration: "8 hafta",
        },
        b2: {
          fullCourse: "1.050€",
          lessons: "200 ders",
          duration: "8 hafta",
        },
        c1: {
          fullCourse: "1.150€",
          lessons: "200 ders",
          duration: "8 hafta",
        },
      },
      testdafDsh: {
        fullCourse: "1.390€",
        lessons: "220-250 ders",
        duration: "8-10 hafta",
      },
    },
    // Kurs Zamanları
    schedule: {
      morning: {
        a1a2: {
          time: "08:30 – 11:50 o'clock (*)",
          break: "20 dakika mola - Günlük 4 Ders Saati (10-10.20)",
          lessons: "Günlük 4 Ders Saati",
        },
        b1c1: {
          time: "08:15 – 12:30 o'clock (*)",
          break: "Toplam 30 dakika mola - Günlük 5 Ders saati (9.30-9.50 - 11.20-11.30)",
          lessons: "Günlük 5 Ders Saati",
        },
      },
      afternoon: {
        a1a2: {
          time: "12:30 – 15:50 o'clock (*)",
          break: "20 dakika mola",
          lessons: "Günlük 4 Ders Saati",
        },
        b1c1: {
          time: "13:00 – 17:15 o'clock (*)",
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
        lessons: "ca. 160 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "20 Unterrichtsstunden",
        totalLessons: "160",
      },
      a2: {
        fullCourse: "890€",
        lessons: "ca. 160 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "20 Unterrichtsstunden",
        totalLessons: "160",
      },
      b1: {
        fullCourse: "1090€",
        lessons: "ca. 200 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "25 Unterrichtsstunden",
        totalLessons: "200",
      },
      b2: {
        fullCourse: "1090€",
        lessons: "ca. 200 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "25 Unterrichtsstunden",
        totalLessons: "200",
      },
      c1: {
        fullCourse: "1190€",
        lessons: "ca. 200 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "25 Unterrichtsstunden",
        totalLessons: "200",
      },
    },
    // Online Almanca Kursları Fiyatları
    online: {
      a1: {
        fullCourse: "390€",
        lessons: "ca. 160 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "20 Unterrichtsstunden",
        totalLessons: "160",
      },
      a2: {
        fullCourse: "440€",
        lessons: "ca. 160 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "20 Unterrichtsstunden",
        totalLessons: "160",
      },
      b1: {
        fullCourse: "540€",
        lessons: "ca. 200 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "25 Unterrichtsstunden",
        totalLessons: "200",
      },
      b2: {
        fullCourse: "540€",
        lessons: "ca. 200 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "25 Unterrichtsstunden",
        totalLessons: "200",
      },
      c1: {
        fullCourse: "590€",
        lessons: "ca. 200 Unterrichtsstunden",
        duration: "8 Wochen",
        weeklyLessons: "25 Unterrichtsstunden",
        totalLessons: "200",
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
          lessons: "160 Unterrichtsstunden",
          duration: "8 Wochen",
        },
        a2: {
          fullCourse: "740€",
          lessons: "160 Unterrichtsstunden",
          duration: "8 Wochen",
        },
        b1: {
          fullCourse: "990€",
          lessons: "200 Unterrichtsstunden",
          duration: "8 Wochen",
        },
        b2: {
          fullCourse: "1.050€",
          lessons: "200 Unterrichtsstunden",
          duration: "8 Wochen",
        },
        c1: {
          fullCourse: "1.150€",
          lessons: "200 Unterrichtsstunden",
          duration: "8 Wochen",
        },
      },
      testdafDsh: {
        fullCourse: "1.390€",
        lessons: "220-250 Unterrichtsstunden",
        duration: "8-10 Wochen",
      },
    },
    // Kurs Zamanları
    schedule: {
      morning: {
        a1a2: {
          time: "08:30 – 11:50 Uhr (*)",
          break: "20 Minuten Pause - Täglich 4 Unterrichtsstunden (10-10.20)",
          lessons: "Täglich 4 Unterrichtsstunden",
        },
        b1c1: {
          time: "08:15 – 12:30 Uhr (*)",
          break: "Insgesamt 30 Minuten Pause - Täglich 5 Unterrichtsstunden (9.30-9.50 - 11.20-11.30)",
          lessons: "Täglich 5 Unterrichtsstunden",
        },
      },
      afternoon: {
        a1a2: {
          time: "12:30 – 15:50 Uhr (*)",
          break: "20 Minuten Pause",
          lessons: "Täglich 4 Unterrichtsstunden",
        },
        b1c1: {
          time: "13:00 – 17:15 Uhr (*)",
          break: "Insgesamt 30 Minuten Pause",
          lessons: "Täglich 5 Unterrichtsstunden",
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
    lessonInfo: "1 Unterrichtsstunde = 45 Minuten",
    // Online kurs notu
    onlineNote: "1 Unterrichtsstunde = 45 Minuten, A1 - A2 wöchentlich 20 Unterrichtsstunden | B1-B2 - C1 wöchentlich 25 Unterrichtsstunden",
  },
};

// Kurs seviyesine göre fiyat getirme helper fonksiyonu
export function getCoursePricing(lang: 'tr' | 'de', courseType: 'intensive' | 'online', level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1') {
  return coursePricing[lang][courseType][level];
}

// Kurs seviyesine göre tarih getirme helper fonksiyonu
export function getCourseDates(lang: 'tr' | 'de', level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1') {
  return coursePricing[lang].startDates[level];
}

