/**
 * Aylık dinamik kuponlar — yalnızca bulunduğun ayın kodu geçerlidir.
 * Önceki ay kodu bilerek listede yoksa / ay anahtarı eşleşmezse geçersiz sayılır.
 */

export type MonthlyCoupon = {
  /** YYYY-MM */
  monthKey: string;
  code: string;
  /** Kısa açıklama (opsiyonel) */
  note?: string;
};

/** Elle yönetilen aylık kodlar — her ay yenilenir */
const COUPON_BY_MONTH: Record<string, string> = {
  '2026-09': 'CGSEP26',
  '2026-10': 'CGOCT26',
  '2026-11': 'CGNOV26',
  '2026-12': 'CGDEC26',
  '2027-01': 'CGJAN27',
  '2027-02': 'CGFEB27',
  '2027-03': 'CGMAR27',
  '2027-04': 'CGAPR27',
  '2027-05': 'CGMAY27',
  '2027-06': 'CGJUN27',
  '2027-07': 'CGJUL27',
  '2027-08': 'CGAUG27',
  '2027-09': 'CGSEP27',
  '2027-10': 'CGOCT27',
  '2027-11': 'CGNOV27',
  '2027-12': 'CGDEC27',
};

export function monthKeyFromDate(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/** Bu ayın kuponu — yoksa deterministik yedek (yine ay anahtarına bağlı) */
export function getCurrentMonthCoupon(d = new Date()): MonthlyCoupon {
  const monthKey = monthKeyFromDate(d);
  const code = COUPON_BY_MONTH[monthKey] || `CG${monthKey.replace('-', '')}`;
  return { monthKey, code };
}

export function isCouponValidForCurrentMonth(code: string, d = new Date()): boolean {
  const current = getCurrentMonthCoupon(d);
  return code.trim().toUpperCase() === current.code.toUpperCase();
}
