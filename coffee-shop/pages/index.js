import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner";
import Image from "next/Image";
import Card from "../components/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleOnBannerBtnClick = () => {};

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View Stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        <div className={styles.cardLayout}>
        <Card
          name="DarkHorse Coffee"
          imgUrl="/static/hero-image.png"
          href="/coffee-store/darkhose-coffee"
        />
        </div>
      </main>
    </>
  );
}
