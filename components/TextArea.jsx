import { useRef, useEffect } from "react";

const TextArea = ({ span, handleSelect }) => {
  const textAreaRef = useRef();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [textAreaRef]);

  return (
    <textarea
      className="p-5 bg-black rounded-lg w-full"
      onSelect={handleSelect}
      readOnly={true}
      ref={textAreaRef}
      value={span}
    />
  );
};

export default TextArea;
