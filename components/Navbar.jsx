import { useSignOut } from "@nhost/react";

const Navbar = () => {
  const { signOut, isSuccess } = useSignOut();

  return (
    <nav className="flex py-2 px-10 bg-primary text-content-color justify-between items-center">
      <abbr
        title="Negative Sentiment Highlight Frontend"
        className="no-underline text-2xl"
      >
        span annotation
      </abbr>
      <button
        onClick={signOut}
        className="text-2xl bg-secondary p-2 rounded-md"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
