import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  NetworkIcon,
  PackageIcon,
  Share2Icon,
  CloudIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  BrainCircuitIcon,
  CheckSquareIcon,
  RefreshCcwIcon,
  AlertTriangle,
  FileText,
  GitBranch,
  Layers,
  Clock,
  Shield,
  BarChart2,
  DollarSign,
  Globe,
  Settings,
  Archive,
  LayoutGrid,
  FlaskConicalIcon,
} from "lucide-react";

import allneedaLogo from "@/assets/Logo.svg";
import LogoutDialog from "./LogoutDialog";

export default function AppSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboardIcon,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: NetworkIcon,
      label: "Platform Architecture",
      path: "/platform-architecture",
    },
    {
      icon: PackageIcon,
      label: "Product Engineering",
      path: "/product-engineering",
    },
    {
      icon: Share2Icon,
      label: "API & Integrations",
      path: "/api-integrations",
    },
    {
      icon: CloudIcon,
      label: "DevOps & Infrastructure",
      path: "/devops-infrastructure",
    },
    {
      icon: ShieldCheckIcon,
      label: "Security & Privacy",
      path: "/security-privacy",
    },
    {
      icon: DatabaseIcon,
      label: "Data Engineering",
      path: "/data-engineering",
    },
    {
      icon: BrainCircuitIcon,
      label: "AI/ML Engineering",
      path: "/ai-ml",
    },
    {
      icon: CheckSquareIcon,
      label: "Engineering QA",
      path: "/engineering-qa",
    },
    {
      icon: RefreshCcwIcon,
      label: "Release & Management",
      path: "/release-management",
    },
    {
      icon: AlertTriangle,
      label: "Technical Incident Response",
      path: "/technical-incident-response",
    },
    {
      icon: Archive,
      label: "Product Registry",
      path: "/product-registration",
    },
    {
      icon: GitBranch,
      label: "Product Versioning & Release Control",
      path: "/product-versioning",
    },
    {
      icon: Layers,
      label: "Product Capability & Dependency Control",
      path: "/product-capability-dependency",
    },
    {
      icon: AlertTriangle,
      label: "Change Impact & Risk Control",
      path: "/change-impact-risk",
    },
    {
      icon: Clock,
      label: "Product Lifecycle Management",
      path: "/product-lifecycle",
    },
    {
      icon: FlaskConicalIcon,
      label: "Experimentation & Feature Governance",
      path: "/experimentation-governance",
    },
    {
      icon: Shield,
      label: "Product Security & Privacy Governance",
      path: "/product-security-governance",
    },
    {
      icon: BarChart2,
      label: "Product Data & Analytics Governance",
      path: "/product-data-analytics",
    },
    {
      icon: DollarSign,
      label: "Monetization & Revenue Logic",
      path: "/monetization-revenue",
    },
    {
      icon: ShieldCheckIcon,
      label: "Compliance & Legal Readiness",
      path: "/compliance-legal",
    },
    {
      icon: CheckSquareIcon,
      label: "Product Operational Readiness",
      path: "/product-operational-readiness",
    },
    {
      icon: FileText,
      label: "Documentation & Knowledge Management",
      path: "/documentation-knowledge",
    },
    {
      icon: Globe,
      label: "Product-Level Global",
      path: "/product-global",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: LayoutGrid,
      label: "App Manage",
      path: "/app-manage",
    },
  ];

  return (
    <Sidebar className="border-0 shadow-none rounded-r-4xl overflow-hidden">
      <SidebarHeader className="px-3 py-4 font-poppins">
        <div className="flex flex-col items-center">
          <img
            src={allneedaLogo}
            alt="Allneeda Logo"
            className="size-20 w-auto mb-2"
          />
          <div className="text-sidebar-foreground truncate font-poppins">
            Development Mgmt
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pl-4 pt-4 border-0 shadow-none">
        <SidebarMenu className="space-y-1">
          {menuItems.map((m) => (
            <SidebarMenuItem key={m.label}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === m.path}
                className="relative overflow-visible h-10 pl-4 rounded-l-full data-[active=true]:font-semibold data-[active=true]:before:absolute data-[active=true]:before:right-0 data-[active=true]:before:-top-[20px] data-[active=true]:before:h-[20px] data-[active=true]:before:w-[20px] data-[active=true]:before:bg-[radial-gradient(circle_at_0_0,transparent_20px,var(--sidebar-accent)_20.5px)] data-[active=true]:before:content-[''] data-[active=true]:after:absolute data-[active=true]:after:right-0 data-[active=true]:after:-bottom-[20px] data-[active=true]:after:h-[20px] data-[active=true]:after:w-[20px] data-[active=true]:after:bg-[radial-gradient(circle_at_0_20px,transparent_20px,var(--sidebar-accent)_20.5px)] data-[active=true]:after:content-['']"
              >
                <NavLink
                  to={m.path}
                  className="flex items-center gap-2 w-full font-poppins"
                >
                  <m.icon />
                  <span className="truncate">{m.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {/* Logout button */}
        <LogoutDialog />
      </SidebarFooter>

      {/* 
      <SidebarRail /> */}
    </Sidebar>
  );
}
