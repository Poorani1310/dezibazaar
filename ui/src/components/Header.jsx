import React from "react";
import { auth, provider, db } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DesiContext } from "../context/DesiContext.jsx";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();

  const {
    products,
    setProducts,
    pdtsToDisplay,
    setPdtsToDisplay,
    user,
    setUser,
  } = useContext(DesiContext);

  const addUser = async (user) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          cart_items: [],
          order_items: [],
        }),
      });

      const data = await response.json();
      console.log("User added: ", data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleLogin = async () => {
    console.log("Google Login clicked");
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
      alert("Login successful!");
      console.log("User in home component after login: ", result);
      addUser(result.user);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleProducts = async () => {
    setPdtsToDisplay(products);
    console.log("Products in header component: ", products);
    navigate("/products");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser("");
      //   setLogFlag(false);
      alert("Logout successful!");
      //   setVisiblePopup(false);
      navigate("/");
    } catch (error) {
      console.log("signout failed", error);
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.toLowerCase();
      const filteredProducts = products.filter(
        (product) =>
          product.pdt_name.toLowerCase().includes(query) ||
          product.pdt_brand.toLowerCase().includes(query),
      );
      console.log("Products filtered from search ", filteredProducts);
      setPdtsToDisplay(filteredProducts);
      navigate("/products");
    }
  };

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.pdt_name.toLowerCase().includes(query) ||
        product.pdt_brand.toLowerCase().includes(query),
    );
    console.log("Products filtered from search ", filteredProducts);
    setPdtsToDisplay(filteredProducts);
    navigate("/products");
  };

  const handleMyOrders = () => {
    console.log("My Orders clicked");
    navigate("/myorders");
  };

  const handleMyCart = () => {
    console.log("My Cart clicked");
    navigate("/mycart");
  };

  return (
    <div className="navbar">
      <div className="navbar__s1">
        <h1 className="navbar__s1__title">desibazaar</h1>
      </div>

      <div className="navbar__s2">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          placeholder="Search for anything here"
          onKeyDown={handleSearch}
          onChange={handleChange}
        />
      </div>

      <div className="navbar__s3">
        <p className="cursor-pointer" onClick={() => navigate("/")}>
          {" "}
          Home{" "}
        </p>
        {user && (
          <div className="myorders">
            <p onClick={handleMyOrders}>My Orders</p>
          </div>
        )}
        {user && (
          <i
            className="fa-solid fa-cart-shopping cursor-pointer"
            onClick={handleMyCart}
          ></i>
        )}
        
        <div className="profile">
          <i className="fa-solid fa-user cursor-pointer"></i>
          <div className="profile__popup">
            {user ? (<p className="cursor-pointer" onClick={handleSignOut}>
                      Logout
                    </p>) : 
                    (<p className="cursor-pointer" onClick={handleLogin}>
                          Login
                    </p>)
            }
          </div>
        </div>

        </div>
          <div className="navbar__s4">
          <i className="fa-solid fa-bars"></i>
          <div className="navbar__s4__popup">
          {user ? (
            <div>
              <p className="cursor-pointer" onClick={() => navigate("/")}>
                Home
              </p>
              <p className="cursor-pointer" onClick={handleMyOrders}>
                My Orders
              </p>
              <p className="cursor-pointer" onClick={handleMyCart}>
                My Cart
              </p>
              <p className="cursor-pointer" onClick={handleSignOut}>
                Logout
              </p>
            </div>) : 
            (
            <div>
              <p className="cursor-pointer" onClick={() => navigate("/")}>
                Home
              </p>
              <p className="cursor-pointer" onClick={handleLogin}>
                Login
              </p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Header;
