import { useState } from "react";
import AuthorizedAccess from "../components/layouts/AuthorizedAccess";
import MetaTags from "../components/MetaTags";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";

export default function Home() {
  const [span, setSpan] = useState(
    "Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("click");
  };

  const handleSelect = (event) => {
    const selection = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd
    );
    console.log(selection);
  };

  return (
    <AuthorizedAccess>
      <MetaTags />
      <div className="min-h-screen flex flex-col gap-10 text-content-color">
        <Navbar />
        <div className="flex-1 md:mx-60">
          <TextArea handleSelect={handleSelect} span={span} />
          <form onSubmit={handleSubmit}></form>
        </div>
      </div>
    </AuthorizedAccess>
  );
}
