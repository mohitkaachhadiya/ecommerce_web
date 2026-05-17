import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import Navbar from "../componets/Navbar";
import About from "../componets/about";
import Contact from "../componets/Contact";
import UsePagination from "../componets/usePagination";
import { Appcontex } from "../context/Appcontext";
import Loader from "../components/common/Loader";
import ProductCard from "../components/product/ProductCard";
import ProductFilterSidebar from "../components/product/ProductFilterSidebar";
import { PAGE_SIZE_OPTIONS } from "../constants/appConfig";
import { productService } from "../services/productService";

export const Home = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  const { user, setuser, Searchdata, searchText, getCart, addCart } =
    useContext(Appcontex);

  const [showSidebar, setShowSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxprice, setMaxprice] = useState("");
  const [minprice, setMinprice] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [loading, setLoading] = useState(true);

  const visibleProducts = useMemo(() => {
    if (!Searchdata.length) return products;
    return Searchdata.slice((page - 1) * limit, page * limit);
  }, [Searchdata, limit, page, products]);

  const activeTotalPages = Searchdata.length
    ? Math.ceil(Searchdata.length / limit)
    : totalPages;

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productService.getPage({ page, limit });
      if (data.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      setuser(JSON.parse(storedUser));
      return;
    }
    if (!user && !storedUser) navigate("/");
  }, [navigate, setuser, user]);

  useEffect(() => {
    getProducts();
  }, [page, limit]);

  useEffect(() => {
    getCart();
  }, [user?._id]);

  useEffect(() => {
    setPage(1);
  }, [Searchdata]);

  const handleDelete = async (id) => {
    try {
      const { data } = await productService.remove(id);
      if (data.success) {
        toast.success(data.message);
        await getProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedColors((prev) =>
      checked ? [...prev, value] : prev.filter((color) => color !== value)
    );
  };

  const applyFilters = async () => {
    setPage(1);
    setIsFiltering(true);
    try {
      const { data } = await productService.filter({
        colors: selectedColors,
        minprice: minprice === "" ? undefined : Number(minprice),
        maxprice: maxprice === "" ? undefined : Number(maxprice),
      });
      if (data.success) {
        setProducts(data.products);
        setShowSidebar(false);
        toast.success("Filters applied");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to apply filters");
    }
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setMinprice("");
    setMaxprice("");
    setIsFiltering(false);
    setPage(1);
    getProducts();
  };

  return (
    <>
      <Navbar
        scrollToAbout={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
        scrollToContact={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
      />

      <ProductFilterSidebar
        isOpen={showSidebar}
        selectedColors={selectedColors}
        minprice={minprice}
        maxprice={maxprice}
        onClose={() => setShowSidebar(false)}
        onColorChange={handleColorChange}
        onMinPriceChange={setMinprice}
        onMaxPriceChange={setMaxprice}
        onApply={applyFilters}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <FilterAltSharpIcon className="filter" onClick={() => setShowSidebar(true)} />
        {isFiltering && (
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="home-body">
        {loading ? (
          <Loader />
        ) : visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isAdmin={user?.role === "admin"}
              onOpen={(id) => navigate(`/product/${id}`)}
              onAddToCart={async (id) => {
                await addCart(id);
                await getCart();
              }}
              onEdit={(id) => navigate(`/home/${id}`)}
              onDelete={handleDelete}
            />
          ))
        ) : searchText.trim() ? (
          <p>No matching products found.</p>
        ) : (
          <p>No products found.</p>
        )}

        {!isFiltering && (
          <div className="pagination">
            <UsePagination totalPages={activeTotalPages} currentPage={page} setPage={setPage} />
            {!Searchdata.length && (
              <div>
                <select
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="per-page-dropdown"
                  value={limit}
                >
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
};
