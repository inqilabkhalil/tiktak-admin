import type { ErrorBoundaryProps, ErrorBoundaryState } from "@/shared/types";
import { Component, type ErrorInfo } from "react";
import {
  useNavigate,
  useLocation,
  type NavigateFunction,
  type Location,
} from "react-router-dom";
import styles from "./ErrorBoundary.module.css";
import { Button } from "../Button";

interface Props extends ErrorBoundaryProps {
  navigate: NavigateFunction;
  location: Location;
}

class ErrorBoundaryClass extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.state.hasError &&
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = () => {
    window.location.reload();
  };

  handleBack = () => {
    this.props.navigate(-1);
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

            <div className={styles.buttonGroup}>
              <Button onClick={this.handleBack} className={styles.backButton}>
                ← Geri
              </Button>

              <Button
                type="primary"
                onClick={this.handleReset}
                className={styles.resetButton}
              >
                Yenidən cəhd et
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ErrorBoundaryClass {...props} navigate={navigate} location={location} />
  );
};
