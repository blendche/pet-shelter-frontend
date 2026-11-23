
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    description: "",
    image: "",
    status: "Available",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // POST - Add new dog
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/dogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add dog");
      }

      alert("Dog added successfully! 🐶");

      setFormData({
        name: "",
        gender: "Male",
        description: "",
        image: "",
        status: "Available",
      });

      navigate("/");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-12 col-md-8 col-lg-6">

          <div className="card shadow border-0 p-4">

            <div className="text-center mb-4">
              <h2 className="fw-bold">Add a New Dog 🐕</h2>

              <p className="text-muted">
                Help us find a loving home for another dog!
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Dog Name */}
              <div className="mb-3">
                <label className="form-label">
                  Dog Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter dog's name"
                  required
                />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="form-label">
                  Gender
                </label>

                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the dog..."
                />
              </div>

              {/* Image URL */}
              <div className="mb-3">
                <label className="form-label">
                  Dog Image URL
                </label>

                <input
                  type="url"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/dog.jpg"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="form-label">
                  Adoption Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Adopted">Adopted</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Adding Dog..." : "Add Dog"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDog;
