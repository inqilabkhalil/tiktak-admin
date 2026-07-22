import type { ErrorBoundaryProps, ErrorBoundaryState } from "@/shared/types";
import { Component, type ErrorInfo } from "react";
import styles from "./ErrorBoundary.module.css";
import { Button } from "../Button";
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary cought an error:", error, errorInfo);
  }
  handleReset = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>Nəsə səhv getdi</h1>
            <p className={styles.description}>
              Bu səhifəni göstərərkən problem yarandı. Zəhmət olmasa yenidən
              cəhd edin.
            </p>
            <Button 
            type= "primary" 
            onClick={this.handleReset}
            className={styles.resetButton}
            >
                Yenidən cəhd et
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
