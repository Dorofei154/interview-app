import React, { ErrorInfo, PropsWithChildren, Suspense } from "react";
import { ERRORS } from "../../constants/error";
import { ErrorBoundaryState } from "./ErrorBoundaryState.interface";
import { ErrorMessage } from "../../components";

class ErrorBoundaries extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Suspense fallback="">
          <ErrorMessage message={ERRORS.UNEXPECTED} />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundaries;
