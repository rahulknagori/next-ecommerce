import { useState, useEffect } from "react";
import Router from "next/router";
import Head from "../components/Head";
import styles from "@/styles/Home.module.css";
import RestaurantList from "../components/RestaurantList/RestaurantList";

type Vendor = {
  id: number;
  name: string;
  logo: string;
};

const Home = ({
  data = {
    result: {
      vendors: [],
    },
  },
}) => {
  const {
    result: { vendors },
  } = data;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  return (
    <>
      <Head content="Order Tasty Foods"></Head>
      <main className={styles.main}>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className={styles["restaurant-main-div"]}>
            {vendors?.map((vendor: Vendor) => {
              return (
                <RestaurantList
                  name={vendor?.name || "restaurant"}
                  key={vendor?.id}
                  image={
                    vendor?.logo ||
                    `https://via.placeholder.com/150x150.png?text=${"Restaurant 1"}`
                  }
                ></RestaurantList>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`https://apimocha.com/ecatering-ui-test/outlets`);
  const data = await res.json();

  return { props: { data } };
}
export default Home;
