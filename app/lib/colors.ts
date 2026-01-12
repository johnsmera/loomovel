/**
 * Referência de cores customizadas do tema
 * 
 * Cores customizadas disponíveis:
 * - primary: #1876D2 (bg-primary, text-primary, etc.)
 * - dark-900: #0B1125 (bg-dark-900, text-dark-900, etc.)
 * - gold: #D2B843 (bg-gold, text-gold, etc.)
 * - light: #E0F7FF (bg-light, text-light, etc.)
 * - error: #BA1A1A (bg-error, text-error, etc.)
 * 
 * Todas as outras cores do Tailwind estão disponíveis:
 * - blue-*, cyan-*, yellow-*, red-*, gray-*, etc.
 */

export const customColors = {
  primary: "#1876D2",
  "dark-900": "#0B1125",
  gold: "#D2B843",
  light: "#E0F7FF",
  error: "#BA1A1A",
} as const;

/**
 * Exemplos de uso:
 * 
 * // Cores customizadas
 * className="bg-primary text-light"
 * className="bg-gold text-dark-900"
 * className="bg-error text-light"
 * 
 * // Cores nativas do Tailwind
 * className="bg-cyan-500 text-white"
 * className="bg-blue-200 text-blue-900"
 * className="bg-yellow-300 text-gray-900"
 * className="bg-gray-900 text-white"
 */
