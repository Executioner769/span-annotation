import { useState } from "react";
import AuthorizedAccess from "../components/layouts/AuthorizedAccess";
import MetaTags from "../components/MetaTags";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

export default function Home() {
  const [span, setSpan] = useState("Loading...");

  const query1 = gql`
    query getSessionInformation {
      session_information {
        a_id
        last_updated_text
      }
    }
  `;
  const query2 = gql`
    query getText($t_id: Int!) {
      dataset(where: { t_id: { _eq: $t_id } }) {
        t_id
        content
      }
    }
  `;
  const [getText, { textLoading }] = useLazyQuery(query2, {
    onCompleted: (d) => {
      setSpan(d.dataset[0].content);
    },
  });
  const { sessionLoading } = useQuery(query1, {
    onCompleted: (d) => {
      getText({
        variables: { t_id: d.session_information[0].last_updated_text + 1 },
      });
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
