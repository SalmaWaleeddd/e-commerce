// components/common/EmptyState.tsx
import React, { ReactNode } from 'react';
import { FileText, Package, Plus, RefreshCw } from 'lucide-react';
import {  
  EmptyStateType,
  getEmptyStateConfig 
} from '@/constants';

export interface EmptyStateProps {
  /** Type determines default icon and message */
  type?: EmptyStateType;
  /** Custom icon */
  icon?: ReactNode;
  /** Title/heading */
  title?: string;
  /** Description text */
  description?: string | ReactNode;
  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  /** Additional CSS classes */
  className?: string;
  /** Whether to show a border */
  bordered?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Full height container */
  fullHeight?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'default',
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
  bordered = false,
  compact = false,
  fullHeight = false,
}) => {
  const config = getEmptyStateConfig(type);
  const IconComponent = config.icon;
  
  // Use custom icon or render the icon component with proper classes
  const displayIcon = icon || <IconComponent className="h-12 w-12" />;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div
      className={`
        ${compact ? 'py-8' : 'py-12'} 
        ${bordered ? 'border-2 border-dashed border-gray-300 rounded-lg' : ''}
        ${fullHeight ? 'min-h-[50vh]' : ''}
        flex flex-col items-center justify-center text-center w-full
        ${className}
      `}
      data-empty-state-type={type}
    >
      <div className="text-gray-400 mb-4" aria-hidden="true">
        {displayIcon}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {displayTitle}
      </h3>
      
      <div className="text-gray-500 max-w-md mb-6">
        {typeof displayDescription === 'string' ? (
          <p className="px-4">{displayDescription}</p>
        ) : (
          displayDescription
        )}
      </div>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={primaryAction.onClick === undefined}
            >
              {primaryAction.icon && (
                <span className="mr-2" aria-hidden="true">{primaryAction.icon}</span>
              )}
              {primaryAction.label}
            </button>
          )}
          
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={secondaryAction.onClick === undefined}
            >
              {secondaryAction.icon && (
                <span className="mr-2" aria-hidden="true">{secondaryAction.icon}</span>
              )}
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Convenience components
export const EmptyProductsState: React.FC<Omit<EmptyStateProps, 'type'>> = (props) => (
  <EmptyState type="products" {...props} />
);

export const EmptySearchState: React.FC<Omit<EmptyStateProps, 'type'> & { searchQuery?: string }> = ({ 
  searchQuery, 
  ...props 
}) => {
  const description = searchQuery 
    ? `No results found for "${searchQuery}". Try different keywords or adjust your filters.`
    : undefined;
    
  return (
    <EmptyState
      type="search"
      description={description}
      {...props}
    />
  );
};

export const EmptyCartState: React.FC<Omit<EmptyStateProps, 'type'> & { showBrowseButton?: boolean }> = ({ 
  showBrowseButton = true,
  ...props 
}) => {
  const primaryAction = showBrowseButton 
    ? {
        label: 'Browse Products',
        onClick: () => {
          if (typeof window !== 'undefined') {
            window.location.href = '/products';
          }
        },
        icon: <Plus className="h-4 w-4" />,
      }
    : undefined;

  return (
    <EmptyState
      type="cart"
      primaryAction={primaryAction}
      {...props}
    />
  );
};

export const LoadingErrorState: React.FC<Omit<EmptyStateProps, 'type'> & {
  onRetry: () => void;
  errorMessage?: string;
}> = ({ onRetry, errorMessage, ...props }) => (
  <EmptyState
    title="Failed to load data"
    description={errorMessage || 'An error occurred while loading the data.'}
    icon={<RefreshCw className="h-12 w-12" />}
    primaryAction={{
      label: 'Retry',
      onClick: onRetry,
      icon: <RefreshCw className="h-4 w-4" />,
    }}
    fullHeight
    {...props}
  />
);

// Additional specialized empty states
export const NoPermissionState: React.FC<Omit<EmptyStateProps, 'type'>> = (props) => (
  <EmptyState
    title="Access Denied"
    description="You don't have permission to view this content."
    icon={<FileText className="h-12 w-12" />}
    {...props}
  />
);

export const EmptyFavoritesState: React.FC<Omit<EmptyStateProps, 'type'>> = (props) => (
  <EmptyState
    title="No favorites yet"
    description="Save your favorite products and they will appear here."
    icon={<Package className="h-12 w-12" />}
    {...props}
  />
);

export default EmptyState;