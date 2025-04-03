const ModelShow = ({ isModalOpen, selectedCategory, handleCloseModal,formatDate }) => {
    return (
      <>
        {isModalOpen && (
          <div
            id="crud-modal"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
            onClick={handleCloseModal}
          >
            <div
              className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700"
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant dans le modal
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Détails de la catégorie
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
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
  
              {/* Contenu du modal */}
              <form className="p-4 md:p-5">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nom de la catégorie
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={selectedCategory?.nom || ""}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
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
                    value={formatDate(selectedCategory?.date) || ""}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default ModelShow;
  
  