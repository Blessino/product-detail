import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function itemAdd() {
    setCount((count)=> count + 1);
  }
  function itemSubtract() {
    if(count <= 1) return
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
            <li key={item.id} className="card_product">
              <figure className="card_product-image">
                <img src={item.image} alt={item.image} />
              </figure>
              <div className="card_product-detail">
                <h4 className="card_product-category" >{item.category}</h4>
                <p ><span className="card_product-title" >Product Name:</span> {item.title}</p>
                <p className="card_product-price" >price: {item.price}</p>
                <span className="quantity">quantity</span>
                <button onClick={itemAdd} >+</button>
                  <span className="count">{count}</span>
                <button onClick={itemSubtract} >-</button>
                <p>{item.description}</p>
              </div>
            </li>
          ))}

        {error && <p>{error}</p>}
      </section>
    </main>
  );
}

export default App;
