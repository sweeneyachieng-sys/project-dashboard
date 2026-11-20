import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProductProvider, useProducts } from "./context/ProductContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>We couldn't find the page you were looking for.</p>
      <Link to="/products" className="btn-primary">
        Go back to products
      </Link>
    </div>
  );
}

function AppShell() {
  const { darkMode } = useProducts();

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ProductProvider>
  );
}