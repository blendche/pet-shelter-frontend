
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import AddDog from "./components/AddDog";
import dogImage from "./assets/dog-logo.png";
import './Navbarcolor.css'
function App() {
  return (
    <BrowserRouter>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navcolor">
        <div className="container">

          <Link className="navbar-brand fw-bold" to="/">
            <img
  src={dogImage}
  width="200px"
  alt="Dog"
  className="img-fluid hover-lift"
/>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">

              <li className="nav-item fw-bold hover-lift">
                <Link className="nav-link" to="/">
                  HOME
                </Link>
              </li>

              <li className="nav-item fw-bold hover-lift">
                <Link className="nav-link" to="/add-dog">
                  ADD DOG
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-dog" element={<AddDog />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
