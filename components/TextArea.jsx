import { useRef, useEffect } from "react";

const TextArea = ({ span, handleSelect, id = "spanText" }) => {
  const textAreaRef = useRef();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [textAreaRef, span]);

  return (
    <textarea
      className="px-5 py-7 md:text-3xl text-2xl md:leading-relaxed bg-black rounded-lg w-full"
      id={id}
      onSelect={handleSelect}
      readOnly={true}
      ref={textAreaRef}
      value={span}
    />
  );
};

export default TextArea;
