/**
 * Booking kampanya indirimi — şirket buradan yönetir.
 * Kullanıcı kod girmez; kampanya aktifse paket ekranında kompakt kontrol gösterilir
 * ve kullanıcı Apply ile indirimi kendisi ekler (otomatik uygulanmaz).
 *
 * Tutarı değiştirmek için yalnızca `BOOKING_CAMPAIGN_DISCOUNT_EUR` değerini güncelleyin.
 * Bitiş tarihini değiştirmek için `BOOKING_CAMPAIGN_ENDS` ISO tarihini güncelleyin
 * (ör. '2026-11-01' → chip'te "~10 gün kaldı" benzeri metin).
 * Kampanyayı kapatmak için `BOOKING_CAMPAIGN_ACTIVE = false` yapın (kontrol gizlenir).
 * Bitiş tarihi geçmişse kampanya otomatik gizlenir; countdown da gösterilmez.
 * Countdown istemiyorsanız `BOOKING_CAMPAIGN_ENDS = ''` bırakın.
 */

/** Kampanya indirim tutarı (€) — değiştirmek için bu sabiti güncelleyin */
export const BOOKING_CAMPAIGN_DISCOUNT_EUR = 50;

/** false yapınca kampanya kartı gizlenir ve indirim uygulanmaz */
export const BOOKING_CAMPAIGN_ACTIVE = true;

/**
 * Kampanya bitiş günü (YYYY-MM-DD, yerel gün sonu).
 * Demo: 2026-10-22 civarı için ~10 gün → 2026-11-01.
 * Boş string = countdown yok (ACTIVE bayrağına göre devam eder).
 */
export const BOOKING_CAMPAIGN_ENDS = '2026-11-01';

/** Özet / Stripe kayıt etiketi (kullanıcıya gösterilen kod değil) */
export const BOOKING_CAMPAIGN_LABEL = 'CAMPAIGN';

/** @deprecated BOOKING_CAMPAIGN_DISCOUNT_EUR kullanın */
export const BOOKING_COUPON_DEFAULT_EUR = BOOKING_CAMPAIGN_DISCOUNT_EUR;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Yerel takvim günü (saat 00:00) */
function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** YYYY-MM-DD → yerel gün başlangıcı; geçersizse null */
export function parseCampaignEndDate(iso: string): Date | null {
  const raw = String(iso || '').trim();
  if (!raw) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const day = Number(m[3]);
  const dt = new Date(y, mo - 1, day);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== day) return null;
  return dt;
}

/**
 * Bitiş gününe kalan tam gün sayısı (bitiş günü dahil: 0 = son gün).
 * Tarih yoksa veya süresi dolduysa null.
 */
export function getCampaignDaysLeft(now: Date = new Date()): number | null {
  const end = parseCampaignEndDate(BOOKING_CAMPAIGN_ENDS);
  if (!end) return null;
  const today = startOfLocalDay(now);
  const days = Math.round((end.getTime() - today.getTime()) / MS_PER_DAY);
  if (days < 0) return null;
  return days;
}

export type BookingCampaign = {
  active: boolean;
  discountEur: number;
  label: string;
  /** null = countdown yok / süresi dolmuş */
  daysLeft: number | null;
  endsIso: string;
};

export function getBookingCampaign(now: Date = new Date()): BookingCampaign {
  const discountEur = Number(BOOKING_CAMPAIGN_DISCOUNT_EUR);
  const amount = Number.isFinite(discountEur) && discountEur > 0 ? discountEur : 0;
  const daysLeft = getCampaignDaysLeft(now);
  const hasEnd = Boolean(parseCampaignEndDate(BOOKING_CAMPAIGN_ENDS));
  const notExpired = !hasEnd || daysLeft !== null;
  return {
    active: BOOKING_CAMPAIGN_ACTIVE && amount > 0 && notExpired,
    discountEur: amount,
    label: BOOKING_CAMPAIGN_LABEL,
    daysLeft: BOOKING_CAMPAIGN_ACTIVE && amount > 0 ? daysLeft : null,
    endsIso: BOOKING_CAMPAIGN_ENDS,
  };
}

/** Chip için urgency metni; süre yoksa / dolmuşsa boş string */
export function formatCampaignUrgency(
  daysLeft: number | null,
  copy: {
    couponDaysLeft: string;
    couponDayLeft: string;
    couponLastDay: string;
  },
): string {
  if (daysLeft === null || daysLeft < 0) return '';
  if (daysLeft === 0) return copy.couponLastDay;
  if (daysLeft === 1) return copy.couponDayLeft;
  return copy.couponDaysLeft.replace('{n}', String(daysLeft));
}
