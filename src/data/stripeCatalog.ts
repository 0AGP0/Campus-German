/**
 * Booking ödeme sabitleri (site fiyatı kanonik).
 * Eski Stripe Dashboard paket tabloları (1232 € / 8 hf vb.) kaldırıldı —
 * checkout her zaman custom amount + adjust ürünü ile gider.
 */

/** Kayıt ücreti — tek seferlik (€). Yalnızca Almanya + tam ödemede alınmaz. */
export const RESERVATION_DEPOSIT_EUR = 80;
export const BALANCE_DUE_DAYS = 14;
/** Almanya tam ödemede muafiyet tutarı (gösterim); yurtdışı/taksitte kayıt ücreti iptal edilmez */
export const FULL_PAYMENT_DISCOUNT_EUR = 80;

/**
 * Stripe işlem ücreti — müşteriye yansıtma (uluslararası kart örneği: %3.25 + €0.25).
 * gross = (net + fixed) / (1 - rate)  → fee sonrası net ≈ istenen tutar
 */
export const STRIPE_FEE_RATE = 0.0325;
export const STRIPE_FEE_FIXED_EUR = 0.25;

/** Havale / SWIFT buffer (€) — kart komisyonu yerine şeffaf ek */
export const SWIFT_TRANSFER_BUFFER_EUR = 20;

/** Net cent → Stripe’a çekilecek cent (fee dahil) */
export function amountWithStripeFeeCents(netCents: number): number {
  const net = Math.max(0, Math.round(Number(netCents) || 0));
  if (net <= 0) return 0;
  const rate = STRIPE_FEE_RATE;
  const fixed = STRIPE_FEE_FIXED_EUR;
  if (!(rate > 0) || rate >= 1) return net;
  const grossEur = (net / 100 + fixed) / (1 - rate);
  return Math.max(net, Math.round(grossEur * 100));
}

export const TELC_PREP_EUR = 640;
export const TELC_PREP_WEEKS = 4;

/** Ekstra hizmet fiyatları (form + checkout satırları) */
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

/** Checkout’ta kullanılan tek Stripe ürünü — tutar site’den (useCustomAmount) */
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
