import PropTypes from 'prop-types';

export default function ProductCard({ name, price, image, stock, onAdd }) {

  const isAvailable = stock > 0;


  return (
    <article style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, opacity: isAvailable ? 1 : 0.6 }}>
      {image ? (
        <img
          src={image}
          alt={name}
          style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6 }}
        />
      ) : null}

      <h3 style={{ marginTop: 10 }}>{name}</h3>
      <p style={{ margin: "6px 0" }}>${price}</p>

       {!isAvailable && <b style={{ color: "red" }}>AGOTADO</b>}

      {onAdd ? (
        <button onClick={onAdd} disabled={!isAvailable} type="button">
          {isAvailable ? "Agregar" : "Sin Stock"}
        </button>
      ) : null}
    </article>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  stock: PropTypes.number.isRequired,
  onAdd: PropTypes.func,
};