import useContextHook from "../../hooks/useContextHook";

const Login = () => {
  const { setIsAuthenticated } = useContextHook();

  const handlePressOnLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="flex bg-white flex-col justify-center items-center min-h-screen">
      <p className="text-xl text-green-500 font-bold">Login Page</p>
      <button
        onClick={handlePressOnLogin}
        className="mt-4 w-44 border-green-500 border p-2 rounded-md cursor-pointer bg-green-500 text-white font-bold"
      >
        Press Login
      </button>
    </div>
  );
};

export default Login;
