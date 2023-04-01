import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function Formc({ addHandler }) {
  const [item, setInput] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    addHandler(item);
    setInput("");
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Details</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={item}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Formc;
