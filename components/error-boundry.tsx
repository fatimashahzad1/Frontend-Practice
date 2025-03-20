'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {

            return (
                <div className="min-h-screen bg-[#1e62e5] flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                        <div className="flex justify-center mb-6">
                            <AlertTriangle className="h-16 w-16 text-[#1e62e5]" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {this.state.error?.message}
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-[#1e62e5] text-white px-6 py-2 rounded-md hover:bg-[#1854c7] transition-colors duration-200"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary