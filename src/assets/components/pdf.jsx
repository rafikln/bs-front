import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import logo from "../../../public/logo-icon.png"; // Chemin vers votre logo

// Charger la police Helvetica
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/helvetica/v15/  Helvetica.ttf" },
    { src: "https://fonts.gstatic.com/s/helvetica/v15/Helvetica-Bold.ttf", fontWeight: "bold" },
  ],
});

// Styles pour le PDF avec des améliorations
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#1A3C5A",
    paddingBottom: 10,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: "auto",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A3C5A",
    fontFamily: "Helvetica",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#1A3C5A",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 5,
  },
  companyInfo: {
    width: "45%",
  },
  clientInfo: {
    width: "45%",
    textAlign: "right",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1A3C5A",
    color: "#fff",
    padding: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tableRowEven: {
    backgroundColor: "#F5F5F5",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  totalsTable: {
    width: "40%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  totalsRowLast: {
    borderBottomWidth: 0,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    borderTopWidth: 2,
    borderTopColor: "#1A3C5A",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    fontSize: 9,
    color: "#555",
  },
  footerCell: {
    width: "33%",
  },
  textBold: {
    fontWeight: "bold",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
  note: {
    marginTop: 20,
    fontSize: 9,
    color: "#777",
    textAlign: "center",
  },
});

// Composant pour générer le PDF
const FacturePDF = ({ facture = {} }) => {
  const {
    nom_client = "toufik",
    date_creation = "2025-03-13T03:21:28.000Z", // Date au format ISO
    produits = [
      { nom: "IDEAL 60 CM IDEAL 2", quantite: 1, prix_vente: 800000.00 },
      { nom: "HENDI 1X8", quantite: 1, prix_vente: 580000.00 },
      { nom: "IDEAL 34X23", quantite: 1, prix_vente: 350000.00 },
    ],
  } = facture;

  // Calculs dynamiques
  const totalHT = produits
    .reduce((sum, produit) => sum + (produit.prix_vente || 0) * (produit.quantite || 0), 0)
    .toFixed(2);
  const totalTTC = totalHT; // Pas de TVA dans le modèle fourni

  // Formatage de la date
  const formattedDate = new Date(date_creation).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }); // Format DD/MM/YYYY, ex: 13/03/2025

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.headerText}>
            FROID CANTINE FAST FOOD PIZZERIA CAFETÉRIA
          </Text>
        </View>

        {/* Informations client et société */}
        <View style={styles.infoSection}>
          <View style={styles.companyInfo}>
            <Text style={styles.textBold}>FROID CANTINE FAST FOOD PIZZERIA CAFETÉRIA</Text>
            <Text style={styles.textBold}>PATISSERIE BOULANGERIE CLIMATISATION BUANDERIE</Text>
            <Text>Cité Chahid Mohamed Banialem Group, Alger, Mali</Text>
            <Text>RC: 1603086744811</Text>
            <Text>NIF: 00100612030000638-82</Text>
            <Text>ART: 16204008005</Text>
            <Text>Capital Social: 226 500 000 DA</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text>Raison Social: {nom_client}</Text>
            <Text>Date: {formattedDate}</Text>
            <Text>Adresse: [Adresse du client]</Text>
            <Text>RC N°: [RC du client]</Text>
            <Text>NIF N°: [NIF du client]</Text>
            <Text>ART N°: [ART du client]</Text>
          </View>
        </View>

        {/* Titre */}
        <Text style={styles.title}>Facture PROFORMA № 184</Text>

        {/* Tableau des produits */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Désignation</Text>
            <Text style={styles.tableCell}>Quantité</Text>
            <Text style={styles.tableCell}>Prix</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {produits.map((produit, index) => (
            <View
              key={index}
              style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : {}]}
            >
              <Text style={styles.tableCell}>{produit.nom || "Non spécifié"}</Text>
              <Text style={styles.tableCell}>{produit.quantite || 0}</Text>
              <Text style={styles.tableCell}>{Number(produit.prix_vente || 0).toFixed(2)} DA</Text>
              <Text style={styles.tableCell}>
                {((produit.prix_vente || 0) * (produit.quantite || 0)).toFixed(2)} DA
              </Text>
            </View>
          ))}
        </View>

        {/* Totaux */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsTable}>
            <View style={styles.totalsRow}>
              <Text style={[styles.textBold, styles.tableCell]}>Total HT</Text>
              <Text style={[styles.tableCell, styles.textRight]}>{totalHT} DA</Text>
            </View>
            <View style={[styles.totalsRow, styles.totalsRowLast]}>
              <Text style={[styles.textBold, styles.tableCell]}>Total TTC</Text>
              <Text style={[styles.tableCell, styles.textRight]}>{totalTTC} DA</Text>
            </View>
          </View>
        </View>

        {/* Pied de page */}
        <View style={styles.footer} fixed>
          <View style={styles.footerCell}>
            <Text style={styles.textBold}>FROID CANTINE</Text>
            <Text>CCP: 0079999 0000 38010/23</Text>
          </View>
          <View style={[styles.footerCell, styles.textCenter]}>
            <Text>Cité Chahid Mohamed Banialem Group, Alger, Mali</Text>
            <Text>Tél: 023 23 63 01 / 023 23 91 / 023 23 13 36</Text>
          </View>
          <View style={[styles.footerCell, styles.textRight]}>
            <Text>Banque N-0309000038-82, BNA, DAR EL BEIDA</Text>
            <Text>N°ISN: 0011162000082</Text>
            <Text>CCP: 0079999 0000 38010/23</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FacturePDF;