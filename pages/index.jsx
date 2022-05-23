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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("click");
  };

  const handleSelect = (event) => {
    if (isToxic === "Yes" && screenSize.current > 768) {
      const selection = event.target.value.substring(
        event.target.selectionStart,
        event.target.selectionEnd
      );
      console.log(selection);
    }
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
            <button
              hidden={screenSize.current > 768 || isToxic === "No"}
              className="p-2 text-lg bg-tertiary"
            >
              Add
            </button>
          </div>

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
