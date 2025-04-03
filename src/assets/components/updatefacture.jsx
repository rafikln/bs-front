import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
const UpdateFacture = ({
  isUpdateModalOpen,
  selectedFacture,
  handleCloseUpdateModal,
  onUpdateFacture,
}) => {
  const [factureData, setFactureData] = useState({
    nomClient: "",
    produits: [],
  });

  const [listProduits, setListProduits] = useState([]); // Liste des produits disponibles

  // Charger la liste des produits disponibles (simulée ici, remplacez par votre API)
  useEffect(() => {
    const fetchProduits = async () => {
      // Simulez des données ou utilisez une API
      const produitsDisponibles = [
        { id: 1, nom: "Produit A" },
        { id: 2, nom: "Produit B"  },
        { id: 3, nom: "Produit C"},
      ];
      setListProduits(produitsDisponibles);
    };
    fetchProduits();
  }, []);

  // Charger les données de la facture sélectionnée lorsque le modal s'ouvre
  useEffect(() => {
    if (selectedFacture) {
      setFactureData({
        nomClient: selectedFacture.nom_client || "",
        produits: [...selectedFacture.produits] || [],
      });
    }
  }, [selectedFacture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactureData({ ...factureData, [name]: value });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProduits = [...factureData.produits];
    updatedProduits[index] = { ...updatedProduits[index], [name]: value };
    setFactureData({ ...factureData, produits: updatedProduits });
  };

  const handleAddProduct = () => {
    setFactureData({
      ...factureData,
      produits: [...factureData.produits, { id: "", quantite: "1" }],
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProduits = factureData.produits.filter((_, i) => i !== index);
    setFactureData({ ...factureData, produits: updatedProduits });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateFacture({
      ...selectedFacture,
      nom_client: factureData.nomClient,
      produits: factureData.produits,
    });
    handleCloseUpdateModal();
  };

  if (!isUpdateModalOpen) return null;

  return (
    <div
      id="update-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
      onClick={handleCloseUpdateModal}
    >
      <div
        className="relative p-4 w-full max-w-lg overflow-y-auto h-auto bg-white rounded-lg shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-lg font-semibold">Modifier la facture</h3>
          <button onClick={handleCloseUpdateModal} className="text-gray-400">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Champ Nom du client */}
          <div className="mb-4">
            <label htmlFor="nomClient" className="block text-sm font-medium">
              Nom du client
            </label>
            <input
              type="text"
              id="nomClient"
              name="nomClient"
              value={factureData.nomClient}
              onChange={handleChange}
              className="block w-full mt-1 border rounded-lg p-2"
              required
            />
          </div>

          {/* Liste des produits */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Produits</label>
            {factureData.produits.map((produit, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <select
                  name="id"
                  value={produit.id || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="flex-1 border rounded-lg p-2"
                  required
                >
                  <option value="">Sélectionnez un produit</option>
                  {listProduits.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.nom}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="quantite"
                  value={produit.quantite || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="w-20 border rounded-lg p-2"
                  placeholder="Qté"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProduct}
              className="text-blue-500"
            >
              Ajouter un produit
            </button>
          </div>

          {/* Bouton Enregistrer */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-2 mt-4"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFacture;
