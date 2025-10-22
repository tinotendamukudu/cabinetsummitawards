import React from 'react'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo)
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            
            <h1>Oops! Something went wrong</h1>
            <p className="error-message">
              We're sorry for the inconvenience. An unexpected error has occurred.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-stack">
                  <strong>Error:</strong> {this.state.error.toString()}
                  <br />
                  <br />
                  <strong>Component Stack:</strong>
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="error-actions">
              <button className="btn btn-primary" onClick={this.handleReload}>
                Reload Page
              </button>
              <button className="btn btn-secondary" onClick={this.handleGoHome}>
                <FaHome /> Go to Home
              </button>
            </div>

            <p className="error-help">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
