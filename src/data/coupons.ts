/**
 * Geçerli indirim kuponları.
 * code: Kullanıcının gireceği kod (büyük/küçük harf duyarsız)
 * discountPercent: Yüzde indirim (örn. 10 = %10)
 */
export interface Coupon {
  code: string;
  discountPercent: number;
}

export const VALID_COUPONS: Coupon[] = [
  { code: 'HBCampusGerman', discountPercent: 10 },
];

export function getCouponByCode(input: string): Coupon | null {
  if (!input || typeof input !== 'string') return null;
  const normalized = input.trim().toUpperCase();
  return VALID_COUPONS.find((c) => c.code.toUpperCase() === normalized) || null;
}
