
import ProductList from "./features/products/ProductList";
import Cart from "./features/cart/Cart";

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="app-label">REDUX TOOLKIT + TYPESCRIPT</p>
          <h1>Shopping Cart</h1>
          <p className="app-description">
            Demo quản lý sản phẩm và giỏ hàng bằng Redux Toolkit.
          </p>
        </div>
      </header>

      <ProductList />

      <Cart />

      <footer className="app-footer">
        React • Redux Toolkit • TypeScript
      </footer>
    </main>
  );
}

export default App;