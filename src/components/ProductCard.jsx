export default function ProductCard({ title, price, image, onAdd }) {
  return (
    <article style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      {image ? (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6 }}
        />
      ) : null}

      <h3 style={{ marginTop: 10 }}>{title}</h3>
      <p style={{ margin: "6px 0" }}>${price}</p>

      {onAdd ? (
        <button onClick={onAdd} type="button">
          Agregar
        </button>
      ) : null}
    </article>
  );
}