/**
 * Reusable Loading Components
 * Provides consistent loading states across the application
 */

import React from "react";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import "./Loading.css";

/**
 * LoadingSpinner - Basic spinner component
 * Use for centered loading indicators
 */
interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
  color?: "primary" | "secondary" | "inherit";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "medium", 
  className = "",
  color = "primary"
}) => {
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-15 h-15",
  };
  
  const colorMap = {
    primary: "text-[#1976d2]",
    secondary: "text-gray-500",
    inherit: "",
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <Loader2 className={`animate-spin ${sizeMap[size]} ${colorMap[color]}`} />
    </div>
  );
};

/**
 * LoadingOverlay - Full screen or container overlay with spinner
 * Use to block interaction during async operations
 */
interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  fullScreen?: boolean;
  transparent?: boolean;
  children?: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
  fullScreen = false,
  transparent = false,
  children,
}) => {
  if (!visible) return <>{children}</>;

  const overlayClass = `loading-overlay ${fullScreen ? "fullscreen" : ""} ${
    transparent ? "transparent" : ""
  }`;

  return (
    <>
      {children}
      <div className={overlayClass}>
        <div className="loading-overlay-content">
          <Loader2 className="animate-spin w-12 h-12 text-[#1976d2]" />
          {message && <p className="loading-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

/**
 * LoadingButton - Button with integrated loading state
 * Use for form submissions and actions that trigger async operations
 */
interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  children,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={loading || disabled}
      className={`flex items-center gap-2 ${buttonProps.className || ''}`}
    >
      {loading && <Loader2 className="animate-spin w-5 h-5" />}
      {loading && loadingText ? loadingText : children}
    </Button>
  );
};

/**
 * LoadingContainer - Container with loading state
 * Shows loading spinner or skeleton while content loads
 */
interface LoadingContainerProps {
  loading: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  skeleton?: React.ReactNode;
  minHeight?: string | number;
  children: React.ReactNode;
}

export const LoadingContainer: React.FC<LoadingContainerProps> = ({
  loading,
  error,
  empty,
  emptyMessage = "No data available",
  skeleton,
  minHeight = "200px",
  children,
}) => {
  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight }}>
        {skeleton || <LoadingSpinner />}
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container error" style={{ minHeight }}>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="loading-container empty" style={{ minHeight }}>
        <p className="empty-message">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * LoadingSkeleton - Skeleton placeholders for content
 * Use for better perceived performance during data loading
 */
interface LoadingSkeletonProps {
  type?: "text" | "rectangular" | "circular" | "rounded";
  count?: number;
  height?: number | string;
  width?: number | string;
  variant?: "text" | "rectangular" | "circular" | "rounded";
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = "text",
  count = 1,
  height = 20,
  width = "100%",
  variant,
}) => {
  const skeletonVariant = variant || type;
  
  const variantClass = {
    text: "rounded",
    rectangular: "rounded-none",
    circular: "rounded-full",
    rounded: "rounded-md",
  }[skeletonVariant];
  
  return (
    <div className="loading-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 mb-2 ${variantClass}`}
          style={{ 
            height: typeof height === 'number' ? `${height}px` : height,
            width: typeof width === 'number' ? `${width}px` : width
          }}
        />
      ))}
    </div>
  );
};

/**
 * TableLoadingSkeleton - Skeleton for table rows
 * Use while table data is loading
 */
interface TableLoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableLoadingSkeleton: React.FC<TableLoadingSkeletonProps> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div className="table-loading-skeleton">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="animate-pulse bg-gray-200 rounded mb-1 mr-2"
              style={{ height: '40px' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * InlineLoadingSpinner - Small inline spinner
 * Use for inline loading indicators (e.g., next to text)
 */
interface InlineLoadingSpinnerProps {
  size?: number;
  text?: string;
}

export const InlineLoadingSpinner: React.FC<InlineLoadingSpinnerProps> = ({
  size = 16,
  text,
}) => {
  return (
    <span className="inline-loading-spinner">
      <Loader2 className="animate-spin" style={{ width: size, height: size }} />
      {text && <span className="inline-loading-text">{text}</span>}
    </span>
  );
};

/**
 * PageLoader - Full page loading indicator
 * Use for initial page loads or route transitions
 */
interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message }) => {
  return (
    <div className="page-loader">
      <div className="page-loader-content">
        <Loader2 className="animate-spin w-15 h-15 text-[#1976d2]" />
        {message && <p className="page-loader-message">{message}</p>}
      </div>
    </div>
  );
};
