// Import React at the top
import React from 'react';

/**
 * Performance monitoring utilities for React components
 * Helps identify performance bottlenecks in development
 */

/**
 * Measure and log component render time
 * Usage: Wrap component with this HOC to track render performance
 */
export function measureRenderTime<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  return (props: P) => {
    if (import.meta.env.DEV) {
      const startTime = performance.now();
      
      React.useEffect(() => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        if (renderTime > 16) { // Flag renders > 16ms (60fps threshold)
          console.warn(
            `⚠️ ${componentName} render took ${renderTime.toFixed(2)}ms`
          );
        }
      });
    }
    
    return React.createElement(Component, props);
  };
}

/**
 * Log component mount/unmount cycles
 * Useful for detecting unnecessary remounts
 */
export function useComponentLifecycle(componentName: string) {
  if (import.meta.env.DEV) {
    React.useEffect(() => {
      console.log(`✅ ${componentName} mounted`);
      
      return () => {
        console.log(`❌ ${componentName} unmounted`);
      };
    }, [componentName]);
  }
}

/**
 * Track why a component re-rendered
 * Logs which props/state changed to cause re-render
 */
export function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
  if (import.meta.env.DEV) {
    const previousProps = React.useRef<Record<string, any> | undefined>(undefined);

    React.useEffect(() => {
      if (previousProps.current) {
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        const changedProps: Record<string, any> = {};

        allKeys.forEach((key) => {
          if (previousProps.current![key] !== props[key]) {
            changedProps[key] = {
              from: previousProps.current![key],
              to: props[key],
            };
          }
        });

        if (Object.keys(changedProps).length > 0) {
          console.log('[why-did-you-update]', name, changedProps);
        }
      }

      previousProps.current = props;
    });
  }
}

/**
 * Measure API call performance
 */
export async function measureApiCall<T>(
  apiCall: () => Promise<T>,
  operationName: string
): Promise<T> {
  const startTime = performance.now();
  
  try {
    const result = await apiCall();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (import.meta.env.DEV) {
      console.log(
        `🌐 API ${operationName} took ${duration.toFixed(2)}ms`
      );
    }
    
    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (import.meta.env.DEV) {
      console.error(
        `❌ API ${operationName} failed after ${duration.toFixed(2)}ms`,
        error
      );
    }
    
    throw error;
  }
}

/**
 * Custom hook to debounce values (useful for search inputs)
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook to throttle function calls
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): T {
  const lastRan = React.useRef(Date.now());

  return React.useCallback(
    ((...args) => {
      const now = Date.now();
      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * Check if code is running on client side (browser)
 */
export const isClient = typeof window !== 'undefined';

/**
 * Get Web Vitals metrics (if available)
 * Requires web-vitals package: npm install web-vitals
 */
export async function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
      onCLS(onPerfEntry);
      onINP(onPerfEntry); // Replaces FID in web-vitals v4
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    } catch (error) {
      // web-vitals not installed
      console.log('web-vitals not available');
    }
  }
}
