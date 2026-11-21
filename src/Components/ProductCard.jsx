function ProductCard({ product, onEdit, onDelete }) {
  const { name, price, image, description, category, inStock = true } = product;

  return (
    <article
      style={{
        background: "white",
        color: "black",
        border:"1px solid white",
        borderRadius: "20px",
        boxShadow: "0 2px 12px rgba(15, 23, 42, 0.06)",
        padding: "16px",
        width: "300px",
        fontFamily: "'Inter', system-ui, sans-serif",
        marginTop: "10px"
      }}
    >
      <div
        style={{
          height: "180px",
          borderRadius: "14px",
          background: "white",
          marginBottom: "16px",
          overflow: "hidden",
        }}
      >
        {image && (
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </div>

      <h3
        style={{
          margin: "0 0 6px",
          fontSize: "18px",
          fontWeight: 700,
          color: "black",
        }}
      >
        {name}
      </h3>

      <p style={{ margin: "0 0 12px", fontSize: "14px", color: "grey" }}>
        {category}
        <span style={{ margin: "0 4px" }}>•</span>
        {inStock ? "In stock" : "Out of stock"}
      </p>

      {description && (
        <p style={{ margin: "0 0 12px", fontSize: "0.9rem", color: "grey" }}>
          {description}
        </p>
      )}

      <p
        style={{
          margin: "0 0 14px",
          fontSize: "20px",
          fontWeight: 700,
          color: "black",
        }}
      >
        {typeof price === "number" ? `KSh ${price.toLocaleString("en-KE")}` : price}
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          onClick={() => onEdit && onEdit(product)}
          style={{
            border: 0,
            borderRadius: "12px",
            padding: "10px 22px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            background: "navy",
            color: "blue",
          }}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete && onDelete(product)}
          style={{
            border: 0,
            borderRadius: "12px",
            padding: "10px 22px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            background: "slate",
            color: "red",
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProductCard;