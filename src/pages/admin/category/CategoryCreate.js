import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
  updateCategory,
} from "../../../functions/category";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";
import LocalSearch from "../../../components/form/LocalSearch";

function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const handleModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setIsEdit(false);
    setName("");
  };

  const handleUpdate = (categoryName, categorySlug) => {
    setModal(true);
    setIsEdit(true);
    setName(categoryName);
    setSlug(categorySlug);
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isEdit) {
      createCategory({ name }, user.token)
        .then((res) => {
          setLoading(false);
          setName("");
          setModal(false);

          toast.success(`${res.data.name} is created`);
          loadCategories();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
        });
    } else {
      if (name) {
        updateCategory(slug, { name }, user.token)
          .then((res) => {
            console.log(res);
            setLoading(false);
            setModal(false);
            setIsEdit(false);
            setName("");
            setSlug("");

            toast.success(`${res.data.name} is updated`);
            loadCategories();
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            if (error.response.status === 400) toast.error(error.response.data);
          });
      } else {
        setLoading(false);
        setModal(false);
        setIsEdit(false);
        toast.error("Name is required");
        return;
      }
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} Deleted.`);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
        });
    }
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        {/* <br />
        <button className="btn btn-outline-primary">Save</button> */}
      </div>
    </form>
  );

  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminNav />

        <div className="col">
          {loading ? (
            <div className="text-center">
              <Loader />
            </div>
          ) : (
            <Button
              onClick={handleModal}
              type="primary"
              style={{ marginTop: 20 }}
            >
              <PlusOutlined /> Add Category
            </Button>
          )}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {categories.filter(searched(keyword)).map((category) => (
            <div className="alert alert-secondary" key={category._id}>
              {category.name} {""}
              <span
                onClick={() => handleRemove(category.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              {/* <Link to={`/admin/category/${category.slug}`}> */}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleUpdate(category.name, category.slug)}
              >
                <EditOutlined className="text-warning" />
              </span>
              {/* </Link> */}
            </div>
          ))}
          <Modal
            title={isEdit ? "Update Category" : "Add Category"}
            visible={modal}
            onCancel={handleCloseModal}
            maskClosable={false}
            footer={[
              <Button key="back" onClick={handleCloseModal}>
                Close
              </Button>,
              <Button key="submit" onClick={handleSubmit} type="primary">
                {isEdit ? "Update" : "Create"}
              </Button>,
            ]}
          >
            {categoryForm()}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default CategoryCreate;
