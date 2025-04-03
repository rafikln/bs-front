import { useState } from "react";

const Drawer = ({ setPage }) => {
  const [activePage, setActivePage] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const handleSetPage = (page) => {
    setPage(page);
    setActivePage(page);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Chevron Icon avec animation fluide
  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  // Icônes avec transitions modernes
  const icons = {
    AddInvoice: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2zM6 18v-2h8v2H6zm12-5H6V6h12v7z" />
      </svg>
    ),
    InvoiceList: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 4h8v2H8V9zm0 4h8v2H8v-2z" />
      </svg>
    ),
    AddProduct: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z" />
      </svg>
    ),
    AddCategory: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      </svg>
    ),
    AddChiffre: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
      </svg>
    ),
    ProductList: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h10v2H4v-2z" />
      </svg>
    ),
    CategoryList: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
      </svg>
    ),
    ClientList: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 18">
        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
      </svg>
    ),
    AddClient: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 7a7 7 0 1 1 14 0h-2a5 5 0 0 0-10 0H3z" />
        <path d="M15 8h2v2h2v2h-2v2h-2v-2h-2v-2h2V8z" />
      </svg>
    ),
    SupplierList: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-2 13a5 5 0 0 1 10 0H5zm8-13a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </svg>
    ),
    AddSupplier: ({ isActive }) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-2 13a5 5 0 0 1 10 0H5zm8-13a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm2 5h2v2h2v2h-2v2h-2v-2h-2V9h2z" />
      </svg>
    ),
  };

  // Sections avec leurs sous-éléments
  const sections = [
    {
      name: "categories",
      label: "Catégories",
      icon: icons.CategoryList,
      items: [
        { page: 0, label: "Liste Catégories", icon: icons.CategoryList },
        { page: 1, label: "Ajouter Catégorie", icon: icons.AddCategory },
      ],
    },
    {
      name: "products",
      label: "Produits",
      icon: icons.ProductList,
      items: [
        { page: 2, label: "Liste Produit", icon: icons.ProductList },
        { page: 3, label: "Ajouter Produit", icon: icons.AddProduct },
      ],
    },
    {
      name: "clients",
      label: "Clients",
      icon: icons.ClientList,
      items: [
        { page: 7, label: "Liste Clients", icon: icons.ClientList },
        { page: 8, label: "Ajouter Client", icon: icons.AddClient },
      ],
    },
    {
      name: "suppliers",
      label: "Fournisseurs",
      icon: icons.SupplierList,
      items: [
        { page: 9, label: "Liste Fournisseurs", icon: icons.SupplierList },
        { page: 10, label: "Ajouter Fournisseur", icon: icons.AddSupplier },
      ],
    },
    {
      name: "invoices",
      label: "Factures",
      icon: icons.AddInvoice,
      items: [
        { page: 4, label: "Caisse", icon: icons.AddInvoice },
        { page: 5, label: "Liste D'achat", icon: icons.InvoiceList },
      ],
    },
  ];

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="z-40 w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-y-auto transition-all duration-300"
    >
      <div className="p-4">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.name}>
              <div
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  expandedSection === section.name
                    ? "bg-[#070c2b] text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-[#070c2b] hover:text-white dark:hover:bg-[#070c2b]"
                }`}
                onClick={() => toggleSection(section.name)}
              >
                <div className="flex items-center">
                  <section.icon isActive={expandedSection === section.name} />
                  <span className="ml-3 font-semibold text-base tracking-wide">
                    {section.label}
                  </span>
                  {section.items.some((item) => item.page === activePage) && (
                    <span className="ml-2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                  )}
                </div>
                <ChevronIcon isOpen={expandedSection === section.name} />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedSection === section.name
                    ? "max-h-96 opacity-100 bg-gray-50 dark:bg-[#070c2b] py-2 rounded-b-xl"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <ul className="pl-6 space-y-1">
                  {section.items.map((item) => (
                    <li
                      key={item.page}
                      className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        activePage === item.page
                          ? "bg-[#070c2b] text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:bg-[#070c2b] hover:text-white dark:hover:bg-[#070c2b]"
                      }`}
                      onClick={() => handleSetPage(item.page)}
                    >
                      <item.icon isActive={activePage === item.page} />
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          {/* Chiffre d'Affaire (élément unique sans sous-menu) */}
          <li
            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-300 ${
              activePage === 6
                ? "bg-[#070c2b] text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-[#070c2b] hover:text-white dark:hover:bg-[#070c2b]"
            }`}
            onClick={() => handleSetPage(6)}
          >
            <icons.AddChiffre isActive={activePage === 6} />
            <span className="ml-3 font-semibold text-base tracking-wide">
              Chiffre d'Affaire
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;