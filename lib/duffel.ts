import { Duffel } from "@duffel/api";

// Singleton Duffel client — server-side only
const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN || "",
});

export default duffel;

// 5% markup on airline prices
export const MARKUP_PERCENTAGE = 0.05;

export function applyMarkup(amountStr: string): string {
  const amount = parseFloat(amountStr);
  const marked = amount * (1 + MARKUP_PERCENTAGE);
  return marked.toFixed(2);
}
