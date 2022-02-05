import LoadingIcon from "./LoadingIcon";
import { useEffect, useState } from "react";

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
    // TODO: Cleanup
    <div>
      {isLoading && <LoadingIcon />}
      {!isLoading &&
        products.map(
          (product) =>
            product.availability && <div key={product.id}>{product.name}</div>
        )}
    </div>
  );
};

export default HomePage;
