import AuthorizedAccess from "../components/layouts/AuthorizedAccess";
import MetaTags from "../components/MetaTags";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { gql } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { useAuthQuery } from "@nhost/react-apollo";
import { useRouter } from "next/router";
import { useAuthMutation } from "../libs/useAuthMutation";

import { range } from "../libs/rangefunction";
import { useUserId } from "@nhost/react";

export default function Home() {
  const router = useRouter();
  const screenSize = useRef();
  const [span, setSpan] = useState("");
  const [isEntireTextToxic, setIsEntireTextToxic] = useState(false);
  const [toxicSpans, setToxicSpans] = useState([]);
  const [toxicSpanTextArr, setToxicSpanTextArr] = useState([]);
  const [isToxic, setIsToxic] = useState("No");
  const userId = useUserId();

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
  const query2 = gql`
    mutation submitAnnotation(
      $a_id: uuid
      $t_id: Int
      $text: String
      $label: String
      $span: jsonb
    ) {
      insert_annotations(
        objects: { t_id: $t_id, content: $text, label: $label, span: $span }
      ) {
        returning {
          a_id
          t_id
          content
          label
          span
        }
      }
      update_session_information(
        _inc: { text_to_annotate: 1 }
        where: { a_id: { _eq: $a_id } }
      ) {
        returning {
          a_id
          text_to_annotate
        }
      }
    }
  `;

  const { loading, data, error } = useAuthQuery(query1, {
    onCompleted: (d) => {
      setSpan(d.session_information[0].dataset.content);
    },
  });

  const [saveAnnotation, {}] = useAuthMutation(query2, {
    refetchQueries: [query1],
  });

  const handleSelect = (event) => {
    if (isToxic === "Yes" && screenSize.current > 768 && !isEntireTextToxic) {
      const selection = event.target.value.substring(
        event.target.selectionStart,
        event.target.selectionEnd
      );
      if (selection !== "") {
        setToxicSpans(
          [
            ...toxicSpans,
            [event.target.selectionStart, event.target.selectionEnd],
          ].sort()
        );
        setToxicSpanTextArr([...toxicSpanTextArr, selection]);
      }
    }
  };

  const handleDelete = (index) => {
    setToxicSpans(toxicSpans.filter((_v, i) => i !== index));
    setToxicSpanTextArr(toxicSpanTextArr.filter((_v, i) => i !== index));
  };

  const handleAdd = () => {
    const textArea = document.getElementById("spanText");
    const selection = textArea.value.substring(
      textArea.selectionStart,
      textArea.selectionEnd
    );
    if (selection !== "") {
      setToxicSpans(
        [...toxicSpans, [textArea.selectionStart, textArea.selectionEnd]].sort()
      );
      setToxicSpanTextArr([...toxicSpanTextArr, selection]);
    }
  };

  const handleSubmit = () => {
    let spanArr = [];
    if (isToxic === "Yes") {
      spanArr = toxicSpans.reduce(
        (prevArr, currentValue) => [
          ...prevArr,
          ...range(currentValue[0], currentValue[1]),
        ],
        []
      );
      spanArr = [...new Set(spanArr.sort((a, b) => a - b))];
    } else if (isEntireTextToxic) spanArr = [0, span.length];
    saveAnnotation({
      variables: {
        a_id: userId,
        t_id: data.session_information[0].text_to_annotate,
        text: span,
        label: isToxic.toLowerCase(),
        span: spanArr,
      },
    });
    setIsToxic("No");
    setIsEntireTextToxic(false);
    setToxicSpanTextArr([]);
    setToxicSpans([]);
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
              <TextArea handleSelect={handleSelect} span={span} />
            )}
            {screenSize.current < 768 &&
            isToxic === "Yes" &&
            !isEntireTextToxic ? (
              <button className="p-2 text-lg bg-tertiary" onClick={handleAdd}>
                Add
              </button>
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
        <div className="md:mx-60 mx-10 my-5">
          <button
            className="bg-tertiary w-full p-3 rounded text-content-color text-2xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </AuthorizedAccess>
  );
}
