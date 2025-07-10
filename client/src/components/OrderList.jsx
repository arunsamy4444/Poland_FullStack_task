import React, { useEffect, useState } from "react";
import './orderlist.css';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [searchName, setSearchName] = useState("");
  const [minWorth, setMinWorth] = useState("");
  const [maxWorth, setMaxWorth] = useState("");
  const [filterMode, setFilterMode] = useState("id"); // 'id', 'name', 'price'
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");
  const BACKEND_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchFilteredOrders = async () => {
    try {
      let query = [];
      if (minWorth) query.push(`minWorth=${minWorth}`);
      if (maxWorth) query.push(`maxWorth=${maxWorth}`);
      const queryString = query.length ? `?${query.join("&")}` : "";

       const res = await fetch(`${BACKEND_URL}/orders${queryString}`, {
        headers: { Authorization: `Basic ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
      setAllOrders(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("❌ Could not fetch orders");
    }
  };

  useEffect(() => {
    if (filterMode === "price") {
      fetchFilteredOrders();
    }
  }, [minWorth, maxWorth, filterMode]);

  useEffect(() => {
    let filtered = [...allOrders];
    let active = false;

    if (filterMode === "id" && searchID.trim()) {
      active = true;
      filtered = filtered.filter((o) =>
        o.orderID.toLowerCase().includes(searchID.trim().toLowerCase())
      );
    }

    if (filterMode === "name" && searchName.trim()) {
      active = true;
      filtered = filtered.filter((order) =>
        order.products.some((p) =>
          p.name.toLowerCase().includes(searchName.trim().toLowerCase())
        )
      );
    }

    if (active) {
      setOrders(filtered);
      if (filtered.length === 0) {
        setError(`❌ No matching results`);
      } else {
        setError("");
      }
    } else {
      setOrders(allOrders);
      setError("");
    }
  }, [searchID, searchName, allOrders, filterMode]);

  useEffect(() => {
    fetchFilteredOrders();
  }, []);

  const clearFilters = () => {
    setSearchID("");
    setSearchName("");
    setMinWorth("");
    setMaxWorth("");
    setError("");
    fetchFilteredOrders();
  };

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setFilterMode(mode);
    setSearchID("");
    setSearchName("");
    setMinWorth("");
    setMaxWorth("");
    setError("");
    fetchFilteredOrders();
  };

  return (
    <div>
      <h2>📦 Orders</h2>

      {/* 🔽 Mode Selector + Dynamic Inputs */}
      <div className="filter-bar">
        <select value={filterMode} onChange={handleModeChange}>
          <option value="id">Order ID</option>
          <option value="name">Product Name</option>
          <option value="price">Price Range</option>
        </select>

        <br />
        <br />

        {filterMode === "id" && (
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
          />
        )}

        {filterMode === "name" && (
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        )}

        {filterMode === "price" && (
          <>
            <input
              type="number"
              placeholder="Min Worth"
              value={minWorth}
              onChange={(e) => setMinWorth(e.target.value)}
            />{" "}
            <input
              type="number"
              placeholder="Max Worth"
              value={maxWorth}
              onChange={(e) => setMaxWorth(e.target.value)}
            />
          </>
        )}

        <br />
        <br />
        <button onClick={clearFilters}>Clear</button>
      </div>
{error && <p className="error-message">{error}</p>}


<div className="order-grid">
  {orders.map(order => (
    <div key={order.orderID} className="order-card">


          <h3>🆔 {order.orderID}</h3>
          <p>
            <strong>Total Worth:</strong> ₹{order.orderWorth}
          </p>

          <h4>🛒 Products:</h4>
         <ul className="product-list">

            {order.products.map((p) => (
              <li key={p.productID} style={{ marginBottom: "10px" }}>
                <strong>{p.name}</strong> (x{p.quantity}) - {p.productID}
                <br />
                <img
                  src={p.image}
                  alt={p.name}
                  width="100"
                  height="100"
                  style={{ marginTop: "5px" }}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
}
