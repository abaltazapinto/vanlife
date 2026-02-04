import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";

function Layout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "red"
  }
  
  return (
    <div>
      <h3>Welcome to my page!</h3>
      <nav>
        <NavLink 
          to="/"
          style={({isActive}) => isActive ? activeStyle : null }
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/about"
          style={({isActive}) => isActive ? activeStyle : null }
        >
          About
        </NavLink>
        
        <NavLink 
          to="/contact"
          style={({isActive}) => isActive ? activeStyle : null }
        >
          Contact
        </NavLink>
        
      </nav>
      <Outlet />
    </div>
  )
};

function HomePage() {
  return (
    <main>
      <h2>Home</h2>
    </main>
  );
}

function AboutPage() {
  return (
    <main>
      <h2>About Me</h2>
    </main>
  );
}

function ContactPage() {
  return (
    <main>
      <h2>Contact</h2>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)