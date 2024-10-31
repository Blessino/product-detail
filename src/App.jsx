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
                <h6 className="card_product-category" >{item.category}</h6>

                <h3 className="product-detail">{item.title}</h3>
                <p className="product-lable"><span className="product-brand">brand: {item.brand}</span> <span>rating: {item.rating}</span></p>
                <h5 className="product-detail" ><span>price:</span> Rs.{item.price}</h5>
                <span className="product-detail">quantity</span>
                <div className="stock-btn">

                <button onClick={itemAdd} className="stok-btn" >+ </button>
                  <span className="product-count">{count}</span>
                <button onClick={itemSubtract} > -</button>
                <span className="stok">stok: {item.stok}</span>
                </div>
                <button>Add to Cart</button>
                
                <p><span className="product-detail">discription: </span>{item.description}</p>
              </div>
            </li>
          ))}

        {error && <p>{error}</p>}
      </section>
    </main>
  );
}

export default App;
