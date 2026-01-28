import React from 'react';
import '../singleRecipe.css'; 

function SingleRecipe({ recipe, onClose }) {
    const imageUrl = `${import.meta.env.VITE_BACKEND_URL}${recipe?.imagePath}`;

    return (
        <div className="modal-overlay-recipe" onClick={onClose}>
            <div className="modal-content-recipe shadow-lg" onClick={e => e.stopPropagation()} 
                 style={{ border: "3px solid #d4af37", borderRadius: "20px" }}>
                
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="recipe-title-display">{recipe.title}</h1>
                    <span className="badge-category">{recipe.category?.name}</span>
                </header>

                <div className="row">
                    <div className="col-md-5">
                        <img src={imageUrl} alt={recipe.title} className="rounded img-fluid recipe-hero-img" />
                        <div className="mt-4 p-3 bg-light rounded border-gold">
                            <h5 className="border-bottom pb-2">Ingredients</h5>
                            <ul className="list-unstyled">
                                {recipe.ingredients?.map((item, index) => (
                                    <li key={index}>• {item.quantity} {item.unit} {item.ingredient.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="col-md-7">
                        <h5 className="border-bottom pb-2">Preparation</h5>
                        <div className="instructions-text">
                            {recipe.instructions}
                        </div>
                    </div>
                </div>

                <footer className="mt-4 d-flex justify-content-end gap-3">
                    {recipe.sourceLink && (
                        <a href={recipe.sourceLink} target="_blank" className="btn btn-outline-dark">Tutorial</a>
                    )}
                    <button onClick={onClose} className="btn btn-gold-fill">Close</button>
                </footer>
            </div>
        </div>
    );
}

export default SingleRecipe;
