import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-red-50">
          <div className="p-8 text-center bg-white rounded shadow-md">
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              Something went wrong 😞
            </h1>
            <p className="mb-4 text-gray-700">
              An unexpected error occurred in the app.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white transition bg-red-600 rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    // Normally, render children
    return this.props.children;
  }
}

export default ErrorBoundary;