import Form from "react-bootstrap/Form";

const UpdateAvailability = ({ onUpdateAvailability, value }) => {
  return (
    <Form.Select
      onChange={onUpdateAvailability}
      value={value}
      aria-label="Default select example"
    >
      <option value="">Availability</option>
      <option value="true">In Stock</option>
      <option value="false">Out of Stock</option>
    </Form.Select>
  );
};

export default UpdateAvailability;
