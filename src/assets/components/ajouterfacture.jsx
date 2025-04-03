import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AjouterFacture = () => {
  const [nomClient, setNomClient] = useState("");
  const [produits, setProduits] = useState([]);
  const [totalPrix, setTotalPrix] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [produitsDisponibles, setProduitsDisponibles] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountInput, setDiscountInput] = useState("");

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async (url, setter, errorMessage) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setter(data.data);
        }
      } catch (error) {
        toast.error("Erreur serveur.");
      }
    };

    fetchData("https://backendrafik.onrender.com/CategorieAll", setCategories, "Erreur lors de la récupération des catégories.");
    fetchData("https://backendrafik.onrender.com/ProduitAll", setProduitsDisponibles, "Erreur lors de la récupération des produits.");
  }, []);

  // Calculate total price and apply discount
  useEffect(() => {
    const total = produits.reduce((sum, produit) => sum + produit.prix_vente * produit.quantite, 0);
    setTotalPrix(total);
    setTotalAfterDiscount(Math.max(0, total - discount)); // Ensure total doesn't go below 0
  }, [produits, discount]);

  // Filter products
  const filteredProduits = produitsDisponibles.filter((prod) => {
    const matchesSearch = prod.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || prod.categorie_id === Number(selectedCategory);
    const inStock = prod.quantite > 0;
    return matchesSearch && matchesCategory && inStock;
  });

  // Add product to cart
  const handleAddToCart = (produit) => {
    setProduits((prevProduits) => {
      const produitExistant = prevProduits.find((p) => p.id === produit.id);
      if (produitExistant) {
        return prevProduits.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [...prevProduits, { ...produit, quantite: 1 }];
    });
  };

  // Remove product from cart
  const handleRemoveProduit = (id) => {
    setProduits((prevProduits) => prevProduits.filter((p) => p.id !== id));
  };

  // Apply discount
  const handleApplyDiscount = () => {
    const discountValue = parseFloat(discountInput);
    if (!isNaN(discountValue)) {  // Added missing closing parenthesis here
      if (discountValue >= 0 && discountValue <= totalPrix) {
        setDiscount(discountValue);
      } else {
        toast.error(`La remise doit être entre 0 et ${totalPrix} DA`);
      }
    } else {
      toast.error("Veuillez entrer un montant valide");
    }
  };
  // Submit invoice
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!nomClient.trim()) {
      alert("Veuillez entrer le nom du client.");
      return;
    }
    if (produits.length === 0) {
      alert("Veuillez ajouter au moins un produit.");
      return;
    }
  
    const payload = {
      nom_client: nomClient,
      produits: produits.map((produit) => ({
        produit_id: produit.id,
        quantite: produit.quantite,
      })),
      remise_total: discount, // Add discount to payload
    };
  
    try {
      const response = await fetch("https://backendrafik.onrender.com/FactureSave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement.");
      }
  
      toast.success("Facture enregistrée avec succès !");
      
      // Reset form
      setNomClient("");
      setProduits([]);
      setDiscount(0);
      setDiscountInput("");
      setTotalAfterDiscount(0);

      // Refresh products
      const fetchData = async () => {
        try {
          const response = await fetch("https://backendrafik.onrender.com/ProduitAll");
          if (response.ok) {
            const data = await response.json();
            setProduitsDisponibles(data.data);
          }
        } catch (error) {
          toast.error("Erreur serveur.");
        }
      };
      fetchData();
  
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 80px)", backgroundColor: "#f8f8f8", userSelect: "none" }}>
      {/* Left side - Product selection */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {/* Search and category filter */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un produit"
            className="grow rounded-md w-full p-2 border"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {filteredProduits.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleAddToCart(prod)}
              style={{
                padding: "15px",
                backgroundColor: prod.quantite > 0 ? "#fff" : "#f0f0f0",
                borderRadius: "5px",
                boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)",
                cursor: prod.quantite > 0 ? "pointer" : "not-allowed",
              }}
            >
              <img
                src={(() => {
                  try {
                    return prod.image ? `https://backendrafik.onrender.com${JSON.parse(prod.image)[0]}` : "";
                  } catch {
                    return "";
                  }
                })()}
                alt={prod.nom}
                style={{ height: "100px", margin: "0 auto", display: "block", borderRadius: "5px" }}
              />
              <h3 style={{ textAlign: "center", margin: "10px 0" }}>{prod.nom}</h3>
              <p style={{ textAlign: "center", color: "#555" }}>Prix : {prod.prix_vente} DA</p>
              <p style={{ textAlign: "center", color: prod.quantite > 0 ? "green" : "red" }}>
                {prod.quantite > 0 ? `Stock : ${prod.quantite}` : "Rupture"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Invoice summary */}
      <div
        style={{
          width: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Total price display */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#004d00",
            border: "4px solid #003300",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "10px",
            color: "#00ff00",
            fontFamily: "'Digital-7 Mono', monospace",
            fontSize: "2rem",
          }}
        >
          {totalAfterDiscount.toFixed(2)} DA
        </div>

        {/* Discount section */}
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <input
            type="number"
            value={discountInput}
            onChange={(e) => setDiscountInput(e.target.value)}
            placeholder="Montant de remise"
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
          <button
            onClick={handleApplyDiscount}
            style={{
              padding: "10px 15px",
              backgroundColor: "#070c2b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Appliquer
          </button>
        </div>

        {/* Original total and discount display */}
        {discount > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total:</span>
              <span>{totalPrix.toFixed(2)} DA</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "red" }}>
              <span>Remise:</span>
              <span>-{discount.toFixed(2)} DA</span>
            </div>
          </div>
        )}

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
          {produits.length === 0 ? (
            <p style={{ textAlign: "center", color: "#555" }}>Aucun produit ajouté.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {produits.map((produit) => (
                <li
                  key={produit.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={(() => {
                        try {
                          return produit.image ? `https://backendrafik.onrender.com${JSON.parse(produit.image)[0]}` : "";
                        } catch {
                          return "";
                        }
                      })()}
                      alt={produit.nom}
                      style={{ height: "60px", borderRadius: "5px", marginRight: "10px" }}
                    />
                    <div>
                      <h4 style={{ margin: 0 }}>{produit.nom}</h4>
                      <p style={{ margin: 0, color: "#555", fontSize: "0.9rem" }}>
                        Quantité : {produit.quantite}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveProduit(produit.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Client name and submit form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Nom du client</label>
            <input
              type="text"
              value={nomClient}
              onChange={(e) => setNomClient(e.target.value)}
              placeholder="Entrez le nom du client"
              required
              style={{ padding: "10px", borderRadius: "5px", width: "100%" }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#070c2b",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Enregistrer l'achat
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjouterFacture;