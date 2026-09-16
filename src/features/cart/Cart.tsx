import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  clearCart,
  removeItem,
  updateQuantity,
} from "./cartSlice";

import "./Cart.css";

function Cart() {
  const dispatch = useAppDispatch();

  const items = useAppSelector(
    (state) => state.cart.items
  );

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <section className="cart-section">
      <div className="section-title">
        <div>
          <h2>Giỏ hàng</h2>
          <p>
            {totalQuantity} sản phẩm trong giỏ hàng
          </p>
        </div>

        {items.length > 0 && (
          <button
            className="clear-button"
            onClick={() => dispatch(clearCart())}
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon">🛒</span>
          <h3>Giỏ hàng đang trống</h3>
          <p>Hãy thêm sản phẩm bạn yêu thích.</p>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <article
                className="cart-item"
                key={item.product.id}
              >
                <img
                  className="cart-item-image"
                  src={item.product.image}
                  alt={item.product.title}
                />

                <div className="cart-item-info">
                  <h3>{item.product.title}</h3>

                  <p className="cart-item-price">
                    {item.product.price.toLocaleString("vi-VN")} USD
                  </p>

                  <div className="quantity-control">
                    <button
                      aria-label="Giảm số lượng"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label="Tăng số lượng"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <strong>
                    {(
                      item.product.price * item.quantity
                    ).toLocaleString("vi-VN")} USD
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch(removeItem(item.product.id))
                    }
                  >
                    Xóa
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-total">
            <span>Tổng tiền</span>
            <strong>
              {totalPrice.toLocaleString("vi-VN")} USD
            </strong>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;