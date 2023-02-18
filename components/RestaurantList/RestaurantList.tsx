import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./restaurantList.module.css";

type RestaurantListProps = {
  name: string | null;
  image: string;
};

const RestaurantList: React.FC<RestaurantListProps> = (props) => {
  return (
    <Link href={`/menu/${props.name}`}>
      <div className={styles["restaurant-list"]}>
        <ul>
          <li>
            <div className={styles["restaurant-img"]}>
              <img src={props.image} alt={"Restaurant 1"} />
            </div>
            <h4
              style={{
                textTransform: "capitalize",
              }}
            >
              {props.name}
            </h4>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default RestaurantList;
