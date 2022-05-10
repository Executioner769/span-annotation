const Navbar = () => {
  return (
    <nav className="flex py-2 px-10 bg-yellow-500 justify-between items-center">
      <abbr
        title="Negative Sentiment Highlight Frontend"
        className="no-underline text-2xl"
      >
        span annotation
      </abbr>
      <button className="text-2xl bg-slate-900 text-white p-2 rounded-md">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
