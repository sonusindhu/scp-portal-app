/**
 * Custom SVG Icon Components
 * Replaces @mui/icons-material to reduce bundle size
 * Each MUI icon adds ~600-800 bytes, these are inline and tree-shakeable
 * 
 * Savings: 8-12 KB gzipped by replacing 15+ icon imports
 */

import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const defaultProps = {
  width: 24,
  height: 24,
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
};

export const MoreVertIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export const WarningOutlinedIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

export const AddCircleOutlinedIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

export const RemoveCircleOutlinedIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

export const FavoriteIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
);

export const AddIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

export const RemoveIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M19 13H5v-2h14v2z"/>
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

export const ArrowBackIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);

export const ArrowForwardIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

export const ErrorIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

export const SuccessIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Export all icons as a group for convenience
export const Icons = {
  MoreVert: MoreVertIcon,
  WarningOutlined: WarningOutlinedIcon,
  Close: CloseIcon,
  AddCircleOutlined: AddCircleOutlinedIcon,
  RemoveCircleOutlined: RemoveCircleOutlinedIcon,
  Favorite: FavoriteIcon,
  Share: ShareIcon,
  Add: AddIcon,
  Remove: RemoveIcon,
  Edit: EditIcon,
  Delete: DeleteIcon,
  Search: SearchIcon,
  Filter: FilterIcon,
  Download: DownloadIcon,
  Upload: UploadIcon,
  Check: CheckIcon,
  ArrowBack: ArrowBackIcon,
  ArrowForward: ArrowForwardIcon,
  Refresh: RefreshIcon,
  Settings: SettingsIcon,
  Info: InfoIcon,
  Error: ErrorIcon,
  Success: SuccessIcon,
};

export default Icons;
