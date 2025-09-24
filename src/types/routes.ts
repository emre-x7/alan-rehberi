export type AppRoute = {
  path: string;
  element: React.ComponentType;
  isProtected?: boolean;
  title?: string;
};
