/**
 * Stripe Dashboard ürün kataloğu (Campus German).
 * Form fiyatları ve checkout lineItems buradan türetilir.
 */
export const RESERVATION_DEPOSIT_EUR = 200;
export const BALANCE_DUE_DAYS = 14;

/** Intensive 20 ders/hafta — Stripe paket fiyatları (€) */
export const INTENSIVE_20_EUR_BY_WEEKS: Record<number, number> = {
  4: 795,
  8: 1232,
  12: 1638,
  16: 1920,
  24: 2808,
  32: 3648,
  40: 4560,
};

/** Intensive Plus 24 ders/hafta — Stripe paket fiyatları (€) */
export const INTENSIVE_24_EUR_BY_WEEKS: Record<number, number> = {
  4: 870,
  8: 1484,
  12: 1989,
  16: 2256,
  24: 3312,
  32: 4320,
  40: 5400,
};

export const GOETHE_ONLINE_EUR_BY_WEEKS: Record<number, number> = {
  4: 336,
  8: 644,
  12: 917,
};

export const TELC_PREP_EUR = 640;
export const TELC_PREP_WEEKS = 4;

/** Yoğun programda her seviye ≈ 8 hafta paketi */
export const INTENSIVE_LEVEL_WEEKS = 8;

export const STRIPE_EXTRAS = {
  visa: {
    productKey: 'student_visa_application_support',
    name: 'Student Visa Application Support',
    eur: 500,
  },
  university: {
    productKey: 'public_university_conditional_admission_support',
    name: 'Public University Conditional Admission Support',
    eur: 500,
  },
  accommodation: {
    productKey: 'accommodation_placement_service',
    name: 'Accommodation Placement Service',
    eur: 100,
  },
  airport: {
    productKey: 'arrival_onboarding_support',
    name: 'Arrival & Onboarding Support',
    eur: 100,
  },
} as const;

export const STRIPE_ADJUST_PRODUCT = {
  productKey: 'german_course_services_adjust',
  name: 'German Course & Services | Adjust Total Fee or Select',
} as const;

export type StripeLineItem = {
  productKey: string;
  name: string;
  amountCents: number;
  quantity: number;
  weeks?: number;
  level?: string;
};

export function intensive20PackageName(weeks: number): string {
  return `German Intensive 20L/W - ${weeks} Weeks`;
}

export function intensive20ProductKey(weeks: number): string {
  return `german_intensive_20_${weeks}w`;
}

export function getIntensive20Eur(weeks: number): number | null {
  const w = Math.round(weeks);
  return INTENSIVE_20_EUR_BY_WEEKS[w] ?? null;
}

/** Seviye başına yoğun kurs tutarı (8 haftalık Stripe paketi). */
export function getIntensiveLevelEur(): number {
  return INTENSIVE_20_EUR_BY_WEEKS[INTENSIVE_LEVEL_WEEKS];
}

export function computeDeposit(totalCents: number): {
  chargeCents: number;
  remainingCents: number;
  depositEur: number;
  balanceDueDays: number;
} {
  const depositCents = RESERVATION_DEPOSIT_EUR * 100;
  const chargeCents = Math.min(depositCents, Math.max(0, totalCents));
  return {
    chargeCents,
    remainingCents: Math.max(0, totalCents - chargeCents),
    depositEur: RESERVATION_DEPOSIT_EUR,
    balanceDueDays: BALANCE_DUE_DAYS,
  };
}
