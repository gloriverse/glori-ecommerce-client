import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createSub,
  getSubs,
  removeSub,
  updateSub,
} from "../../../functions/sub";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";
import LocalSearch from "../../../components/form/LocalSearch";
import { getCategories } from "../../../functions/category";

function SubCategory() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadSubs();
    loadCategories();
  }, []);

  const handleModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setIsEdit(false);
    setName("");
    setSlug("");
    setCategory("");
  };

  const handleUpdate = (
    subCategoryName,
    subCategorySlug,
    subCategoryParent
  ) => {
    setModal(true);
    setIsEdit(true);
    setName(subCategoryName);
    setSlug(subCategorySlug);
    setCategory(subCategoryParent);
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isEdit) {
      createSub({ name, parent: category }, user.token)
        .then((res) => {
          setLoading(false);
          setName("");
          setModal(false);

          toast.success(`${res.data.name} is created`);
          loadSubs();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
        });
    } else {
      if (name) {
        updateSub(slug, { name, parent: category }, user.token)
          .then((res) => {
            console.log(res);
            setLoading(false);
            setModal(false);
            setIsEdit(false);
            setName("");
            setSlug("");

            toast.success(`${res.data.name} is updated`);
            loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} Deleted.`);
          loadSubs();
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
        });
    }
  };

  const subForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Parent Category</label>

        <select
          name="category"
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>--Please Select--</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id} selected={c._id === category}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Sub Category</label>
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
              <PlusOutlined /> Add Sub Category
            </Button>
          )}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {subs.filter(searched(keyword)).map((sub) => (
            <div className="alert alert-secondary" key={sub._id}>
              {sub.name} {""}
              <span
                onClick={() => handleRemove(sub.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              {/* <Link to={`/admin/sub/${sub.slug}`}> */}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleUpdate(sub.name, sub.slug, sub.parent)}
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
            {subForm()}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default SubCategory;
