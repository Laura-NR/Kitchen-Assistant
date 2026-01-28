export default function WelcomeCard({ onAddClick}) {
  return (
    <div className="welcome-card text-center p-5 mt-5 shadow-sm mx-auto" style={{ maxWidth: "600px", border: "2px solid #d4af37", borderRadius: "15px", backgroundColor: "white" }}>
      <h2 style={{ color: "#1a2f1a" }}>Welcome to Your Kitchen Assistant</h2>
      <p className="fst-italic">"Every great meal starts with a single recipe."</p>
      <hr style={{ borderColor: "#d4af37", width: "50%", margin: "1.5rem auto" }} />
      <p>Your digital cookbook is currently empty.</p>
      <button className="btn btn-primary px-4 py-2" style={{ backgroundColor: "#1a2f1a", borderColor: "#d4af37", color: "#d4af37" }} onClick={onAddClick}>
        Add Your First Recipe
      </button>
    </div>
    );
}