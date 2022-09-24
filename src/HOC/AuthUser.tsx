import React, { useState } from "react";

interface VisibilityProps {
  isVisible?: boolean;
}

/**
 * HOC that adds an `isVisible` prop that stops a component from rendering if
 * `isVisible===false`
 * @param WrappedComponent component to be selectively hidden
 * @returns null if `isVisible` is false
 */
export function WithVisibility<P>(WrappedComponent: React.ComponentType<P>) {
  const VisibityControlled = (props: P & VisibilityProps) => {
    // if (!props.isVisible) {
    //   return null;
    // }

    return <WrappedComponent {...props} />;
  };

  return VisibityControlled;
}
