import Card from "react-bootstrap/Card";

const AdminProduct = ({ id, name, brand, type }) => {
  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{brand}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default AdminProduct;
