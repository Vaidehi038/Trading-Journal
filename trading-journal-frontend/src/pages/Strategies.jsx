import { useEffect, useState } from "react";

function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");

  // Fetch strategies
  const fetchStrategies = () => {
    fetch("http://localhost:3001/strategies")
      .then(res => res.json())
      .then(setStrategies);
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/strategies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        fetchStrategies(); 
        setForm({ name: "", description: "" });
      });
  };
  //edit description
  const handleSave = (id) => {
  fetch(`http://localhost:3001/strategies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description: editedDescription
    })
  })
    .then(res => res.json())
    .then(() => {
      setEditingId(null);
      fetchStrategies(); 
    });
};

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">Strategies</h2>

      {/* Add Strategy Form */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h5 className="mb-3">Add Strategy</h5>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Strategy Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="mt-3">
            <button className="btn btn-success">
              Add Strategy
            </button>
          </div>

        </form>
      </div>

      {/* Strategy List */}
      <div className="card shadow-sm border-0 p-4">
        <h5 className="mb-3">All Strategies</h5>
        <div className="table-scroll">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {strategies.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  {editingId === s.id ? (
                  <input
                    className="form-control"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                ) : (
                  s.description
                )}
                </td>
                <td>
                  {editingId === s.id ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleSave(s.id)}
                  >
                  Save
                  </button>
                ) : (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                setEditingId(s.id);
                setEditedDescription(s.description);
              }}
              >
              Edit
              </button>
            )}
            </td>
              </tr>
            ))}
          </tbody>

        </table>
        </div>
      </div>

    </div>
  );
}

export default Strategies;