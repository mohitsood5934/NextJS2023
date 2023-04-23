import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cls from "classnames";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

// runs on server
export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  // paths key will determine which routes will be prerendered
  // return {
  //   paths: [{ params: { id: "0" } }, { params: { id: "0" } }],
  //   fallback: true,
  // };
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { id = "" } = router.query || {};

  const { address, neighbourhood , name, imgUrl } = props.coffeeStore;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => {};

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link legacyBehavior href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
            width={600}
            height={300}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/places.svg" width="24" height="24" />
              <p className={styles.text}>{address}</p>
            </div>
          )}

          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width="24" height="24" />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" height={24} width={24} />
            <p className={styles.text}>1</p>
          </div>
          <button
            className={styles.upvote}
            onClick={() => handleUpvoteButton()}
          >
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
