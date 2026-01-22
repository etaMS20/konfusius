import { EventColor } from 'calendar-utils';

// Helper to generate distinct colors (HSL-based)
function generateColor(
  index: number,
  total: number,
): { primary: string; secondary: string; secondaryText: string } {
  const hue = Math.round((360 / total) * index);
  const primary = `hsl(${hue}, 70%, 50%)`;
  const secondary = `hsl(${hue}, 90%, 90%)`;
  const secondaryText = `hsl(${hue}, 90%, 20%)`;
  return { primary, secondary, secondaryText };
}

export function generateProductColors(
  productIds: number[],
): Record<number, EventColor> {
  const total = productIds.length;
  const colorMap: Record<number, EventColor> = {};
  productIds.forEach((id, idx) => {
    const { primary, secondary, secondaryText } = generateColor(idx, total);
    colorMap[id] = { primary, secondary, secondaryText };
  });
  return colorMap;
}
