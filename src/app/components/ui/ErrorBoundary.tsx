import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-[#faf8f5]">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#e5dfd0] shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5 text-[#ae8f05]">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1a3c34] mb-2">
              {this.props.fallbackTitle || "Something went wrong"}
            </h2>
            <p className="text-sm text-[#5c5854] mb-6 leading-relaxed">
              {this.props.fallbackMessage ||
                "A temporary issue occurred while loading this page. Please try refreshing or returning to the home page."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  this.handleReset();
                  window.location.reload();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a3c34] text-white text-sm font-semibold hover:bg-[#132d27] transition-all shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#e5dfd0] text-[#1a3c34] text-sm font-semibold hover:bg-stone-50 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
