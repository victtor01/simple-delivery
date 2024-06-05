interface PrivateRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PrivateRouteProps) => {
  return children;
};

export { PublicRoute };
