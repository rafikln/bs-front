import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ModelUpdate = ({ 
  isUpdateModalOpen, 
  selectedCategory, 
  handleCloseUpdateModal, 
  handleUpdateCategory ,
  setListe,
  formatDate
}) => {
  const [categoryData, setCategoryData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryData(selectedCategory);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryData.nom.trim()) {
      setError(true);
      toast.error("Le nom de la catégorie est obligatoire.");
      return;
    }
    setError(false);

    try {
      const response = await fetch(`https://backendrafik.onrender.com/CategorieEdit/${selectedCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom: categoryData.nom }),
      });

      const data = await response.json();

      if (response.ok) {
        handleUpdateCategory(data.data);  // Met à jour la catégorie dans la liste parent
       toast.success("Catégorie mise à jour avec succès !");
        handleCloseUpdateModal(); // Ferme le modal
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
        className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Modifier la catégorie
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

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nom"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom de la catégorie
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={categoryData.nom || ""}
              onChange={handleChange}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                error ? "border-red-500" : "border-gray-300"
              } dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              required
            />
            {error && <p className="text-red-500 text-sm">Ce champ est requis.</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="timestamps"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <input
              type="text"
              id="timestamps"
              name="timestamps"
              value={formatDate(categoryData?.date || "")}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              disabled={true}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModelUpdate;
