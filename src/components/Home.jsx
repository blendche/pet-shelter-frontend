
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/dogs";

function Home() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDog, setEditingDog] = useState(null);

  // Fetch all dogs from backend
  const fetchDogs = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch dogs");
      }

      const data = await response.json();
      setDogs(data);
    } catch (error) {
      console.error(error);
      alert("Could not load dogs. Check your backend!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  // DELETE dog
  const deleteDog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dog?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      alert("Dog deleted successfully!");

      fetchDogs();
    } catch (error) {
      alert(error.message);
    }
  };

  // PUT - Update dog
  const updateDog = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/${editingDog.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingDog),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Dog updated successfully!");

      setEditingDog(null);
      fetchDogs();
    } catch (error) {
      alert(error.message);
    }
  };

  // Update form state
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingDog({
      ...editingDog,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p>Loading dogs...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1><section></section>
          Find yourself a best friend 🐶
        </h1>
        <p className="text-muted">
          Meet our adorable strays asking for a loving family!
        </p>
      </div>

      {/* EDIT DOG FORM */}
      {editingDog && (
        <div className="card shadow p-4 mb-5">
          <h3 className="mb-4">Edit Dog</h3>

          <form onSubmit={updateDog}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Dog Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editingDog.name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={editingDog.gender}
                  onChange={handleEditChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={editingDog.image || ""}
                  onChange={handleEditChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={editingDog.status || "Available"}
                  onChange={handleEditChange}
                >
                  <option value="Available">Available</option>
                  <option value="Adopted">Adopted</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={editingDog.description || ""}
                  onChange={handleEditChange}
                />
              </div>

              <div className="col-12">
                <button className="btn btn-success me-2" type="submit">
                  Save Changes
                </button>

                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setEditingDog(null)}
                >
                  Cancel
                </button>
              </div>

            </div>
          </form>
        </div>
      )}

      {/* DOG CARDS */}
      <div className="row g-4">

        {dogs.length === 0 ? (
          <div className="col-12 text-center">
            <h4>No dogs available yet.</h4>
          </div>
        ) : (
          dogs.map((dog) => (
            <div className="col-12 col-md-6 col-lg-4" key={dog.id}>

              <div className="card h-100 shadow-sm border-0">

                <img
                  src={
                    dog.image ||
                    "https://placehold.co/600x400?text=Dog+Photo"
                  }
                  className="card-img-top"
                  alt={dog.name}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h4 className="card-title fw-bold">
                    {dog.name}
                  </h4>

                  <p className="mb-2">
                    <strong>Gender:</strong> {dog.gender}
                  </p>

                  <p className="card-text">
                    {dog.description}
                  </p>

                  <span
                    className={`badge ${
                      dog.status === "Available"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {dog.status}
                  </span>

                </div>

                <div className="card-footer bg-white border-0 pb-3">

                  <button
                    className="btn btn-warning me-2"
                    onClick={() => setEditingDog({ ...dog })}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDog(dog.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Home;
