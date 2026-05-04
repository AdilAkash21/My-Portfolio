var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    __publicField(this, "resetErrorBoundary", () => {
      this.setState({ hasError: false, error: void 0 });
    });
    this.state = { hasError: false, error: void 0 };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }
  render() {
    if (this.state.hasError) {
      return <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="max-w-md w-full mx-4 p-8 bg-card rounded-lg border border-destructive/20 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              An unexpected error occurred. The error has been logged and our team will be notified.
            </p>
            {import.meta.env.DEV && this.state.error && <div className="mt-4 p-3 bg-muted rounded text-xs font-mono text-muted-foreground overflow-auto max-h-32">
                {this.state.error.toString()}
              </div>}
            <button
        onClick={this.resetErrorBoundary}
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
      >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        </div>;
    }
    return this.props.children;
  }
}
var stdin_default = ErrorBoundary;
export {
  ErrorBoundary,
  stdin_default as default
};
