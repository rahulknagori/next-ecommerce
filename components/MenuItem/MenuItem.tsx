import React from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../features/hooks";
import { addProducts } from "@/features/cartSlice";

import styles from "./MenuItem.module.css";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  itemName: string;
  neonUrl: string;
  sellingPrice: number;
};

type Products = {
  id: number;
  quantity: number;
}[];

const Menu: React.FC<any> = ({ category }) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector<Products>(
    (state) => state.cartSlice.products
  );

  const handleAddToCart = (item: MenuItem) => {
    const newCart = [...products];
    let findProduct = products.find((x) => x.id === item.id);
    if (findProduct) {
      const addQuantity = newCart.map((x) => {
        if (x.id === item.id) {
          return { ...x, quantity: x.quantity + 1 };
        } else {
          return { ...x };
        }
      });
      dispatch(addProducts(addQuantity));
    } else {
      dispatch(addProducts([...newCart, { ...item, quantity: 1 }]));
    }
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    const newCart = [...products];
    let findProduct = products.find((x) => x.id === item.id);
    if (findProduct) {
      const subtractQuantity = newCart.map((x, idx) => {
        if (x.id === item.id) {
          return { ...x, quantity: x.quantity > 0 ? x.quantity - 1 : 0 };
        } else {
          return { ...x };
        }
      });
      dispatch(addProducts(subtractQuantity));
    }
  };

  return (
    <ul>
      {category.map((x: MenuItem) => {
        return (
          <div key={x.id} className={styles.item}>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  marginRight: "0.3rem",
                }}
              >
                <Image
                  alt={x.itemName}
                  width={40}
                  height={40}
                  src={
                    x.neonUrl ||
                    `https://via.placeholder.com/150x150.png?text=${"Restaurant 1"}`
                  }
                ></Image>
              </div>
              <div className={styles["item-info"]}>
                <h3
                  style={{
                    maxWidth: "25rem",
                  }}
                >
                  {x.itemName}
                </h3>
                <p>${x.sellingPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="quantity">
              <button onClick={() => handleRemoveFromCart(x)}>-</button>
              <span>{products.find((i) => i.id === x.id)?.quantity || 0}</span>
              <button onClick={() => handleAddToCart(x)}>+</button>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default Menu;
