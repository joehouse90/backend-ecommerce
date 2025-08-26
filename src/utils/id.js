// Genera un ID incremental seguro a partir de una lista de IDs existentes.
// Soporta IDs numéricos o string-numéricos. Devuelve número.
export function nextId(existingIds = []) {
  if (!existingIds.length) return 1;
  const nums = existingIds.map(v => Number(v)).filter(n => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return max + 1;
}
