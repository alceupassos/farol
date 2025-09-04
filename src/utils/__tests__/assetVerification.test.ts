import { describe, it, expect } from 'vitest';
import { validateAssets, createSafeAssetLoader, performHealthCheck } from '@/utils/assetVerification';

describe('Asset Verification Utils', () => {
  describe('validateAssets', () => {
    it('should validate valid assets', async () => {
      const validAssets = [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300'
      ];
      
      const result = await validateAssets(validAssets);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid assets', async () => {
      const invalidAssets = [
        'https://invalid-url-that-does-not-exist.com/image.jpg'
      ];
      
      const result = await validateAssets(invalidAssets);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('createSafeAssetLoader', () => {
    it('should create safe asset loader with fallbacks', () => {
      const loader = createSafeAssetLoader(
        '/primary-image.jpg',
        '/fallback-image.jpg',
        '#ff0000'
      );
      
      expect(loader.primary).toBe('/primary-image.jpg');
      expect(loader.fallback).toBe('/fallback-image.jpg');
      expect(loader.placeholder).toContain('data:image/svg+xml');
    });
  });

  describe('performHealthCheck', () => {
    it('should perform basic health checks', async () => {
      const result = await performHealthCheck();
      
      expect(result.status).toMatch(/healthy|warning|error/);
      expect(result.checks).toBeInstanceOf(Array);
      expect(result.checks.length).toBeGreaterThan(0);
      
      // Check that all required checks are present
      const checkNames = result.checks.map(check => check.name);
      expect(checkNames).toContain('React');
      expect(checkNames).toContain('CSS Variables');
      expect(checkNames).toContain('Router');
    });
  });
});