import "../styles/globals.css";
import { NhostClient, NhostNextProvider } from "@nhost/nextjs";

const nhost = new NhostClient({
  backendUrl: "https://ciofndttatidxalcwwdq.nhost.run",
});

function SpanAnnotation({ Component, pageProps }) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <Component {...pageProps} />
    </NhostNextProvider>
  );
}

export default SpanAnnotation;
