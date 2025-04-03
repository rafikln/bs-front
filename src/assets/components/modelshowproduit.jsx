import { useState } from "react";

const ModelShowProduit = ({ isModalOpen, selectedProduct, handleCloseModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!selectedProduct) return null;

  // Extraction des images (en JSON string)
  let images = [];
  try {
    images = selectedProduct.image ? JSON.parse(selectedProduct.image) : [];
  } catch {
    images = [];
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {isModalOpen && (
        <div
          id="crud-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative p-4 w-[70vw] max-w-md bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Détails du Produit</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-[30px] h-[30px] ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleCloseModal}
              >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* CAROUSEL */}
            <div id="default-carousel" className="relative w-full h-56 overflow-hidden rounded-lg md:h-72">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-opacity duration-700 flex justify-center items-center  ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={`https://backendrafik.onrender.com${img}`}
                    className="  object-cover rounded-lg w-[40%]"
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}

              {/* INDICATEURS */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? "bg-white" : "bg-gray-400"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  ></button>
                ))}
              </div>

              {/* CONTROLES */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800/30 text-white p-2 rounded-full"
                    onClick={prevSlide}
                  >
                    ◀
                  </button>
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800/30 text-white p-2 rounded-full"
                    onClick={nextSlide}
                  >
                    ▶
                  </button>
                </>
              )}
            </div>

            {/* INFOS PRODUIT */}
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Nom du Produit</label>
                <p className="text-gray-700 dark:text-gray-300">{selectedProduct.nom}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">Quantité</label>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProduct.quantite}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">Prix de Vente</label>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProduct.prix_vente} DA</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">Prix d'Achat</label>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProduct.prix_achat} DA</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">Référence</label>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProduct.reference}</p>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <p className="text-gray-700 dark:text-gray-300">{selectedProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelShowProduit;
