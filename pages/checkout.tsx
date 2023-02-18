import { useState } from "react";
import type { NextPage } from "next";
import { useAppSelector, useAppDispatch } from "../features/hooks";

import { addProducts } from "@/features/cartSlice";
import MenuItem from "@/components/MenuItem/MenuItem";
import Loader from "@/components/UI/Loader/Loader";
import styles from "@/styles/Checkout.module.css";

type Products = {
  id: number;
  quantity: number;
  sellingPrice: number;
}[];
const Checkout: NextPage = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const products = useAppSelector<Products>(
    (state) => state.cartSlice.products
  );

  const totalPrice = products.reduce((acc, curr) => {
    if (curr.quantity > 0) {
      return acc + curr.quantity * curr.sellingPrice;
    } else {
      return acc;
    }
  }, 0);

  const onPlaceOrder = async () => {
    setLoading(true);

    await fetch("https://apimocha.com/ecatering-ui-test/order", {
      method: "POST",
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("orderHistory", JSON.stringify(products));
        setOrderPlaced(true);
        setLoading(false);
        dispatch(addProducts([]));
      } else {
        setOrderPlaced(true);
        setLoading(false);
      }
    });
  };

  return orderPlaced ? (
    <div className={styles.main}>Order Placed Successfully</div>
  ) : (
    <div className={styles.main}>
      <MenuItem category={products} />
      <div className={styles["total-div"]}>
        <p>Total</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
      <div className={styles["place-order-div"]}>
        {loading ? <Loader /> : null}
        <button
          onClick={onPlaceOrder}
          className={
            Math.floor(totalPrice) > 0
              ? styles["button"]
              : styles["button-disabled"]
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
