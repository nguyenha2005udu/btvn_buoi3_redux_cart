import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addItem } from "../cart/cartSlice";
import { fetchProducts } from "./productsSlice";

import "./ProductList.css";

function ProductList() {
  const dispatch = useAppDispatch();

  const { items, status, error } = useAppSelector(
    (state) => state.products
  );

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const getQuantity = (productId: number) => {
    return (
      cartItems.find(
        (item) => item.product.id === productId
      )?.quantity ?? 0
    );
  };

  if (status === "loading") {
    return (
      <section className="product-section">
        <h2>Sản phẩm</h2>
        <p className="status-message">
          Đang tải danh sách sản phẩm...
        </p>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="product-section">
        <h2>Sản phẩm</h2>
        <p className="error-message">{error}</p>

        <button
          className="primary-button"
          onClick={() => dispatch(fetchProducts())}
        >
          Thử lại
        </button>
      </section>
    );
  }

  return (
    <section className="product-section">
      <div className="section-title">
        <div>
          <h2>Danh sách sản phẩm</h2>
          <p>Khám phá các sản phẩm của chúng tôi.</p>
        </div>

        <span className="product-count">
          {items.length} sản phẩm
        </span>
      </div>

      {items.length === 0 ? (
        <p className="status-message">
          Không có sản phẩm nào.
        </p>
      ) : (
        <div className="product-grid">
          {items.map((product) => (
            <article
              className="product-card"
              key={product.id}
            >
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                />
              </div>

              <div className="product-info">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.title}</h3>

                <p className="product-price">
                  {product.price.toLocaleString("vi-VN")} USD
                </p>

                <button
                  className="primary-button"
                  onClick={() => dispatch(addItem(product))}
                >
                  Thêm vào giỏ
                  {getQuantity(product.id) > 0 &&
                    ` (${getQuantity(product.id)})`}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;