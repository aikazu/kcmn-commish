const PHONE = "6281234567890"; // placeholder, user provides
const BASE = "https://wa.me/";

export interface WhatsAppLinkOptions {
  tier?: string;
  message?: string;
}

export function buildWhatsAppLink({ tier, message }: WhatsAppLinkOptions = {}): string {
  const text = message ?? defaultMessage(tier);
  return `${BASE}${PHONE}?text=${encodeURIComponent(text)}`;
}

export function defaultMessage(tier?: string): string {
  if (!tier) {
    return "Halo Iqbal, saya tertarik dengan jasa web development kamu.";
  }
  return `Halo Iqbal, saya tertarik dengan paket ${tier}. Boleh info lebih detail?`;
}

export const PHONE_NUMBER = PHONE;
