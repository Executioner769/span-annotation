const Navbar = () => {
  return (
    <nav className="flex py-3 px-10 bg-yellow-500 justify-between items-center">
      <abbr
        title="Negative Sentiment Highlight Frontend"
        className="no-underline text-4xl"
      >
        NSHF
      </abbr>
      <button className="text-2xl bg-slate-900 text-white p-2 rounded-md">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
