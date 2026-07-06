// Ambient declarations for CSS side-effect imports (e.g. `import "./globals.css"`).
// Silences TS2882 when the editor's TS server hasn't picked up Next's own CSS types.
declare module "*.css";
