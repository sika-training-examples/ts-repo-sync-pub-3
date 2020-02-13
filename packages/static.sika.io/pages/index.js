import React from "react";

import "../css";
import Head from "next/head";
import Markdown from "@app/common/components/Markdown";

const Index = () => (
  <>
    <Head>
      <title>static.sika.io</title>
      <link rel="icon" type="image/png" href="/icon.png" />
      <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans&display=swap"
        rel="stylesheet"
      />
    </Head>
    <style jsx global>{`
      * {
        font-family: "IBM Plex Sans", sans-serif;
      }
      h1,
      h2 {
        font-family: "IBM Plex Mono", monospace;
      }
    `}</style>
    <div className="mt-4">
      <h1>static.sika.io</h1>
      <p>Static content for other websites or externals (conferences, ...).</p>
      <h2>Files</h2>
      <Markdown
        source={`
- [ondrejsika3.jpg](/files/photos/ondrejsika3.jpg) - \`https://static.sika.io/files/photos/ondrejsika3.jpg\`
- [ondrejsika3_200px.jpg](/files/photos/ondrejsika3_200px.jpg) - \`https://static.sika.io/files/photos/ondrejsika3_200px.jpg\`
- [ondrejsika3_32px.jpg](/files/photos/ondrejsika3_32px.jpg) - \`https://static.sika.io/files/photos/ondrejsika3_32px.jpg\`
- [ondrejsika3_32px.png](/files/photos/ondrejsika3_32px.png) - \`https://static.sika.io/files/photos/ondrejsika3_32px.png\`

Aliases for \`ondrejsika3*\`

- [ondrejsika.jpg](/files/photos/ondrejsika.jpg) - \`https://static.sika.io/files/photos/ondrejsika.jpg\`
- [ondrejsika_200px.jpg](/files/photos/ondrejsika_200px.jpg) - \`https://static.sika.io/files/photos/ondrejsika_200px.jpg\`
- [ondrejsika_32px.jpg](/files/photos/ondrejsika_32px.jpg) - \`https://static.sika.io/files/photos/ondrejsika_32px.jpg\`
- [ondrejsika_32px.png](/files/photos/ondrejsika_32px.png) - \`https://static.sika.io/files/photos/ondrejsika3_32px.png\`
`}
      />
    </div>
  </>
);

export default Index;