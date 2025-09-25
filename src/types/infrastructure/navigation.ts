import type { Optional } from '../common';

/**
 * UI-level navigation state interface for web and mobile applications
 * This provides cross-platform navigation abstractions that work with different routing systems
 */

export interface UINavigationState {
  currentPath: string;
  previousPath: Optional<string>;
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export interface UINavigationOptions {
  replace: Optional<boolean>;
  state: Optional<Record<string, unknown>>;
  preventScrollReset: Optional<boolean>;
}

export interface UINavigationService {
  navigate(path: string, options: Optional<UINavigationOptions>): void;
  goBack(fallbackPath: Optional<string>): void;
  goForward(): void;
  replace(path: string, options: Optional<UINavigationOptions>): void;
  getCurrentState(): UINavigationState;
  getCurrentPath(): string;
  getSearchParams(): Record<string, string>;
  getParams(): Record<string, string>;
  canGoBack(): boolean;
  canGoForward(): boolean;
  addListener(listener: (state: UINavigationState) => void): () => void;
  isSupported(): boolean;
}

export interface UINavigationHook {
  navigate: (path: string, options: Optional<UINavigationOptions>) => void;
  goBack: (fallbackPath: Optional<string>) => void;
  replace: (path: string, options: Optional<UINavigationOptions>) => void;
  currentPath: string;
  searchParams: Record<string, string>;
  params: Record<string, string>;
  canGoBack: boolean;
  isSupported: boolean;
}

export interface UILocationHook {
  pathname: string;
  search: string;
  searchParams: Record<string, string>;
  hash: string;
  state: Record<string, unknown>;
  key: string;
}

export interface UINavigationConfig {
  enableBackGesture: Optional<boolean>; // React Native specific
  enableSwipeGesture: Optional<boolean>; // React Native specific
  animationType: Optional<'slide' | 'fade' | 'none'>; // React Native specific
  enableAnalytics: Optional<boolean>; // Track navigation events
  fallbackPath: Optional<string>; // Default fallback path
}
