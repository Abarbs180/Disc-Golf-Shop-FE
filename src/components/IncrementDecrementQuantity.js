const IncrementDecrementQuantity = ({
  quantity,
  handleChange,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="form-control-check">
      <button type="button" onClick={handleIncrement}>
        +
      </button>
      <input type="text" value={quantity} onChange={handleChange} />
      <button type="button" onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};

export default IncrementDecrementQuantity;
