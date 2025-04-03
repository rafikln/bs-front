import { useState } from "react";

const Drawer = ({ setPage }) => {
  const [activePage, setActivePage] = useState(null); // Tracks the active page
  const [expandedSection, setExpandedSection] = useState(null); // Tracks which section is expanded

  const handleSetPage = (page) => {
    setPage(page);
    setActivePage(page);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Chevron Icon for expand/collapse
  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  // Existing Icons
  const AddInvoiceIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2zM6 18v-2h8v2H6zm12-5H6V6h12v7z" />
    </svg>
  );

  const InvoiceListIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 4h8v2H8V9zm0 4h8v2H8v-2z" />
    </svg>
  );

  const AddProductIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z" />
    </svg>
  );

  const AddCategoryIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </svg>
  );

  const AddChiffreicon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
      <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
      <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
      <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
    </svg>
  );

  const ProductListIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h10v2H4v-2z" />
    </svg>
  );

  const CategoryListIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
    </svg>
  );

  const ClientListIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
    </svg>
  );

  const AddClientIcon = ({ isActive }) => (
    <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 7a7 7 0 1 1 14 0h-2a5 5 0 0 0-10 0H3z" />
      <path d="M15 8h2v2h2v2h-2v2h-2v-2h-2v-2h2V8z" />
    </svg>
  );

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      id="drawer-navigation"
      className="z-40 h-screen border-[#cfc9c9] border-r-[1px] p-4 overflow-y-auto w-[300px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="flex items-center gap-4 border-b-2 border-gray pb-[20px] mb-[20px]">
        <img className="w-12 h-12 rounded-full" src="../../../public/photo 600 px  .600 px.jpg" alt="" />
        <div className="font-medium dark:text-white">
          <div>LONGAR Rafik</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Vendeur</div>
        </div>
      </div>

      <ul className="space-y-3 font-medium">
        {/* Categories Section */}
        <li>
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              expandedSection === "categories" ? "bg-[#070c2b] text-white" : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => toggleSection("categories")}
          >
            <div className="flex items-center">
              <CategoryListIcon isActive={expandedSection === "categories"} />
              <span className="ml-3">Catégories</span>
            </div>
            <ChevronIcon isOpen={expandedSection === "categories"} />
          </div>
          {expandedSection === "categories" && (
            <ul className="pl-6 space-y-2 mt-2">
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 0 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(0)}
              >
                <CategoryListIcon isActive={activePage === 0} />
                <span className="ml-3">Liste Catégories</span>
              </li>
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 1 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(1)}
              >
                <AddCategoryIcon isActive={activePage === 1} />
                <span className="ml-3">Ajouter Catégorie</span>
              </li>
            </ul>
          )}
        </li>

        {/* Products Section */}
        <li>
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              expandedSection === "products" ? "bg-[#070c2b] text-white" : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => toggleSection("products")}
          >
            <div className="flex items-center">
              <ProductListIcon isActive={expandedSection === "products"} />
              <span className="ml-3">Produits</span>
            </div>
            <ChevronIcon isOpen={expandedSection === "products"} />
          </div>
          {expandedSection === "products" && (
            <ul className="pl-6 space-y-2 mt-2">
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 2 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(2)}
              >
                <ProductListIcon isActive={activePage === 2} />
                <span className="ml-3">Liste Produit</span>
              </li>
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 3 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(3)}
              >
                <AddProductIcon isActive={activePage === 3} />
                <span className="ml-3">Ajouter Produit</span>
              </li>
            </ul>
          )}
        </li>

        {/* Clients Section */}
        <li>
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              expandedSection === "clients" ? "bg-[#070c2b] text-white" : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => toggleSection("clients")}
          >
            <div className="flex items-center">
              <ClientListIcon isActive={expandedSection === "clients"} />
              <span className="ml-3">Clients</span>
            </div>
            <ChevronIcon isOpen={expandedSection === "clients"} />
          </div>
          {expandedSection === "clients" && (
            <ul className="pl-6 space-y-2 mt-2">
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 7 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(7)}
              >
                <ClientListIcon isActive={activePage === 7} />
                <span className="ml-3">Liste Clients</span>
              </li>
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 8 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(8)}
              >
                <AddClientIcon isActive={activePage === 8} />
                <span className="ml-3">Ajouter Client</span>
              </li>
            </ul>
          )}
        </li>

        {/* Invoices Section */}
        <li>
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              expandedSection === "invoices" ? "bg-[#070c2b] text-white" : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => toggleSection("invoices")}
          >
            <div className="flex items-center">
              <AddInvoiceIcon isActive={expandedSection === "invoices"} />
              <span className="ml-3">Factures</span>
            </div>
            <ChevronIcon isOpen={expandedSection === "invoices"} />
          </div>
          {expandedSection === "invoices" && (
            <ul className="pl-6 space-y-2 mt-2">
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 4 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(4)}
              >
                <AddInvoiceIcon isActive={activePage === 4} />
                <span className="ml-3">Caisse</span>
              </li>
              <li
                className={`flex items-center p-2 rounded-lg cursor-pointer ${activePage === 5 ? "bg-[#070c2b] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                onClick={() => handleSetPage(5)}
              >
                <InvoiceListIcon isActive={activePage === 5} />
                <span className="ml-3">Liste D'achat</span>
              </li>
            </ul>
          )}
        </li>

        {/* Chiffre d'Affaire */}
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activePage === 6 ? "bg-[#070c2b] text-white shadow-md" : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleSetPage(6)}
        >
          <AddChiffreicon isActive={activePage === 6} />
          <span className="ml-3">Chiffre d'Affaire</span>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;