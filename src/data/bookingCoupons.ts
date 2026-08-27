/**
 * Booking kupon kodları — buradan düzenlenir.
 * Kodlar büyük/küçük harf duyarsız eşleşir.
 *
 * Örnek:
 *   { code: 'EYLUL50', discountEur: 50 }
 */
export type BookingCoupon = {
  code: string;
  /** İndirim tutarı (€) */
  discountEur: number;
  /** false ise kod geçersiz sayılır */
  active?: boolean;
};

export const BOOKING_COUPON_DEFAULT_EUR = 50;

/** Geçerli kupon listesi — yeni kodları buraya ekleyin */
export const BOOKING_COUPONS: BookingCoupon[] = [
  { code: 'CAMPUS50', discountEur: 50, active: true },
  { code: 'BREMEN50', discountEur: 50, active: true },
  { code: 'WELCOME50', discountEur: 50, active: true },
];

export function normalizeCouponCode(raw: string): string {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');
}

export function findBookingCoupon(raw: string): BookingCoupon | null {
  const code = normalizeCouponCode(raw);
  if (!code) return null;
  const hit = BOOKING_COUPONS.find(
    (c) => c.active !== false && normalizeCouponCode(c.code) === code
  );
  return hit || null;
}

export function getCouponDiscountEur(raw: string): number {
  const hit = findBookingCoupon(raw);
  if (!hit) return 0;
  const amount = Number(hit.discountEur);
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}
