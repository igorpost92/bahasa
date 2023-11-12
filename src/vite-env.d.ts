//1/ <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.svg' {
  import React = require('react');
  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}

type CSSModuleClasses = { readonly [key: string]: string };
declare module '*.module.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}
