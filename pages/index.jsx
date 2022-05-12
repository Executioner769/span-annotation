import AuthorizedAccess from "../components/layouts/AuthorizedAccess";
import MetaTags from "../components/MetaTags";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <AuthorizedAccess>
      <MetaTags />
      <Navbar />
    </AuthorizedAccess>
  );
}
