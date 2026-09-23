/**
 * Booking kupon kodları — buradan düzenlenir.
 * Kodlar büyük/küçük harf duyarsız eşleşir.
 *
 * Aylık dinamik kodlar `monthlyCoupons` üzerinden yalnızca bulunduğun ay için eklenir;
 * önceki ayın kodu otomatik geçersiz olur.
 *
 * Örnek:
 *   { code: 'EYLUL50', discountEur: 50 }
 */
import { getCurrentMonthCoupon } from './monthlyCoupons';

export type BookingCoupon = {
  code: string;
  /** İndirim tutarı (€) */
  discountEur: number;
  /** false ise kod geçersiz sayılır */
  active?: boolean;
};

export const BOOKING_COUPON_DEFAULT_EUR = 50;

/** Sabit kupon listesi — yeni kalıcı kodları buraya ekleyin */
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

/** Bu ayın kuponu + sabit liste (önceki ay kodu dahil edilmez) */
export function getActiveBookingCoupons(d = new Date()): BookingCoupon[] {
  const monthly = getCurrentMonthCoupon(d);
  const monthCode = normalizeCouponCode(monthly.code);
  const monthEntry: BookingCoupon = {
    code: monthly.code,
    discountEur: BOOKING_COUPON_DEFAULT_EUR,
    active: true,
  };
  const rest = BOOKING_COUPONS.filter(
    (c) => normalizeCouponCode(c.code) !== monthCode
  );
  return [monthEntry, ...rest];
}

export function findBookingCoupon(raw: string, d = new Date()): BookingCoupon | null {
  const code = normalizeCouponCode(raw);
  if (!code) return null;
  const hit = getActiveBookingCoupons(d).find(
    (c) => c.active !== false && normalizeCouponCode(c.code) === code
  );
  return hit || null;
}

export function getCouponDiscountEur(raw: string, d = new Date()): number {
  const hit = findBookingCoupon(raw, d);
  if (!hit) return 0;
  const amount = Number(hit.discountEur);
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}
