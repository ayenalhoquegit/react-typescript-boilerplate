import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDataApi } from "../Services/api.services";
import CustomPagination from "./CustomPagination";
import FormInput from "./Interfaces/FormInput";
import User from "./Interfaces/User";

const schema = Joi.object({
  formData: {
    id: Joi.number(),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email"),
    phone: Joi.string().required().label("phone"),
  },
});

function UserInfo() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({ resolver: joiResolver(schema) });
  const [show, handleShow] = useState(false);
  const [paginateDataCall, handlePaginateApiCall] = useState(false);
  const [userId, handleMode] = useState(0);
  const [userList, handleUserList] = React.useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    console.log("okay");
    // declare the async data fetching function

    const fetchData = async () => {
      try {
        const endpoint = `/api/v1/service-client?page=${currentPage}&limit=${dataPerPage}`;
        const data = await getDataApi(endpoint);
        const userData: User[] = data?.items;
        handleUserList(userData);
        setTotalItems(data?.meta?.totalItems);
      } catch (err) {
        console.log("error from server", err);
        toast.warning("Somethoing Wrong, Please Wait");
      }
    };
    // call the function
    fetchData();
  }, [currentPage, dataPerPage, paginateDataCall]);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = data.formData;
    console.log("fromData", formData);
    //const userData = [...userList];
    let method = "POST";
    let url = "http://localhost:3300/api/v1/service-client";
    if (userId > 0) {
      method = "patch";
      url = `http://localhost:3300/api/v1/service-client/${userId}`;
    }
    const config = {
      method: method,
      url: url,
      data: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios(config);
      console.log("response", res.data);
      reset();
      handleShow(false);
      handlePaginateApiCall(!paginateDataCall);
      toast.success("Success!, data successfully inserted");
    } catch (err) {
      toast.warning("Somethoing Wrong, Please Wait");
      console.log("error", err);
    }
  };

  const editModal = async (id: number) => {
    try {
      const config = {
        method: "GET",
        url: `http://localhost:3300/api/v1/service-client/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // get the data from the api
      const res = await axios(config);
      const formData: User = res.data;

      setValue(
        "formData",
        {
          name: formData.name,
          id: formData.id,
          email: formData.email,
          phone: formData.phone,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );
      handleMode(id);
      handleShow(true);
    } catch (err) {
      console.log("error from server", err);
      toast.warning("Somethoing Wrong, Please Wait");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const config = {
        method: "DELETE",
        url: `http://localhost:3300/api/v1/service-client/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const isDeleted = await axios(config);
      if (isDeleted) {
        toast.success("Success!, data successfully deleted");
        handlePaginateApiCall(!paginateDataCall);
      }
    } catch (err) {
      toast.warning("Somethoing Wrong, Please Wait");
      console.log("error", err);
    }
  };

  const openModal = () => {
    reset();
    handleShow(true);
    handleMode(0);
  };

  return (
    <Container className="App">
      <ToastContainer />
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
              {userId > 0 ? "Update Changes" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>React CRUD Operation</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={10}></Col>
        {/* <Col sm={3}>
          <InputGroup>
            <Form.Control
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
          </InputGroup>
        </Col> */}
        <Col sm={2}>
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
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((user: User, index) => {
                return (
                  <tr key={index}>
                    <th>{(currentPage - 1) * dataPerPage + index + 1}</th>
                    <th className="text-left">{user.name}</th>
                    <th>{user.email}</th>
                    <th>{user.phone}</th>
                    <th>
                      <Button
                        variant="primary"
                        onClick={() => editModal(user.id)}
                      >
                        Edit
                      </Button>{" "}
                      ||{" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {userList.length > 0 && (
            <CustomPagination
              dataPerPage={dataPerPage}
              totalData={totalItems}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default UserInfo;
