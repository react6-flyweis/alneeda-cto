import React from "react";
import {
  LayoutDashboard,
  Package,
  Share2,
  Cloud,
  ShieldCheck,
  Database,
  BrainCircuit,
  CheckSquare,
  RefreshCcw,
  ChevronRight,
  X,
  Network,
} from "lucide-react";
import activeBg from "../assets/sidebarActiveBg.svg";
import Logo from "../assets/Logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Network,
    label: "Platform Architecture",
    path: "/platform-architecture",
  },
  {
    icon: Package,
    label: "Product Engineering",
    path: "/product-engineering",
  },
  {
    icon: Share2,
    label: "API & Integrations",
    path: "/api-integrations",
  },
  {
    icon: Cloud,
    label: "DevOps & Infrastructure",
    path: "/devops-infrastructure",
  },
  {
    icon: ShieldCheck,
    label: "Security & Privacy",
    path: "/security-privacy",
  },
  {
    icon: Database,
    label: "Data Engineering",
    path: "/data-engineering",
  },
  {
    icon: BrainCircuit,
    label: "AI/ML Engineering",
    path: "/ai-ml",
  },
  {
    icon: CheckSquare,
    label: "Engineering QA",
    path: "/engineering-qa",
  },
  {
    icon: RefreshCcw,
    label: "Release & Management",
    path: "/release-management",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  return (
    <aside
      className={`
        rounded-r-[30px]
      w-69 bg-[#0E1E38] text-gray-400 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Logo Section */}
      <div className="pt-10 pb-4 px-6 flex flex-col items-center relative">
        <button
          onClick={onClose}
          className="lg:hidden absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-2 flex flex-col items-center justify-center">
          <img
            src={Logo}
            alt="Allneeda Logo"
            className="w-full h-full max-h-[104px] object-contain"
          />
          <div className="mt-3 py-0.5 text-white xl:text-lg text-base font-black rounded tracking-wider text-center">
            Development Mgmt
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-0 pl-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              className="relative py-1 mt-3"
              onClick={() => handleNavigation(item.path)}
            >
              {isActive && (
                <img
                  src={activeBg}
                  alt=""
                  className="absolute inset-y-0 w-[276px] -mt-4 object-cover pointer-events-none z-0"
                />
              )}

              <div
                className={`
                relative my-auto z-10 flex items-center pl-3 py-4 cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "text-[#0a1628] font-bold"
                    : "text-[#FFFFFF] font-bold"
                }
              `}
              >
                <item.icon
                  size={22}
                  className={`mr-2 ${isActive ? "text-[#0a1628]" : ""}`}
                />
                <span className="text-base tracking-wide">{item.label}</span>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer Action */}
      <div className="p-6 border-t border-white/5">
        <div className="bg-white/5 rounded-full p-2.5 w-fit cursor-pointer hover:bg-white/10 transition-colors" onClick={()=>navigate('/login')}>
          <ChevronRight size={20} className="text-white transform rotate-180" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
