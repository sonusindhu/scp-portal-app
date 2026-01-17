/**
 * Reusable Loading Components
 * Provides consistent loading states across the application
 */

import React from "react";
import { Button, ButtonProps, CircularProgress, Skeleton } from "@mui/material";
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
    small: 24,
    medium: 40,
    large: 60,
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <CircularProgress size={sizeMap[size]} color={color} />
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
          <CircularProgress size={50} />
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
  startIcon,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={loading || disabled}
      startIcon={loading ? <CircularProgress size={20} /> : startIcon}
    >
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
  height,
  width = "100%",
  variant,
}) => {
  const skeletonVariant = variant || type;
  
  return (
    <div className="loading-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant={skeletonVariant}
          height={height}
          width={width}
          sx={{ marginBottom: 1 }}
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
            <Skeleton
              key={colIndex}
              variant="text"
              height={40}
              sx={{ marginBottom: 0.5, marginRight: 1 }}
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
      <CircularProgress size={size} />
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
        <CircularProgress size={60} />
        {message && <p className="page-loader-message">{message}</p>}
      </div>
    </div>
  );
};
