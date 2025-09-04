/**
 * Asset verification utilities to prevent missing asset issues
 */

export interface AssetValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates that all required assets exist
 */
export const validateAssets = async (
  requiredAssets: string[]
): Promise<AssetValidationResult> => {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const asset of requiredAssets) {
    try {
      // Try to load the asset
      const response = await fetch(asset);
      if (!response.ok) {
        errors.push(`Asset not found: ${asset}`);
      }
    } catch (error) {
      errors.push(`Failed to load asset: ${asset} - ${error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Creates a safe asset loader with fallbacks
 */
export const createSafeAssetLoader = (
  primaryAsset: string,
  fallbackAsset?: string,
  placeholderColor: string = 'hsl(var(--muted))'
) => {
  return {
    primary: primaryAsset,
    fallback: fallbackAsset,
    placeholder: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="${placeholderColor}"/>
        <text x="200" y="150" text-anchor="middle" fill="white" font-family="Arial" font-size="16">
          Image Loading...
        </text>
      </svg>
    `)}`
  };
};

/**
 * Health check for the application
 */
export const performHealthCheck = async (): Promise<{
  status: 'healthy' | 'warning' | 'error';
  checks: Array<{ name: string; status: string; message?: string }>;
}> => {
  const checks = [];

  // Check if React is loaded
  checks.push({
    name: 'React',
    status: typeof window !== 'undefined' && window.React ? 'ok' : 'error',
    message: typeof window !== 'undefined' && window.React ? 'Loaded' : 'React not loaded'
  });

  // Check if essential CSS variables are defined
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue('--primary');
  checks.push({
    name: 'CSS Variables',
    status: primaryColor ? 'ok' : 'warning',
    message: primaryColor ? 'Design system loaded' : 'Design system variables missing'
  });

  // Check if router is working
  checks.push({
    name: 'Router',
    status: window.location ? 'ok' : 'error',
    message: window.location ? 'Navigation available' : 'Router not available'
  });

  const hasErrors = checks.some(check => check.status === 'error');
  const hasWarnings = checks.some(check => check.status === 'warning');

  return {
    status: hasErrors ? 'error' : hasWarnings ? 'warning' : 'healthy',
    checks
  };
};