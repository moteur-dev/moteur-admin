import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Alert, Button, Typography } from 'antd';

const { Paragraph } = Typography;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{ padding: 24, maxWidth: 600, margin: '2rem auto' }}>
          <Alert
            type="error"
            showIcon
            message="Something went wrong"
            description={
              <>
                <Paragraph>An unexpected error occurred. You can try refreshing the page.</Paragraph>
                <Paragraph type="secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>
                  {this.state.error.message}
                </Paragraph>
                <Button type="primary" onClick={this.handleRetry} style={{ marginTop: 8 }}>
                  Try again
                </Button>
              </>
            }
          />
        </div>
      );
    }
    return this.props.children;
  }
}
