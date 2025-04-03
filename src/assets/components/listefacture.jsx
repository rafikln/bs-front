import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import toast from "react-hot-toast";
import FacturePDF from "./pdf.jsx";
import UpdateFacture from "./updatefacture.jsx";
import ConfirmedeleteFact from "./confirmedeletefact.jsx";

import pdf from "../icon/pdf.svg";
import Delete from "../icon/delete.svg";

const ListeFacture = () => {
  const [factures, setFactures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFactures, setFilteredFactures] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteFactureId, setDeleteFactureId] = useState(null);

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const response = await fetch("https://backendrafik.onrender.com/FacturesAll");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json(); 
        setFactures(data);
        setFilteredFactures(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des factures !");
        console.error(error);
      }
    };

    fetchFactures();
  }, []);

  useEffect(() => {
    let filtered = factures.filter(
      (facture) =>
        facture.nom_client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.id.toString().includes(searchTerm)
    );

    if (dateStart && dateEnd) {
      const start = new Date(dateStart);
      const end = new Date(dateEnd);
      end.setHours(23, 59, 59, 999);

      filtered = filtered.filter((facture) => {
        const factureDate = new Date(facture.date_creation);
        return factureDate >= start && factureDate <= end;
      });
    }

    setFilteredFactures(filtered);
  }, [searchTerm, dateStart, dateEnd, factures]);

  const handleOpenDeleteModal = (factureId) => {
    setDeleteFactureId(factureId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteFactureId) return;
  
    try {
        console.log("Tentative de suppression de la facture avec ID :", deleteFactureId);
  
        const response = await fetch(`https://backendrafik.onrender.com/factures/${deleteFactureId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const contentType = response.headers.get("content-type");
        
        if (!response.ok) {
            let errorMessage = "Erreur lors de la suppression";
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } else {
                console.error("Réponse inattendue :", await response.text());
            }
            throw new Error(errorMessage);
        }
  
        console.log("Facture supprimée avec succès !");
        
        // Met à jour la liste des factures après suppression
        setFactures((prevFactures) => prevFactures.filter((facture) => facture.id !== deleteFactureId));
        setIsDeleteModalOpen(false);
        toast.success("Facture supprimée avec succès !");
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        toast.error(err.message || "Échec de la suppression !");
    }
};

  
  

  const handleCancelDelete = () => {
    setDeleteFactureId(null);
    setIsDeleteModalOpen(false);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <div className="w-full h-[90px] flex justify-between items-center p-[30px]">
        <div className="breadcrumbs text-sm">
          <ul>
            <li className="text-[gray]">
              <a>Accueil</a>
            </li>
            <li className="text-[blue]">
              <a>Liste Facture</a>
            </li>
          </ul>
        </div>
        <input
          type="text"
          className="px-4 py-2 rounded-md shadow-md border focus:outline-none"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-center gap-2 space-x-4 mt-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700">De :</label>
          <input type="date" className="p-2 border rounded-md" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-700">À :</label>
          <input type="date" className="p-2 border rounded-md" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <div className="w-full pl-[30px] pr-[80px]">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#Num</th>
                <th className="px-4 py-2 text-left">Nom du client</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Prix Total</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFactures.length > 0 ? (
                filteredFactures.map((facture) => (
                  <tr key={facture.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{facture.id}</td>
                    <td className="px-4 py-2">{facture.nom_client}</td>
                    <td className="px-4 py-2">{formatDate(facture.date_creation)}</td>
                    <td className="px-4 py-2">{facture.prix_total} DA</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <PDFDownloadLink document={<FacturePDF facture={facture} />} fileName={`Facture_${facture.id}.pdf`}>
                        <button className="w-8 h-8 flex justify-center items-center bg-gray-600 text-white rounded-md hover:bg-gray-500">
                          <img src={pdf} alt="pdf" className="w-5 h-5" />
                        </button>
                      </PDFDownloadLink>
                      <button onClick={() => handleOpenDeleteModal(facture.id)} className="w-8 h-8 flex justify-center items-center bg-red-600 text-white rounded-md hover:bg-red-500">
                        <img src={Delete} alt="delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 px-4 py-2">Aucune facture trouvée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmedeleteFact isOpen={isDeleteModalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </div>
  );
};

export default ListeFacture;
