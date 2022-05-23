import AuthorizedAccess from "../components/layouts/AuthorizedAccess";
import MetaTags from "../components/MetaTags";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { gql } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { useAuthQuery } from "@nhost/react-apollo";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const screenSize = useRef();
  const [span, setSpan] = useState("");
  const [isEntireTextToxic, setIsEntireTextToxic] = useState(false);
  const [toxicSpans, setToxicSpans] = useState([]);
  const [toxicSpanTextArr, setToxicSpanTextArr] = useState([]);
  const [isToxic, setIsToxic] = useState("No");
  const query1 = gql`
    query getSessionInformation {
      session_information {
        a_id
        text_to_annotate
        dataset {
          content
        }
      }
    }
  `;

  const { loading, error } = useAuthQuery(query1, {
    onCompleted: (d) => {
      setSpan(d.session_information[0].dataset.content);
    },
  });

  const handleSelect = (event) => {
    if (isToxic === "Yes" && screenSize.current > 768 && !isEntireTextToxic) {
      const selection = event.target.value.substring(
        event.target.selectionStart,
        event.target.selectionEnd
      );
      if (selection !== "") {
        setToxicSpanTextArr([...toxicSpanTextArr, selection]);
      }
    }
  };

  const handleDelete = (index) => {
    setToxicSpanTextArr(toxicSpanTextArr.filter((_v, i) => i !== index));
  };

  useEffect(() => {
    screenSize.current = window.innerWidth;
  });

  return (
    <AuthorizedAccess>
      <MetaTags />
      <div className="min-h-screen flex flex-col gap-5 text-content-color">
        <Navbar />
        <div className="flex-1 flex flex-col gap-5 md:mx-60 mx-10">
          {isToxic === "Yes" ? (
            <p className="md:text-2xl text-md text-center">{`Please select the words which make the text toxic${
              screenSize.current < 768
                ? ' (press the "Add" button after selecting the words)'
                : ""
            }`}</p>
          ) : (
            <></>
          )}
          <div className="md:flex-grow-0 flex-1 flex flex-col gap-3 md:justify-start justify-center">
            {loading || error ? (
              error ? (
                <>
                  <p>Some Error occured. Refreshing the page...</p>
                  {setTimeout(() => router.reload(), 1000)}
                </>
              ) : (
                <TextArea handleSelect={handleSelect} span={"Loading..."} />
              )
            ) : (
              <>
                <TextArea handleSelect={handleSelect} span={span} />
              </>
            )}
            {screenSize.current < 768 &&
            isToxic === "Yes" &&
            !isEntireTextToxic ? (
              <button className="p-2 text-lg bg-tertiary">Add</button>
            ) : (
              <></>
            )}
          </div>
          {isToxic === "Yes" ? (
            <div className="self-center text-lg md:w-[56rem] w-full flex flex-col gap-3">
              <div className="flex justify-between">
                <span>Toxic spans: </span>
                {toxicSpanTextArr.length > 0 ? (
                  <button
                    className="px-3 bg-danger rounded"
                    onClick={() => setToxicSpanTextArr([])}
                  >
                    Remove all
                  </button>
                ) : (
                  <></>
                )}
              </div>
              {toxicSpanTextArr.length === 0 ? (
                <>
                  <p className="self-center">
                    Is the entire text toxic? Selected:{" "}
                    <span
                      className={`rounded px-1 bg-${
                        isEntireTextToxic ? "success" : "danger"
                      }`}
                    >
                      {"" + isEntireTextToxic}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="bg-success rounded w-full py-1"
                      onClick={() => setIsEntireTextToxic(true)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-danger rounded w-full py-1"
                      onClick={() => setIsEntireTextToxic(false)}
                    >
                      No
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {toxicSpanTextArr.map((span, index) => (
                <div className="flex gap-3 w-full justify-between" key={index}>
                  <span>{span + " "}</span>
                  <button
                    className="px-3 bg-danger rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          <p className="text-center md:text-2xl text-xl">
            Is the text given above toxic? Selected:{" "}
            <span
              className={`rounded px-1 bg-${
                isToxic === "Yes" ? "success" : "danger"
              }`}
            >
              {isToxic}
            </span>
          </p>
          <div className="flex justify-between mb-7 gap-3">
            <button
              className="bg-success py-2 w-full rounded text-2xl"
              onClick={() => setIsToxic("Yes")}
            >
              Yes
            </button>
            <button
              className="bg-danger py-2 w-full rounded text-2xl"
              onClick={() => setIsToxic("No")}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </AuthorizedAccess>
  );
}
