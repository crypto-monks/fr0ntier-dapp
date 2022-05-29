import PortfolioPage from "../pages/Portfolio";
import MarketplacePage from "../pages/Marketplace";
import MintPage from "../pages/Mint";

export const APP_ROUTES = [
  {
    path: "/mint",
    component: <MintPage />,
    title: "Mint",
    isNavLinked: true,
  },
  {
    path: "/portfolio",
    component: <PortfolioPage />,
    title: "Portfolio",
    isNavLinked: true,
  },
  {
    path: "/marketplace",
    component: <MarketplacePage />,
    title: "Marketplace",
    isNavLinked: true,
  },
];
