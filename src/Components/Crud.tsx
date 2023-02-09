import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

import FormInput from "./Interfaces/FormInput";
import User from "./Interfaces/User";

const schema = Joi.object({
  formData: {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email"),
    phone: Joi.string().required().label("phone"),
  },
});

function Crud() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({ resolver: joiResolver(schema) });
  const [show, handleShow] = useState(false);
  const [showToast, handleToast] = useState(false);
  const [editIndex, handleMode] = useState(-1);
  const [userList, handleUserList] = React.useState<User[]>([]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const formData = data.formData;
    const userData = [...userList];
    if (editIndex >= 0) {
      //userData[editIndex] = formData;
    } else {
      //userData.push(formData);
    }
    reset();
    handleUserList(userData);
    handleShow(false);
    handleToast(true);
  };

  const editModal = (index: number) => {
    const userData = [...userList];
    const formData: User = userData[index];
    setValue("formData", formData);
    handleMode(index);
    handleShow(true);
  };

  const deleteUser = (index: number) => {
    const userData = [...userList];
    userData.splice(index, 1);
    handleUserList(userData);
  };

  const openModal = () => {
    reset();
    handleShow(true);
    handleMode(-1);
  };

  return (
    <Container className="App">
      <ToastContainer className="p-3" position="top-center">
        <Toast
          onClose={() => handleToast(false)}
          bg="success"
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Data successfuly insert</Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal show={show}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton onHide={() => handleShow(false)}>
            <Modal.Title>User crud example</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("formData.name", {
                  required: true,
                })}
                placeholder="Name"
              />
              {errors?.formData?.name && (
                <p className="text-danger">{errors?.formData?.name.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register("formData.email", {
                  required: true,
                })}
                placeholder="Email"
              />
              {errors?.formData?.email && (
                <p className="text-danger">{errors?.formData?.email.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                {...register("formData.phone", {
                  required: true,
                })}
                placeholder="Phone"
              />
              {errors?.formData?.phone && (
                <p className="text-danger">{errors?.formData?.phone.message}</p>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleShow(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {editIndex >= 0 ? "Update Changes" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>CRUD Operation</h1>
        </Col>
      </Row>
      <Row>
        <Col className="pull-right">
          <Button color="green" onClick={openModal}>
            Add User
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user: User, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    <th>{user.phone}</th>
                    <th>
                      <Button
                        variant="primary"
                        onClick={() => editModal(index)}
                      >
                        Edit
                      </Button>{" "}
                      ||{" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteUser(index)}
                      >
                        Delete
                      </Button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export default Crud;
