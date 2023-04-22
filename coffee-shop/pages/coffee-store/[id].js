import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cls from 'classnames';
import coffeeStores from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";

// runs on server
export function getStaticProps(staticProps) {
  const params = staticProps.params;

  return {
    props: {
      coffeeStore: coffeeStores.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  // paths key will determine which routes will be prerendered
  // return {
  //   paths: [{ params: { id: "0" } }, { params: { id: "0" } }],
  //   fallback: true,
  // };

  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: { id: coffeeStore.id.toString() },
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

  const { address, name, neighbourhood, imgUrl } = props.coffeeStore;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => {

  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link legacyBehavior href="/">
              <a>Back</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={300}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" height={24} width={24} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" height={24} width={24} />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="" height={24} width={24} />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvote} onClick={() => handleUpvoteButton()}>Upvote</button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
