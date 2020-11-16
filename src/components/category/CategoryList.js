import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import Loader from "../Loader";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
        key={c._id}
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">{loading ? <Loader /> : showCategories()}</div>
    </div>
  );
}

export default CategoryList;
