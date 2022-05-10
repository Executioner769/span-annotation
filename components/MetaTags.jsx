import Head from "next/head";

const MetaTags = ({ title = "Span Annotation", desc }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={desc} />
    </Head>
  );
};

export default MetaTags;
