import React, { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import Loader from "../../components/Loader";
import { getCategory } from "../../functions/category";

function CategoryHome({ match }) {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 dispaly-4 jumbotron">
              <Loader />
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 dispaly-4 jumbotron">
              {products.length} Products in "{category.name}" Category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryHome;
