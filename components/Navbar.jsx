import { useSignOut } from "@nhost/react";

const Navbar = () => {
  const { signOut, isSuccess } = useSignOut();

  return (
    <nav className="flex py-2  md:px-60 px-10 bg-primary text-content-color justify-between items-center md:text-2xl text-xl">
      <abbr
        title="Negative Sentiment Highlight Frontend"
        className="no-underline"
      >
        span annotation
      </abbr>
      <button onClick={signOut} className="bg-secondary p-2 rounded-md">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
