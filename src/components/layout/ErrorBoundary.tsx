// components/layout/ErrorBoundary.tsx
import  { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorMessage } from '@/components/common';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="py-8">
          <ErrorMessage
            title="Something went wrong"
            message={this.state.error?.message || 'An unexpected error occurred'}
            showRetry
            onRetry={this.handleRetry}
            fullWidth
          />
        </div>
      );
    }

    return this.props.children;
  }
}