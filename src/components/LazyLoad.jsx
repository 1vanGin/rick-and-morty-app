import React, { Suspense } from "react";
import Loader from "./Loader/Loader";
import ErrorBoundary from "../hoc/ErrorBoundary";

const ComponentName = (from, name) => {
  return React.lazy(() =>
    import(`../${from}`).then((module) => ({
      default: module[name],
    }))
  );
};

export const LazyLoad = (props) => {
  const Component = ComponentName(props.from, props.componentName);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
