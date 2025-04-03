import React, { useState, useEffect } from "react";
import show from "../icon/show.svg";
import update from "../icon/update.svg";
import delet from "../icon/delete.svg";
import toast from "react-hot-toast";

// Confirmation Delete Modal Component
const Confirmedelete = ({ isConfirmModalOpen, handleDeleteClient, handleCancelDelete, selectedClient }) => {
  return (
    <>
      {isConfirmModalOpen && (
        <div
          id="popup-modal"
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleCancelDelete} // Ferme la modale en cliquant à l'extérieur
        >
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant à l'intérieur
          >
            <h3 className="text-[20px] font-normal text-gray-500 dark:text-gray-400 text-center">
              Êtes-vous sûr de vouloir supprimer ce client : {selectedClient?.nom} ?
            </h3>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleDeleteClient}
                className="text-white bg-red-600 hover:bg-red-800 rounded-lg px-5 py-2"
              >
                Oui, supprimer
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-200 hover:bg-gray-300 rounded-lg px-5 py-2"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ListeClient = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Ajout pour la recherche
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [updatedClient, setUpdatedClient] = useState(null);

  // Récupérer les clients depuis l'API
  const fetchClients = async () => {
    try {
      const response = await fetch("https://api.trendybox-dz.com/clients");
      if (response.ok) {
        const data = await response.json();
        setClients(data.data); // Les données sont dans data.data selon votre API
      } else {
        toast.error("Erreur lors de la récupération des clients.");
      }
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  // Charger les clients au montage du composant
  useEffect(() => {
    fetchClients();
  }, []);

  // Filtrer les clients en fonction du terme de recherche
  const filteredClients = clients.filter((client) =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowClick = (client) => {
    setSelectedClient(client);
    setIsShowModalOpen(true);
  };

  const handleUpdateClick = (client) => {
    setUpdatedClient({ ...client });
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setIsConfirmModalOpen(true);
  };

  const handleCloseShowModal = () => {
    setIsShowModalOpen(false);
    setSelectedClient(null);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setUpdatedClient(null);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedClient(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient((prev) => ({ ...prev, [name]: value }));
  };

  // Mettre à jour un client via l'API
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.trendybox-dz.com/client/${updatedClient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === updatedClient.id ? result.data : client
          )
        );
        toast.success("Client mis à jour avec succès !");
        handleCloseUpdateModal();
      } else {
        toast.error("Erreur lors de la mise à jour du client.");
      }
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  // Supprimer un client via l'API
  const handleDeleteClient = async () => {
    if (selectedClient) {
      try {
        const response = await fetch(`https://api.trendybox-dz.com/Client/${selectedClient.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setClients((prevClients) =>
            prevClients.filter((client) => client.id !== selectedClient.id)
          );
          toast.success("Client supprimé avec succès !");
          handleCloseConfirmModal();
        } else {
          toast.error("Erreur lors de la suppression du client.");
        }
      } catch (error) {
        toast.error("Erreur serveur.");
      }
    }
  };

  const handleCancelDelete = () => {
    handleCloseConfirmModal();
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800">
        <nav className="breadcrumbs text-sm">
          <ul className="flex space-x-2">
            <li className="text-gray-500 dark:text-gray-400">
              <a href="#">Accueil</a>
            </li>
            <li className="text-blue-600 dark:text-blue-400">
              <a href="#">Liste Client</a>
            </li>
          </ul>
        </nav>
        <div className="w-48">
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6">
        <div className="relative overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">Image</th>
                <th scope="col" className="px-6 py-3">Nom de client</th>
                <th scope="col" className="px-6 py-3">Adresse</th>
                <th scope="col" className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <td className="px-6 py-4 flex justify-center">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg
                        className="absolute w-12 h-12 text-gray-400 -left-1 top-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {client.nom}
                  </td>
                  <td className="px-6 py-4">{client.Adresse}</td>
                  <td className="h-[170px] flex gap-2 items-center justify-center">
                    <div
                      className="w-[33px] h-[30px] flex justify-center p-1 items-center rounded-md bg-[#827474] cursor-pointer"
                      onClick={() => handleShowClick(client)}
                    >
                      <img src={show} alt="show" />
                    </div>
                    <div
                      className="w-[33px] h-[30px] flex justify-center p-1 items-center rounded-md bg-[#3e47f5] cursor-pointer"
                      onClick={() => handleUpdateClick(client)}
                    >
                      <img src={update} alt="update" />
                    </div>
                    <div
                      className="w-[33px] h-[30px] flex justify-center p-1 items-center rounded-md bg-[#d14f4f] cursor-pointer"
                      onClick={() => handleDeleteClick(client)}
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

      {/* Show Modal */}
      {isShowModalOpen && (
        <div
          id="show-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={handleCloseShowModal}
        >
          <div
            className="relative p-4 w-full max-w-xl bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Détails du client
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleCloseShowModal}
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
            <form className="p-4 md:p-5">
              <div className="flex gap-[30px]">
                <div className="mb-4 w-[50%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={selectedClient?.nom || ""}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Niss
                  </label>
                  <input
                    type="text"
                    value={selectedClient?.Niss || ""}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Niff
                </label>
                <input
                  type="text"
                  value={selectedClient?.Niff || ""}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Adresse
                </label>
                <input
                  type="text"
                  value={selectedClient?.Adresse || ""}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  value={selectedClient?.email || ""}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Téléphone
                </label>
                <input
                  type="text"
                  value={selectedClient?.telephone || ""}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div
          id="update-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={handleCloseUpdateModal}
        >
          <div
            className="relative p-4 w-full max-w-xl bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Modifier le client
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <form className="p-4 md:p-5" onSubmit={handleUpdateSubmit}>
              <div className="flex gap-[30px]">
                <div className="mb-4 w-[50%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={updatedClient?.nom || ""}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Niss
                  </label>
                  <input
                    type="text"
                    name="Niss"
                    value={updatedClient?.Niss || ""}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Niff
                </label>
                <input
                  type="text"
                  name="Niff"
                  value={updatedClient?.Niff || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Adresse
                </label>
                <input
                  type="text"
                  name="Adresse"
                  value={updatedClient?.Adresse || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={updatedClient?.email || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Téléphone
                </label>
                <input
                  type="text"
                  name="telephone"
                  value={updatedClient?.telephone || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <Confirmedelete
        isConfirmModalOpen={isConfirmModalOpen}
        handleDeleteClient={handleDeleteClient}
        handleCancelDelete={handleCancelDelete}
        selectedClient={selectedClient}
      />
    </div>
  );
};

export default ListeClient;