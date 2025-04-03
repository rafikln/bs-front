import React, { useState } from "react";
import show from "../icon/show.svg";
import update from "../icon/update.svg";
import delet from "../icon/delete.svg";
import toast from "react-hot-toast";

const ListeClient = () => {
  // Hardcoded list of 10 clients
  const [clients] = useState([
    { id: 1, name: "Ahmed Benali", nisse: "123456", nife: "789012", address: "12 Rue Alger" },
    { id: 2, name: "Fatima Zohra", nisse: "234567", nife: "890123", address: "45 Avenue Oran" },
    { id: 3, name: "Mohamed Khelifi", nisse: "345678", nife: "901234", address: "78 Boulevard Constantine" },
    { id: 4, name: "Amina Saidi", nisse: "456789", nife: "012345", address: "23 Rue Tlemcen" },
    { id: 5, name: "Karim Boudiaf", nisse: "567890", nife: "123456", address: "56 Avenue Annaba" },
    { id: 6, name: "Leila Merabet", nisse: "678901", nife: "234567", address: "89 Rue Blida" },
    { id: 7, name: "Rachid Hamdi", nisse: "789012", nife: "345678", address: "34 Boulevard Sétif" },
    { id: 8, name: "Nadia Cherif", nisse: "890123", nife: "456789", address: "67 Avenue Batna" },
    { id: 9, name: "Sofiane Larbi", nisse: "901234", nife: "567890", address: "90 Rue Bejaia" },
    { id: 10, name: "Yasmina Djebbar", nisse: "012345", nife: "678901", address: "15 Avenue Djelfa" },
  ]);

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 ">
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
                <th scope="col" className="px-6 py-3">Nisse</th>
                <th scope="col" className="px-6 py-3">Nife</th>
                <th scope="col" className="px-6 py-3">Adresse</th>
                <th scope="col" className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
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
                    {client.name}
                  </td>
                  <td className="px-6 py-4">{client.nisse}</td>
                  <td className="px-6 py-4">{client.nife}</td>
                  <td className="px-6 py-4">{client.address}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <img src={show} alt="Show" className="w-5 h-5 cursor-pointer hover:opacity-75" />
                    <img src={update} alt="Update" className="w-5 h-5 cursor-pointer hover:opacity-75" />
                    <img src={delet} alt="Delete" className="w-5 h-5 cursor-pointer hover:opacity-75" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListeClient;