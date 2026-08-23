// Only the eager widget shell is re-exported here. The panel and its children
// are reached through the lazy import in ChatWidget.tsx — importing them from
// this barrel would pull them back into the initial bundle.
export { ChatWidget } from './ChatWidget';
export { ChatButton } from './ChatButton';
