import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const product = await res.json();
    setProducts(product);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      {isLoading && <LoadingIcon />}
      {!isLoading &&
        products.map(
          (product) =>
            product.availability === "In Stock" && (
              <div key={product.id}>{product.name}</div>
            )
        )}
    </div>
  );
};

export default HomePage;
