const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log(username, password);
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-center bg-no-repeat bg-cover bg-[url('https://picsum.photos/id/508/1600/900.jpg?grayscale')]">
      <div className="p-10 backdrop-blur-2xl bg-opacity-30 h-fit w-fit flex flex-col gap-4 items-center justify-center bg-black">
        <p className="p-3 text-white text-3xl">Login</p>
        <form
          className="bg-yellow-700 flex flex-col p-10 rounded-md gap-5"
          onSubmit={handleLogin}
        >
          <input type="text" name="username" className="p-1  rounded-md" />
          <input type="password" name="password" className="p-1  rounded-md" />
          <button type="submit" className="bg-violet-500 rounded-md py-1">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
