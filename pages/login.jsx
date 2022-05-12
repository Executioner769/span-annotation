import { useRouter } from "next/router";
import { useSignInEmailPassword } from "@nhost/react";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    try {
      signInEmailPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isSuccess) router.push("/");
    else if (isError) console.log(error);
  }, [isSuccess, isError, error]);

  return (
    <div className="h-screen w-full flex justify-center items-center login-pattern text-content-color">
      <div className="p-10 backdrop-blur-sm bg-opacity-30 h-fit w-fit flex flex-col gap-4 items-center justify-center bg-black rounded-md">
        <p className="p-3 text-3xl">Login</p>
        <form
          className=" bg-primary flex flex-col p-10 rounded-md gap-5 w-96"
          onSubmit={handleLogin}
        >
          <div className="flex items-center gap-3">
            <div className="w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              className="p-1 rounded-md text-black w-full"
              placeholder="email"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              className="p-1 rounded-md text-black w-full"
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className={`bg-secondary rounded-md py-1${
              isLoading ? " bg-opacity-70" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
