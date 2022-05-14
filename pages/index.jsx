import { useState, useRef, useEffect } from "react";
import AuthorizedAccess from "../components/layouts/AuthorizedAccess";
import MetaTags from "../components/MetaTags";
import Navbar from "../components/Navbar";

export default function Home() {
  const [span, setSpan] = useState(
    "Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum Some sample text lorem ipsum"
  );

  const spanTextArea = useRef();
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

  useEffect(() => {
    if (spanTextArea.current) {
      spanTextArea.current.height = "auto";
      console.log(spanTextArea.current.scrollHeight);
      // spanTextArea.current.height = spanTextArea.current.scrollHeight + "px";
    }
  }, [span, spanTextArea]);

  return (
    <AuthorizedAccess>
      <MetaTags />
      <div className="min-h-screen flex flex-col gap-10 text-content-color">
        <Navbar />
        <div className="flex-1 md:mx-60">
          <textarea
            className="p-5 bg-black rounded-lg w-full"
            onSelect={handleSelect}
            readOnly={true}
            ref={spanTextArea}
            value={span}
          />
          <form onSubmit={handleSubmit}></form>
        </div>
      </div>
    </AuthorizedAccess>
  );
}
