import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <LoadingIcon />}
      {!isLoading &&
        products.map((product) => <div key={product.id}>{product.name}</div>)}
    </div>
  );
};

export default HomePage;
