import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const apiUrl = "http://localhost:3000/products";

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Could not load products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function addProduct(newProduct) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const saved = await response.json();
    setProducts((current) => [...current, saved]);
  }

  async function updateProduct(id, changes) {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
    const updated = await response.json();
    setProducts((current) =>
      current.map((item) => (item.id === id ? updated : item))
    );
  }

  async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    setProducts((current) => current.filter((item) => item.id !== id));
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        darkMode,
        setDarkMode,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}