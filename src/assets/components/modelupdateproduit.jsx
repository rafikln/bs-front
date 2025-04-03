import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ModelUpdateProduit = ({
  fetchProduits, 
  isUpdateModalOpen, 
  selectedProduct, 
  handleCloseUpdateModal, 
  handleUpdateProduct 
}) => {
  const [productData, setProductData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Vérifier si le nom du produit est valide
    if (!productData.nom.trim()) {
      setError(true);
      toast.error("Le nom du produit est obligatoire.");
      return;
    }
  
    // Vérifier si tous les champs sont correctement renseignés
    if (!productData.prix_vente || !productData.prix_achat || !productData.quantite) {
      toast.error("Tous les champs doivent être remplis.");
      return;
    }
  
    setError(false);
  
    try {
      const response = await fetch(`https://backendrafik.onrender.com/ProduitEdit/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categorie_id: productData.categorie_id,
          nom: productData.nom,
          description: productData.description,
          prix_vente: productData.prix_vente,
          prix_achat: productData.prix_achat,
          quantite: productData.quantite,
          reference: productData.reference
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        handleUpdateProduct(data.data);  // Met à jour le produit dans la liste parent
        toast.success("Produit mis à jour avec succès !");
        handleCloseUpdateModal(); // Ferme la modale
        fetchProduits()
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      toast.error("Erreur de connexion à l'API.");
    }
  };
  
  

  if (!isUpdateModalOpen) return null;

  return (
    <div
      id="update-modal"
      className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 transition-opacity ${
        isUpdateModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleCloseUpdateModal}
    >
      <div
        className="relative p-4 w-full max-w-[700px] h-[600px] bg-white rounded-lg shadow dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Modifier le Produit
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleCloseUpdateModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Fermer</span>
          </button>
        </div>

        <form className="p-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nom"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom du produit
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={productData.nom || ""}
              onChange={handleChange}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                error ? "border-red-500" : "border-gray-300"
              } dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              required
            />
            {error && <p className="text-red-500 text-sm">Ce champ est requis.</p>}
          </div>

          <div>
            <label
              htmlFor="quantite"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantité
            </label>
            <input
              type="number"
              id="quantite"
              name="quantite"
              value={productData.quantite || ""}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="prix_vente"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Prix de vente
            </label>
            <input
              type="number"
              id="prix_vente"
              name="prix_vente"
              value={productData.prix_vente || ""}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="prix_achat"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Prix d'achat
            </label>
            <input
              type="number"
              id="prix_achat"
              name="prix_achat"
              value={productData.prix_achat || ""}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reference"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Référence
            </label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={productData.reference || ""}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description || ""}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              rows="2"
            />
          </div>

          <button
            type="submit"
            className="w-[180px] absolute bottom-2 right-[45px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModelUpdateProduit;
