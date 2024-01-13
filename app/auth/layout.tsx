type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="h-full flex items-center justify-center bg-sky-100">
      {children}

      </div>
    </>
  );
};

export default AuthLayout;
