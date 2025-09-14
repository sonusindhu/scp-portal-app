import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // Optionally log error
    // console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 32, textAlign: "center" }}>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
