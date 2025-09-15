import { describe, it, expect } from 'vitest';
import {
  type UINavigationState,
  type UINavigationOptions,
  type UINavigationService,
  type UILocationHook,
  type UINavigationConfig,
} from './navigation';

describe('Navigation Types', () => {
  describe('UINavigationState', () => {
    it('should have correct structure', () => {
      const state: UINavigationState = {
        pathname: '/dashboard',
        search: '?tab=inbox&page=1',
        hash: '#section1',
        params: { userId: '123', orgId: '456' },
        searchParams: { tab: 'inbox', page: '1' },
      };

      expect(state.pathname).toBe('/dashboard');
      expect(state.search).toBe('?tab=inbox&page=1');
      expect(state.hash).toBe('#section1');
      expect(state.params.userId).toBe('123');
      expect(state.searchParams.tab).toBe('inbox');
    });

    it('should work with empty values', () => {
      const state: UINavigationState = {
        pathname: '/',
        search: '',
        hash: '',
        params: {},
        searchParams: {},
      };

      expect(state.pathname).toBe('/');
      expect(Object.keys(state.params)).toHaveLength(0);
    });
  });

  describe('UINavigationOptions', () => {
    it('should have optional properties', () => {
      const options1: UINavigationOptions = {};
      const options2: UINavigationOptions = {
        replace: true,
        state: { fromPage: 'home' },
        preventScrollReset: false,
      };

      expect(options1.replace).toBeUndefined();
      expect(options2.replace).toBe(true);
      expect(options2.state).toEqual({ fromPage: 'home' });
      expect(options2.preventScrollReset).toBe(false);
    });

    it('should accept various state types', () => {
      const options: UINavigationOptions = {
        state: {
          previousUrl: '/home',
          metadata: { timestamp: 1640995200 },
          flags: { isModal: true },
        },
      };

      expect(options.state?.previousUrl).toBe('/home');
      expect(options.state?.flags).toEqual({ isModal: true });
    });
  });

  describe('UINavigationService', () => {
    it('should define all required navigation methods', () => {
      // Mock implementation to verify interface structure
      const mockService: UINavigationService = {
        navigate: (path: string, options?: UINavigationOptions) => {
          expect(typeof path).toBe('string');
          if (options) {
            expect(typeof options).toBe('object');
          }
        },
        goBack: (fallbackPath?: string) => {
          if (fallbackPath) {
            expect(typeof fallbackPath).toBe('string');
          }
        },
        goForward: () => {},
        replace: (path: string, _options?: UINavigationOptions) => {
          expect(typeof path).toBe('string');
        },
        getCurrentState: (): UINavigationState => ({
          pathname: '/current',
          search: '',
          hash: '',
          params: {},
          searchParams: {},
        }),
        getCurrentPath: (): string => '/current',
        getSearchParams: (): Record<string, string> => ({}),
        getParams: (): Record<string, string> => ({}),
        canGoBack: (): boolean => true,
        canGoForward: (): boolean => false,
      };

      expect(typeof mockService.navigate).toBe('function');
      expect(typeof mockService.getCurrentState).toBe('function');
      expect(typeof mockService.canGoBack).toBe('function');
    });
  });

  describe('UILocationHook', () => {
    it('should have correct structure', () => {
      const location: UILocationHook = {
        pathname: '/dashboard/email',
        search: '?folder=inbox',
        searchParams: { folder: 'inbox' },
        hash: '#email-123',
        state: { previousRoute: '/home' },
        key: 'location-key-123',
      };

      expect(location.pathname).toBe('/dashboard/email');
      expect(location.searchParams.folder).toBe('inbox');
      expect(location.state.previousRoute).toBe('/home');
      expect(location.key).toBe('location-key-123');
    });

    it('should work with empty state', () => {
      const location: UILocationHook = {
        pathname: '/',
        search: '',
        searchParams: {},
        hash: '',
        state: {},
        key: 'root-key',
      };

      expect(Object.keys(location.state)).toHaveLength(0);
      expect(location.pathname).toBe('/');
    });
  });

  describe('UINavigationConfig', () => {
    it('should have all optional properties', () => {
      const config1: UINavigationConfig = {};
      const config2: UINavigationConfig = {
        enableBackGesture: true,
        enableSwipeGesture: false,
        animationType: 'slide',
        enableAnalytics: true,
        fallbackPath: '/home',
      };

      expect(config1.enableBackGesture).toBeUndefined();
      expect(config2.enableBackGesture).toBe(true);
      expect(config2.animationType).toBe('slide');
      expect(config2.fallbackPath).toBe('/home');
    });

    it('should accept valid animation types', () => {
      const slideConfig: UINavigationConfig = { animationType: 'slide' };
      const fadeConfig: UINavigationConfig = { animationType: 'fade' };
      const noneConfig: UINavigationConfig = { animationType: 'none' };

      expect(slideConfig.animationType).toBe('slide');
      expect(fadeConfig.animationType).toBe('fade');
      expect(noneConfig.animationType).toBe('none');
    });

    it('should work for React Native specific options', () => {
      const rnConfig: UINavigationConfig = {
        enableBackGesture: true,
        enableSwipeGesture: true,
        animationType: 'slide',
      };

      expect(rnConfig.enableBackGesture).toBe(true);
      expect(rnConfig.enableSwipeGesture).toBe(true);
    });
  });
});
