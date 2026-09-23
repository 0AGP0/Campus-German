/** Bayraklı alan kodu listesi — ISO + dial + ülke adı (TR/DE/EN/ES) */

export type PhoneCountry = {
  iso: string;
  dial: string;
  flag: string;
  name: { tr: string; de: string; en: string; es: string };
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: 'TR', dial: '90', flag: '🇹🇷', name: { tr: 'Türkiye', de: 'Türkei', en: 'Turkey', es: 'Turquía' } },
  { iso: 'DE', dial: '49', flag: '🇩🇪', name: { tr: 'Almanya', de: 'Deutschland', en: 'Germany', es: 'Alemania' } },
  { iso: 'AT', dial: '43', flag: '🇦🇹', name: { tr: 'Avusturya', de: 'Österreich', en: 'Austria', es: 'Austria' } },
  { iso: 'CH', dial: '41', flag: '🇨🇭', name: { tr: 'İsviçre', de: 'Schweiz', en: 'Switzerland', es: 'Suiza' } },
  { iso: 'NL', dial: '31', flag: '🇳🇱', name: { tr: 'Hollanda', de: 'Niederlande', en: 'Netherlands', es: 'Países Bajos' } },
  { iso: 'BE', dial: '32', flag: '🇧🇪', name: { tr: 'Belçika', de: 'Belgien', en: 'Belgium', es: 'Bélgica' } },
  { iso: 'FR', dial: '33', flag: '🇫🇷', name: { tr: 'Fransa', de: 'Frankreich', en: 'France', es: 'Francia' } },
  { iso: 'GB', dial: '44', flag: '🇬🇧', name: { tr: 'Birleşik Krallık', de: 'Vereinigtes Königreich', en: 'United Kingdom', es: 'Reino Unido' } },
  { iso: 'IT', dial: '39', flag: '🇮🇹', name: { tr: 'İtalya', de: 'Italien', en: 'Italy', es: 'Italia' } },
  { iso: 'ES', dial: '34', flag: '🇪🇸', name: { tr: 'İspanya', de: 'Spanien', en: 'Spain', es: 'España' } },
  { iso: 'PT', dial: '351', flag: '🇵🇹', name: { tr: 'Portekiz', de: 'Portugal', en: 'Portugal', es: 'Portugal' } },
  { iso: 'PL', dial: '48', flag: '🇵🇱', name: { tr: 'Polonya', de: 'Polen', en: 'Poland', es: 'Polonia' } },
  { iso: 'RO', dial: '40', flag: '🇷🇴', name: { tr: 'Romanya', de: 'Rumänien', en: 'Romania', es: 'Rumanía' } },
  { iso: 'BG', dial: '359', flag: '🇧🇬', name: { tr: 'Bulgaristan', de: 'Bulgarien', en: 'Bulgaria', es: 'Bulgaria' } },
  { iso: 'GR', dial: '30', flag: '🇬🇷', name: { tr: 'Yunanistan', de: 'Griechenland', en: 'Greece', es: 'Grecia' } },
  { iso: 'RU', dial: '7', flag: '🇷🇺', name: { tr: 'Rusya', de: 'Russland', en: 'Russia', es: 'Rusia' } },
  { iso: 'UA', dial: '380', flag: '🇺🇦', name: { tr: 'Ukrayna', de: 'Ukraine', en: 'Ukraine', es: 'Ucrania' } },
  { iso: 'US', dial: '1', flag: '🇺🇸', name: { tr: 'ABD', de: 'USA', en: 'United States', es: 'EE. UU.' } },
  { iso: 'CA', dial: '1', flag: '🇨🇦', name: { tr: 'Kanada', de: 'Kanada', en: 'Canada', es: 'Canadá' } },
  { iso: 'AE', dial: '971', flag: '🇦🇪', name: { tr: 'BAE', de: 'VAE', en: 'UAE', es: 'EAU' } },
  { iso: 'SA', dial: '966', flag: '🇸🇦', name: { tr: 'Suudi Arabistan', de: 'Saudi-Arabien', en: 'Saudi Arabia', es: 'Arabia Saudí' } },
  { iso: 'IQ', dial: '964', flag: '🇮🇶', name: { tr: 'Irak', de: 'Irak', en: 'Iraq', es: 'Irak' } },
  { iso: 'IR', dial: '98', flag: '🇮🇷', name: { tr: 'İran', de: 'Iran', en: 'Iran', es: 'Irán' } },
  { iso: 'SY', dial: '963', flag: '🇸🇾', name: { tr: 'Suriye', de: 'Syrien', en: 'Syria', es: 'Siria' } },
  { iso: 'EG', dial: '20', flag: '🇪🇬', name: { tr: 'Mısır', de: 'Ägypten', en: 'Egypt', es: 'Egipto' } },
  { iso: 'MA', dial: '212', flag: '🇲🇦', name: { tr: 'Fas', de: 'Marokko', en: 'Morocco', es: 'Marruecos' } },
  { iso: 'DZ', dial: '213', flag: '🇩🇿', name: { tr: 'Cezayir', de: 'Algerien', en: 'Algeria', es: 'Argelia' } },
  { iso: 'TN', dial: '216', flag: '🇹🇳', name: { tr: 'Tunus', de: 'Tunesien', en: 'Tunisia', es: 'Túnez' } },
  { iso: 'AZ', dial: '994', flag: '🇦🇿', name: { tr: 'Azerbaycan', de: 'Aserbaidschan', en: 'Azerbaijan', es: 'Azerbaiyán' } },
  { iso: 'KZ', dial: '7', flag: '🇰🇿', name: { tr: 'Kazakistan', de: 'Kasachstan', en: 'Kazakhstan', es: 'Kazajistán' } },
  { iso: 'UZ', dial: '998', flag: '🇺🇿', name: { tr: 'Özbekistan', de: 'Usbekistan', en: 'Uzbekistan', es: 'Uzbekistán' } },
  { iso: 'KG', dial: '996', flag: '🇰🇬', name: { tr: 'Kırgızistan', de: 'Kirgisistan', en: 'Kyrgyzstan', es: 'Kirguistán' } },
  { iso: 'TM', dial: '993', flag: '🇹🇲', name: { tr: 'Türkmenistan', de: 'Turkmenistan', en: 'Turkmenistan', es: 'Turkmenistán' } },
  { iso: 'GE', dial: '995', flag: '🇬🇪', name: { tr: 'Gürcistan', de: 'Georgien', en: 'Georgia', es: 'Georgia' } },
  { iso: 'IN', dial: '91', flag: '🇮🇳', name: { tr: 'Hindistan', de: 'Indien', en: 'India', es: 'India' } },
  { iso: 'PK', dial: '92', flag: '🇵🇰', name: { tr: 'Pakistan', de: 'Pakistan', en: 'Pakistan', es: 'Pakistán' } },
  { iso: 'BD', dial: '880', flag: '🇧🇩', name: { tr: 'Bangladeş', de: 'Bangladesch', en: 'Bangladesh', es: 'Bangladés' } },
  { iso: 'CN', dial: '86', flag: '🇨🇳', name: { tr: 'Çin', de: 'China', en: 'China', es: 'China' } },
  { iso: 'JP', dial: '81', flag: '🇯🇵', name: { tr: 'Japonya', de: 'Japan', en: 'Japan', es: 'Japón' } },
  { iso: 'KR', dial: '82', flag: '🇰🇷', name: { tr: 'Güney Kore', de: 'Südkorea', en: 'South Korea', es: 'Corea del Sur' } },
  { iso: 'BR', dial: '55', flag: '🇧🇷', name: { tr: 'Brezilya', de: 'Brasilien', en: 'Brazil', es: 'Brasil' } },
  { iso: 'MX', dial: '52', flag: '🇲🇽', name: { tr: 'Meksika', de: 'Mexiko', en: 'Mexico', es: 'México' } },
  { iso: 'AR', dial: '54', flag: '🇦🇷', name: { tr: 'Arjantin', de: 'Argentinien', en: 'Argentina', es: 'Argentina' } },
  { iso: 'CO', dial: '57', flag: '🇨🇴', name: { tr: 'Kolombiya', de: 'Kolumbien', en: 'Colombia', es: 'Colombia' } },
  { iso: 'SE', dial: '46', flag: '🇸🇪', name: { tr: 'İsveç', de: 'Schweden', en: 'Sweden', es: 'Suecia' } },
  { iso: 'NO', dial: '47', flag: '🇳🇴', name: { tr: 'Norveç', de: 'Norwegen', en: 'Norway', es: 'Noruega' } },
  { iso: 'DK', dial: '45', flag: '🇩🇰', name: { tr: 'Danimarka', de: 'Dänemark', en: 'Denmark', es: 'Dinamarca' } },
  { iso: 'FI', dial: '358', flag: '🇫🇮', name: { tr: 'Finlandiya', de: 'Finnland', en: 'Finland', es: 'Finlandia' } },
];

export function findCountryByIso(iso: string): PhoneCountry | undefined {
  return PHONE_COUNTRIES.find((c) => c.iso === iso.toUpperCase());
}
