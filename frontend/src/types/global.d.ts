// Declares type for regular CSS imports (e.g., import './styles.css')
// Allows importing CSS files without TypeScript errors
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Declares type for CSS Module imports (e.g., import styles from './Component.module.css')
// Provides autocomplete and type safety for CSS Module class names
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
