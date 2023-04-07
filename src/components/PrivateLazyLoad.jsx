import React, { Suspense } from "react";
import Loader from "./Loader/Loader";
import { PrivateRoute } from "./PrivateRoute";
import ErrorBoundary from "./ErrorBoundary.jsx";

const ComponentName = (from, name) => {
  return React.lazy(() =>
    import(`../${from}`).then((module) => ({
      default: module[name],
    }))
  );
};

export const PrivateLazyLoad = (props) => {
  const Component = ComponentName(props.from, props.componentName);
  return (
    <PrivateRoute>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    </PrivateRoute>
  );
};
