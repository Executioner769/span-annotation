import AuthorizedAccess from "../components/layouts/AuthorizedAccess";
import MetaTags from "../components/MetaTags";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/react";
import { useAuthQuery } from "@nhost/react-apollo";

export default function Home() {
  const nhost = useNhostClient();
  const [span, setSpan] = useState("");
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
  const { client, loading, data, error, refetch } = useAuthQuery(query1, {
    onCompleted: (d) => {
      console.log(d);
      setSpan(d.session_information[0].dataset.content);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("click");
  };

  const handleSelect = (event) => {
    const selection = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd
    );
    // console.log(selection);
  };

  const getcho = async () => {
    const { data, error } = await nhost.graphql.request(query1);
    console.log(data, error);
    setSpan(data?.session_information[0].dataset.content);
  };

  useEffect(() => {
    // getcho();
  });

  return (
    <AuthorizedAccess>
      <MetaTags />
      <div className="min-h-screen flex flex-col gap-10 text-content-color">
        <Navbar />
        <div className="flex-1 md:mx-60 mx-10">
          {/* {loading || error ? (
            error ? (
              console.log("wth", error)
            ) : (
              <p>Loading...</p>
            )
          ) : (
            console.log(data)
          )} */}
          <TextArea handleSelect={handleSelect} span={span} />

          <form onSubmit={handleSubmit}>
            <label htmlFor="isToxic" className="flex items-center w-fit hover:">
              <input
                type="checkbox"
                id="isToxic"
                name="isToxic"
                className="w-5 h-5 mr-3"
              />
              <span>Is the given span toxic?</span>
            </label>
          </form>
        </div>
      </div>
    </AuthorizedAccess>
  );
}
