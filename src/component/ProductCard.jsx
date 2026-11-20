export default function ProductCard({ product, children }) {
  return (
    <div className="product-card">
      <div className="card-image-placeholder" />
      <h4>{product.name}</h4>
      <p className="meta">
        {product.category} • {product.stockStatus}
      </p>
      {children}
    </div>
  );
}