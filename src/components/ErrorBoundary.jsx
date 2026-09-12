import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Terminal } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical System Failure:", error, errorInfo);
  }

  resetErrorBoundary() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThemeAwareFallback 
          error={this.state.error} 
          reset={this.resetErrorBoundary} 
        />
      );
    }
    return this.props.children;
  }
}

const ThemeAwareFallback = ({ error, reset }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6 overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full z-10 relative"
      >
        <div className="p-8 rounded-2xl border bg-card border-border shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-destructive/10 text-destructive">
              <AlertCircle size={32} />
            </div>

            <h1 className="text-2xl font-bold mb-3">Something Went Wrong</h1>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              An unexpected error occurred while rendering this page. We've logged the incident and our team is investigating.
            </p>

            {/* eslint-disable-next-line no-undef */}
            {process.env.NODE_ENV === 'development' && error && (
              <div className="w-full mb-6 p-4 bg-muted/50 rounded-lg border border-border text-left overflow-hidden">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-primary uppercase">
                  <Terminal size={12} />
                  <span>Error Stack Trace</span>
                </div>
                <pre className="text-[10px] font-mono text-muted-foreground overflow-auto max-h-32 leading-tight">
                  {error.toString()}
                </pre>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm bg-foreground text-background hover:bg-foreground/90"
            >
              <RefreshCw size={16} className="animate-spin-slow" />
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorBoundary;
