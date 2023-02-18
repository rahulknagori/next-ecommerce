import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useAppSelector } from "../../features/hooks";

import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const products = useAppSelector((state) => state.cartSlice.products);

  const filterZeroQuantityProducts = products.filter(
    (item: { quantity: number }) => {
      return item.quantity !== 0;
    }
  );

  return (
    <nav className={styles["nav"]}>
      <ul>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link
          style={{
            textDecoration: "none",
          }}
          href="/checkout"
        >
          <div className={styles["checkout-div"]}>
            <p>Checkout</p>
            <Image
              alt="shopping-cart"
              width={20}
              height={20}
              src="/shopping-cart.png"
            />
            <span>{filterZeroQuantityProducts?.length || 0}</span>
          </div>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
