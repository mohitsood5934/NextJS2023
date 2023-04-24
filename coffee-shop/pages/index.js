import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner";
import Image from "next/Image";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "@/hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}
export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  // const [coffeeStores, setCoffeeStores] = useState(props.coffeeStores || []);
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const fetchStores = async (latLong) => {
      try {
        const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
        // setCoffeeStores(fetchedCoffeeStores);
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: { coffeeStores: fetchedCoffeeStores },
        });
      } catch (error) {
        setCoffeeStoresError(error?.message);
        console.log(`Error occurred while fetching coffee stores - ${error}`);
      }
    };

    if (latLong) {
      fetchStores(latLong);
    }
  }, [latLong]);

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>{coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        <div className={styles.sectionWrapper}>
          {coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Near me</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      name={coffeeStore.name}
                      imgUrl={coffeeStore.imgUrl}
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </>
          )}
          <div className={styles.sectionWrapper}>
            {props.coffeeStores.length > 0 && (
              <>
                <h2 className={styles.heading2}>Toronto stores</h2>
                <div className={styles.cardLayout}>
                  {props.coffeeStores.map((coffeeStore) => {
                    return (
                      <Card
                        key={coffeeStore.id}
                        name={coffeeStore.name}
                        imgUrl={
                          coffeeStore.imgUrl ||
                          "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        }
                        href={`/coffee-store/${coffeeStore.id}`}
                        className={styles.card}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
