import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "../graphql";
import EditModal from "./EditModal";

export default function UserTable() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [form, setForm] = useState({ name: "", email: "", age: "", phone: "" });
  const [editForm, setEditForm] = useState({});
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleCreate = async () => {
    if (form.email && form.name && form.age && form.phone) {
      await createUser({
        variables: { input: { ...form, age: parseInt(form.age, 10) } },
      });
      setForm({ name: "", email: "", age: "", phone: "" });
      refetch();
    }
  };

  const handleUpdate = async () => {
  const input = {};
  if (editForm.name) input.name = editForm.name;
  if (editForm.email) input.email = editForm.email;
  if (editForm.phone) input.phone = editForm.phone;
  if (editForm.age) input.age = parseInt(editForm.age, 10);

  await updateUser({
    variables: {
      id: String(editForm.id),
      input,
    },
  });
  setShow(false);
  refetch();
};


  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  if (loading) return <p className="p-3">Loading...</p>;
  if (error) return <p className="p-3 text-danger">Error: {error.message}</p>;

  const filtered = data.users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid" style={{ marginLeft: "0", paddingLeft: "240px" }}>
      <div className="mb-36 d-flex mt-4">
        <input
          className="form-control me-2 mb-2"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row g-2 mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary w-100" onClick={handleCreate}>
            Add User
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.created_at}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditForm(user);
                      setShow(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditModal
        show={show}
        handleClose={() => setShow(false)}
        user={editForm}
        setUser={setEditForm}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
