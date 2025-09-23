import React, { useContext, useEffect, useState, useRef } from 'react';
import Navbar from '../componets/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Appcontex } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import About from '../componets/about'
import Contact from '../componets/Contact';
import UsePagination from '../componets/usePagination';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

export const Home = () => {
    const aboutRef = useRef(null);

    const contactRef = useRef(null);

    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setpage] = useState(1);
    const [limit, setlimit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedColors, setSelectedColors] = useState([]);
    const [maxprice, setmaxprice] = useState(null);
    const [minprice, setminprice] = useState(null);
    const [isFiltering, setIsFiltering] = useState(false);
    const { user, setuser, addToCart, Searchdata, searchText, getCart, addCart } = useContext(Appcontex)

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    


    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setuser(JSON.parse(storedUser));
            }
            if (!user && !storedUser) {
                navigate('/');
            }
        }
    }, [user, setuser]);

    const handeleDelete = async (id) => {
        try {
            const { data } = await axios.post(`https://ecommerce-web-e9sm.onrender.com/delete/${id}`);
            if (data.success) {
                toast.success(data.message);
                await getproducts();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    }

    const getproducts = async () => {
        try {
            const { data } = await axios.post("https://ecommerce-web-e9sm.onrender.com/home/page", { page, limit })
            if (data.success) {
                toast.success(data.message)
                setProducts(data.products);
                setTotalPages(data.totalPages);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

   useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
        getproducts();
    }, [page, limit]);

    const paginatedSearchData = Searchdata.slice(
        (page - 1) * limit,
        page * limit
    );

    const totalSearchPages = Math.ceil(Searchdata.length / limit);
    useEffect(() => {
        setpage(1);
    }, [Searchdata]);

    const handleColorChange = (e) => {
        const { value, checked } = e.target;
        setSelectedColors(prev =>
            checked ? [...prev, value] : prev.filter(color => color !== value)
        );
    };


    const applyFilters = async () => {
        setpage(1);
        setIsFiltering(true);
        const min = (typeof minprice === 'number' && !isNaN(minprice)) ? minprice : undefined;
        const max = (typeof maxprice === 'number' && !isNaN(maxprice)) ? maxprice : undefined;
        try {
            const { data } = await axios.post('https://ecommerce-web-e9sm.onrender.com/home/filter', {
                colors: selectedColors,
                minprice: min,
                maxprice: max,
            });
            if (data.success) {
                setProducts(data.products);

                toast.success("Filters applied");
                setShowSidebar(false);
                setminprice('')
                setmaxprice('')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to apply filters");
        }
    };
    return (
        <>
            <Navbar scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} />

            <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
                <div className="sidebar-content">
                    <h2>Filter Options</h2>
                    <ClearSharpIcon onClick={() => setShowSidebar(false)} />
                    <div>
                        <h4>Price Range ($)</h4>
                        <input
                            type="number"
                            name="priceMin"
                            value={minprice}
                            placeholder="Min"
                            onChange={(e) => {
                                const val = e.target.value;
                                setminprice(val === "" ? undefined : Number(val));
                            }}

                            style={{ width: '80px', marginRight: '10px' }}
                        />
                        <input
                            type="number"
                            name="priceMax"
                            value={maxprice}
                            placeholder="Max"
                            onChange={(e) => {
                                const val = e.target.value;
                                setmaxprice(val === "" ? undefined : Number(val));
                            }}
                            style={{ width: '80px' }}
                        />
                    </div>
                    <div>
                        <h4>Colors</h4>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input checked={selectedColors.includes("black")} onChange={handleColorChange} type="checkbox" value="black" /> Black
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input checked={selectedColors.includes("white")} onChange={handleColorChange} type="checkbox" value="white" /> White
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input checked={selectedColors.includes("red")} onChange={handleColorChange} type="checkbox" value="red" /> Red
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input checked={selectedColors.includes("blue")} onChange={handleColorChange} type="checkbox" value="blue" /> Blue
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input checked={selectedColors.includes("mix")} onChange={handleColorChange} type="checkbox" value="mix" /> Multi-color
                        </label>
                    </div>
                    <div>
                        <h4>Material</h4>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input type="checkbox" value="Canvas" /> Canvas
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input type="checkbox" value="Leather" /> Leather
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input type="checkbox" value="Cotton" /> Cotton
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input type="checkbox" value="Jute" /> Jute
                        </label>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input type="checkbox" value="Synthetic" /> Synthetic
                        </label>
                    </div>
                    <button
                        style={{ marginTop: '20px', padding: '8px 12px', cursor: 'pointer' }}
                        onClick={() => applyFilters()}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FilterAltSharpIcon className='filter' onClick={() => setShowSidebar(true)} />
                {isFiltering && (<button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'blue', textDecoration: 'undeline', cursor: 'pointer' }}
                    onClick={() => {
                        setSelectedColors([]);
                        setIsFiltering(false);
                        setpage(1);
                        getproducts();
                    }}
                >
                    Clear Filters
                </button>)}
            </div>
            <div className='home-body'>
                {Searchdata.length > 0 ? (
                    paginatedSearchData.map((data, index) => (
                        <div className='product' key={index}>
                            <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${data._id}`)} >
                                <img className='img' src={data.proImg} alt={data.proName} />
                                <p>{data.proName}</p>
                                <p>${data.proPrice}</p>

                            </div>

                            <button onClick={() => addToCart(data, 1)} >Add to Cart</button>
                            {user?.role === 'admin' && (
                                <>
                                    <button onClick={() => navigate(`/home/${data._id}`)} >Edit</button>
                                    <button onClick={() => handeleDelete(data._id)}>Delete</button>
                                </>
                            )}
                        </div>

                    ))
                ) : (

                    Searchdata.length === 0 && searchText.trim() !== "" ? (
                        <p>No matching products found.</p>
                    ) : (
                        products.map((product, index) => (
                            <div className='product' key={index}>
                                <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product._id}`)} >
                                    <img className='img' src={product.proImg} alt={product.proName} />
                                    <p>{product.proName}</p>
                                    <p>${product.proPrice}</p>
                                </div>
                                <button onClick={async () => {
                                    await addCart(product._id);
                                    await getCart();
                                }} >Add to Cart</button>
                                {user?.role === 'admin' && (
                                    <>
                                        <button onClick={() => navigate(`/home/${product._id}`)} >Edit</button>
                                        <button onClick={() => handeleDelete(product._id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        ))
                    )
                )}
                {!isFiltering && (
                    <div className="pagination">
                        {Searchdata.length > 0 && searchText.trim() !== "" ? (
                            <UsePagination totalPages={totalSearchPages} currentPage={page} setPage={setpage} />
                        ) : (
                            <>
                                <UsePagination totalPages={totalPages} currentPage={page} setPage={setpage} />
                                <div>
                                    <select onChange={(e) => setlimit(Number(e.target.value), setpage(1))} className="per-page-dropdown" defaultValue="">
                                        <option value="" disabled hidden>per page</option>
                                        <option value="8">8</option>
                                        <option value="12">12</option>
                                        <option value="16">16</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                            </>
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
    )
}
