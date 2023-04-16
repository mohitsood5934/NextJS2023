import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  const { id = "" } = router.query || {};
  return (
    <div>
      Coffee Store Page {id}
      <Link  legacyBehavior  href='/'>
        <a>Back</a></Link>
    </div>
  )
};

export default CoffeeStore;
