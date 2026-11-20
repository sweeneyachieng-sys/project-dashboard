import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    darkMode,
    setDarkMode,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [stockInput, setStockInput] = useState("In stock");

  if (loading) return <p role="status">Loading products...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  const visibleProducts = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  function openEditForm(product) {
    setEditingId(product.id);
    setPriceInput(product.price);
    setStockInput(product.stockStatus);
  }

  async function saveChanges(id) {
    await updateProduct(id, {
      price: Number(priceInput),
      stockStatus: stockInput,
    });
    setEditingId(null);
  }

  return (
    <div className="products-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">CATALOGUE</span>
          <h1>Products</h1>
          <p>Manage your product catalogue, pricing and stock.</p>
        </div>

        <div className="header-actions">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
          <Link to="/products/new" className="btn-primary">
            + Add product
          </Link>
        </div>
      </header>

      <input
        type="text"
        placeholder="Search products by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <h3>All products</h3>

      {visibleProducts.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product}>
              {editingId === product.id ? (
                <div className="edit-form">
                  <label>
                    Price (KSh)
                    <input
                      type="number"
                      aria-label="Edit price"
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                    />
                  </label>

                  <select
                    aria-label="Edit stock status"
                    value={stockInput}
                    onChange={(e) => setStockInput(e.target.value)}
                  >
                    <option value="In stock">In stock</option>
                    <option value="Low stock">Low stock</option>
                    <option value="Out of stock">Out of stock</option>
                  </select>

                  <div className="card-actions">
                    <button onClick={() => saveChanges(product.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="price">KSh {product.price.toLocaleString()}</p>
                  <div className="card-actions">
                    <button onClick={() => openEditForm(product)}>Edit</button>
                    <button onClick={() => deleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}