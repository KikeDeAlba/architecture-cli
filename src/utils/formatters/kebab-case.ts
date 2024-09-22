export function kebabCaseFormat(text: string) {
  // Reemplaza las mayúsculas por un guion y la letra en minúsculas
  return text
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Añade un guion entre minúscula y mayúscula
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Añade un guion entre mayúsculas
    .toLowerCase(); // Convierte todo a minúsculas
}
