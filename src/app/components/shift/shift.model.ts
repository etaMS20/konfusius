export interface Shift {
  title: string;
  available: boolean;
  description?: string;
  imagePath?: string;
}

export interface WcProduct {
  id: number;
  slug?: string;
  name?: string;
  description?: string;
  stock_quantity: number | null;
  stock_status: string;
  imagePath?: string;
}

// TODO: map from API
export const IMAGE_MAP: { [key: number]: string } = {
  1547: '/abbau.png', // test
  1253: '/abbau.png', // kaffee tee
  1247: '/kiosk_2.png', // Aufräumen Keller
  962: '/awareness.png', // awareness
  602: '/abbau.png', // Abbau (montag)
  601: '/abbau.png', // Sauna
  597: '/workshops.png', // artist
  590: '/klo.png', // Müll
  50: '/kantine.png', // Küche
  30: '/bar_keller.png', // Bar keller
  19: '/bar.png', // Bar draußen
  13: '/kiosk_1.png', // Kiosk
};
