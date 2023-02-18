import MenuItem from "@/components/MenuItem/MenuItem";
import styles from "@/styles/Menu.module.css";

type Category = {
  id: string;
  foodType: string;
  items: any;
};

export default function Menu({ data }: any) {
  const {
    result: { categories },
  } = data;
  return (
    <main className={styles["main-menu"]}>
      <div className={styles.menu}>
        <h2 className={styles.heading}>Menu</h2>
        <ul>
          {categories.map((item: Category) => {
            return (
              <li key={item.id}>
                <h3 className={styles["categories-heading"]}>
                  {item.foodType}
                </h3>
                <MenuItem category={item.items}></MenuItem>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://apimocha.com/ecatering-ui-test/menu`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
