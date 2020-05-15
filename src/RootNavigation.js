// RootNavigation.js
import * as React from 'react';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// export function push(name, params) {
//   navigationRef.current?.push(name, params);
// }

// add other navigation functions that you need and export them
