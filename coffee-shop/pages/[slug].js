import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const Slug = () => {
  const router = useRouter();
  const { slug = "" } = router.query || {};

  return (
    <React.Fragment>
      <Head>
        <title>{slug}</title>
      </Head>
      <div>{`Hello ${slug}`}</div>
    </React.Fragment>
  );
};

export default Slug;
