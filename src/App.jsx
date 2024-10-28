import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function itemAdd() {
    setCount((count)=> count + 1);
  }
  function itemSubtract() {
    setCount((count)=> count - 1);
  }

  useEffect(function () {
    async function productDetail() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/product");
        if (!res.ok) throw new Error("error");
        const data = await res.json();
        setProduct(data);
        console.log();
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err.message);
        setError(err.message);
      }
    }

    productDetail();
  }, []);

  return (
    <main>
      <h1>Product Detail</h1>

      <section className="card">
        {isLoading && <p>Loading</p>}

        {!isLoading &&
          !error &&
          product.map((item) => (
            <li key={item.id} className="product">
              <figure className="image">
                <img src={item.image} alt={item.image}/>
              </figure>
              <div>
                <h4>{item.category}</h4>
                <p>Product Name: {item.title}</p>
                <p>price: {item.price}</p>
                <button onClick={itemAdd} >+</button>{`count is ${count}`}<button onClick={itemSubtract} >-</button>
                <p>(item.description)</p>
              </div>
            </li>
          ))}

        {error && <p>{error}</p>}
      </section>
    </main>
  );
}

export default App;
