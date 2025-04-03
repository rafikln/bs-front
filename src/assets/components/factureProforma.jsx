import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const FactureProforma = () => {
  const [page, setPage] = useState(false);
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [factures, setFactures] = useState([]);
  const [filteredFactures, setFilteredFactures] = useState([]);
  const [revenuTotal, setRevenuTotal] = useState(0);
  const [capitalTotal, setCapitalTotal] = useState(0);
  const [revenuNetTotal, setRevenuNetTotal] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  // Fonction pour récupérer les factures
  const fetchFactures = async () => {
    try {
      const response = await fetch("https://backendrafik.onrender.com/FacturesAll");
      if (!response.ok) throw new Error("Erreur lors de la récupération des factures");

      const data = await response.json();
      setFactures(data);
      setFilteredFactures(data);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la récupération des données.");
    }
  };

  useEffect(() => {
    if (page) fetchFactures();
  }, [page]);

  // Fonction pour appliquer le filtre
  const applyFilter = () => {
    const now = new Date();
    let filtered = factures;

    switch (filter) {
      case "day":
        filtered = factures.filter(
          (facture) => new Date(facture.date_creation).toDateString() === now.toDateString()
        );
        break;
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        filtered = factures.filter(
          (facture) =>
            new Date(facture.date_creation) >= weekStart &&
            new Date(facture.date_creation) <= weekEnd
        );
        break;
      case "month":
        filtered = factures.filter(
          (facture) =>
            new Date(facture.date_creation).getMonth() === now.getMonth() &&
            new Date(facture.date_creation).getFullYear() === now.getFullYear()
        );
        break;
      case "year":
        filtered = factures.filter(
          (facture) =>
            new Date(facture.date_creation).getFullYear() === now.getFullYear()
        );
        break;
      default:
        filtered = factures;
        break;
    }

    // Appliquer le filtre par plage de dates
    if (dateStart && dateEnd) {
      const start = new Date(dateStart);
      const end = new Date(dateEnd);
    
      // Inclure également les dates de début et de fin
      end.setHours(23, 59, 59, 999);
    
      filtered = filtered.filter((facture) => {
        const factureDate = new Date(facture.date_creation);
        return factureDate >= start && factureDate <= end;
      });
    }
    

    setFilteredFactures(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [filter, factures, dateStart, dateEnd]);

  // Recalcul des totaux après filtrage
  useEffect(() => {
    let totalRevenu = 0;
    let totalCapital = 0;

    filteredFactures.forEach((facture) => {
      facture.produits.forEach((produit) => {
        const prixVente = parseFloat(produit.prix_vente);
        const prixAchat = parseFloat(produit.prix_achat);
        const quantite = parseInt(produit.quantite, 10);

        if (!isNaN(prixVente) && !isNaN(prixAchat) && !isNaN(quantite)) {
          totalRevenu += prixVente * quantite;
          totalCapital += prixAchat * quantite;
        }
      });
    });

    const revenuNet = totalRevenu - totalCapital;

    setRevenuTotal(totalRevenu);
    setCapitalTotal(totalCapital);
    setRevenuNetTotal(revenuNet);
  }, [filteredFactures]);

  return (
    <div className="bg-gray-100">
      {page ? (
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Tableau de bord des factures
          </h1>

          {/* Filtres */}
          <div className="mb-6  flex items-center gap-4">
            <label className="text-lg font-bold text-gray-700">Filtrer par :</label>
            <select
              className="p-2 border rounded-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tout</option>
              <option value="day">Aujourd'hui</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>

            {/* Plage de dates */}
            <label className="text-lg font-bold text-gray-700 ml-4">De :</label>
            <input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <label className="text-lg font-bold text-gray-700">à :</label>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              className="p-2 border rounded-lg"
            />
          </div>

          {/* Tableau des factures */}
          <div className="flex-grow h-[272px] overflow-y-auto">
            <table className="w-full bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Client</th>
                  <th className="p-3 text-left">Prix total</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredFactures.map((facture) => (
                  <tr key={facture.id} className="border-t">
                    <td className="p-3">{facture.id}</td>
                    <td className="p-3">{facture.nom_client}</td>
                    <td className="p-3">
                      {Number(facture.prix_total).toFixed(2)} DA
                    </td>
                    <td className="p-3">
                      {new Date(facture.date_creation).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {filteredFactures.length < 4 &&
                  Array.from({ length: 4 - filteredFactures.length }).map((_, index) => (
                    <tr key={`empty-${index}`} className="border-t bg-gray-50">
                      <td className="p-3 text-gray-400 italic">-</td>
                      <td className="p-3 text-gray-400 italic">-</td>
                      <td className="p-3 text-gray-400 italic">-</td>
                      <td className="p-3 text-gray-400 italic">-</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-100 w-full h-[60px] flex justify-end">
            <div className="font-bold bg-red-400 w-[30%] flex justify-center items-center text-[20px] text-white">
              <h1>Revenus totaux</h1>
            </div>
            <div className="font-bold text-red-600 bg-white w-[50%] flex justify-center items-center text-[20px] border-t-[1px] border-[#d9d6d6]">
              <h1>{revenuTotal.toFixed(2)} DA</h1>
            </div>
          </div>

          <div className="bg-gray-100 w-full h-[60px] flex justify-end">
            <div className="font-bold bg-yellow-400 w-[30%] flex justify-center items-center text-[20px] text-white">
              <h1>Capital Total</h1>
            </div>
            <div className="font-bold text-yellow-400 bg-white w-[50%] flex justify-center items-center text-[20px] border-t-[1px] border-[#d9d6d6]">
              <h1>{capitalTotal.toFixed(2)} DA</h1>
            </div>
          </div>

          <div className="bg-gray-100 w-full h-[60px] flex justify-end">
            <div className="font-bold bg-green-400 w-[30%] flex justify-center items-center text-[20px] text-white">
              <h1>Revenu Net Total</h1>
            </div>
            <div className="font-bold text-green-400 bg-white w-[50%] flex justify-center items-center text-[20px] border-t-[1px] border-[#d9d6d6]">
              <h1>{revenuNetTotal.toFixed(2)} DA</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="bg-white/80 backdrop-blur-lg p-10 rounded-lg shadow-xl w-[400px]">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Connexion sécurisée</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (password === "admin123") {
                  setPage(true);
                  setHasError(false);
                } else {
                  setHasError(true);
                  toast.error("Mot de passe incorrect. Veuillez réessayer.");
                }
              }}
            >
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setHasError(false);
                  }}
                  className={`w-full p-3 rounded-lg border ${
                    hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  } focus:ring-2 focus:outline-none transition`}
                  required
                />
                {hasError && (
                  <p className="text-red-500 text-sm mt-2">Mot de passe incorrect. Essayez à nouveau.</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-3 text-lg font-semibold text-white bg-[#070c2b] hover:bg-[#070c2bc8] rounded-lg  focus:ring-4 focus:ring-blue-300 transition"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactureProforma;
