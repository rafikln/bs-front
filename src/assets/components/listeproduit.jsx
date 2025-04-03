import React, { useState, useEffect } from "react";
import ConfirmedeleteProduit from "./confirmedeleteproduit";
import ModelShowProduit from "../components/modelshowproduit"; // Importer la modale d'affichage
import ModelUpdateProduit from "../components/modelupdateproduit"; // Importer la modale de mise à jour
import show from "../icon/show.svg";
import update from "../icon/update.svg";
import delet from "../icon/delete.svg";
import toast from "react-hot-toast";

const ListeProduit = () => {
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Etat pour la modale de mise à jour
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchProduits = async () => {
    try {
      const response = await fetch("https://backendrafik.onrender.com/ProduitAll");
      if (response.ok) {
        const data = await response.json();
        setProduits(data.data);
      } 
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  // Récupérer les produits
  useEffect(() => {
   
    fetchProduits();
  }, []);

  // Filtrer les produits en fonction du terme de recherche
  const produitsFiltres = produits.filter((produit) =>
    produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ouvrir la modale d'affichage
  const handleShowModal = (produit) => {
    setSelectedProduct(produit);
    setIsModalOpen(true);
  };

  // Fermer la modale d'affichage
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Ouvrir la modale de mise à jour
  const handleShowUpdateModal = (produit) => {
    setSelectedProduct(produit);
    setIsUpdateModalOpen(true);
  };

  // Fermer la modale de mise à jour
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProduct(null);
  };

  // Ouvrir la modale de suppression
  const handleOpenDeleteModal = (id) => {
    setSelectedProductId(id);
    setIsConfirmModalOpen(true);
  };

  // Annuler la suppression
  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setSelectedProductId(null);
  };

  // Confirmer la suppression
  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`https://backendrafik.onrender.com//ProduitDelete/${selectedProductId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        setProduits((prevProduits) =>
          prevProduits.filter((produit) => produit.id !== selectedProductId)
        );
        setIsConfirmModalOpen(false);
        setSelectedProductId(null);
        toast.success(result.message);
      } else {
        toast.error( "Vous n'avez pas le droit de supprimer car il est utilisé.");
      }
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  return (
    <>
      <div className="w-full h-[90px] flex justify-between items-center p-[30px]">
        <div className="breadcrumbs text-sm">
          <ul>
            <li className="text-[gray] ">
              <a>Accueil</a>
            </li>
            <li className="text-[blue]">
              <a>Liste Produit</a>
            </li>
          </ul>
        </div>

        <div className="w-[190px] h-[50px]">
          <input
            type="text"
            className="grow rounded-md"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="pl-[30px] pr-[80px]">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span>Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Nom de produit</th>
                <th scope="col" className="px-6 py-3">Qte</th>
                <th scope="col" className="px-6 py-3">Prix</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {produitsFiltres.map((produit) => (
                <tr
                  key={produit.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                  <img
  src={(() => {
    try {
      return produit.image ? `https://backendrafik.onrender.com${JSON.parse(produit.image)[0]}` : "";
    } catch {
      return "";
    }
  })()}
  style={{
    height: "100px",
    margin: "0 auto",
    display: "block",
    borderRadius: "5px",
    userSelect: "none",
  }}
  alt={produit.nom}
/>
                  </td>
                  <td className="px-6 py-4 w-[30%] font-semibold text-gray-900 dark:text-white">
                    {produit.nom}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <input
                          type="number"
                          disabled
                          value={produit.quantite}
                          className="bg-gray-50 w-[65px] text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold w-[13%] text-gray-900 dark:text-white">
                    {produit.prix_vente} DA
                  </td>
                  <td className="h-[170px] flex gap-2 items-center">
                    {/* Bouton pour afficher */}
                    <div
                      className="w-[33px] h-[30px] flex justify-center p-1 items-center rounded-md bg-[#827474] cursor-pointer"
                      onClick={() => handleShowModal(produit)}
                    >
                      <img src={show} alt="show" />
                    </div>

                    {/* Bouton pour modifier */}
                    <div
                      className="w-[33px] h-[30px] flex justify-center p-1 items-center rounded-md bg-[#3e47f5] cursor-pointer"
                      onClick={() => handleShowUpdateModal(produit)}
                    >
                      <img src={update} alt="update" />
                    </div>

                    {/* Bouton pour supprimer */}
                    <div
                      className="w-[33px] h-[30px] flex justify-center p-1 items-center rounded-md bg-[#d14f4f] cursor-pointer"
                      onClick={() => handleOpenDeleteModal(produit.id)}
                    >
                      <img src={delet} alt="delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale de confirmation */}
      <ConfirmedeleteProduit
        isConfirmModalOpen={isConfirmModalOpen}
        handleDeleteCategory={handleDeleteCategory}
        handleCancelDelete={handleCancelDelete}
      />

      {/* Modale d'affichage */}
      <ModelShowProduit
        isModalOpen={isModalOpen}
        selectedProduct={selectedProduct}
        handleCloseModal={handleCloseModal}
      />

      {/* Modale de mise à jour */}
      <ModelUpdateProduit
      fetchProduits={fetchProduits}
        isUpdateModalOpen={isUpdateModalOpen}
        selectedProduct={selectedProduct}
        handleCloseUpdateModal={handleCloseUpdateModal}
        handleUpdateProduct={(updatedProduct) => {
          setProduits((prevProduits) =>
            prevProduits.map((produit) =>
              produit.id === updatedProduct.id ? updatedProduct : produit
            )
          );
        }}
      />
    </>
  );
};

export default ListeProduit;
