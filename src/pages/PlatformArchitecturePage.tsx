import React from "react";
import PageHeader from "../components/common_components/PageHeader";
import GreenLaptopIcon from "../assets/icons/greenLaptopIcon.svg";
import CardIcon from "../assets/icons/CardIcon.svg";
import adIcon from "../assets/icons/adIcon.svg";
import blueLinkIcon from "../assets/icons/blueLinkIcon.svg";
import {
  Calendar,
  User,
  Clock,
  UsersRoundIcon,
  ShoppingCartIcon,
  TvMinimalPlay,
  IdCardIcon,
  Settings,
  Bell,
  FileText,
} from "lucide-react";
import CapacityScalingKPIs from "./platform_architecture/components/CapacityScalingKPIs";
import DependencyGraph from "./platform_architecture/components/DependencyGraph";
import DashboardCardHeader from "./dashboard/components/DashboardCardHeader";
import RiskRegister from "./platform_architecture/components/RiskRegister";
import ToolsRegistry from "./platform_architecture/components/ToolsRegistry";

const services = [
  {
    name: "Identity",
    team: "Auth Team",
    uptime: "99.99%",
    p95: "12ms",
    errors: "0.01%",
    dependencies: 2,
    status: "bg-[#DCFCE7]",
    icon: UsersRoundIcon,
    img: GreenLaptopIcon,
  },
  {
    name: "Orders",
    team: "Commerce Team",
    uptime: "99.95%",
    p95: "45ms",
    errors: "0.03%",
    dependencies: 4,
    status: "bg-[#DCFCE7]",
    icon: ShoppingCartIcon,
    img: CardIcon,
  },
  {
    name: "Payments",
    team: "Payments Team",
    uptime: "99.95%",
    p95: "45ms",
    errors: "0.03%",
    dependencies: 3,
    status: "bg-[#DCFCE7]",
    img: CardIcon,
  },
  {
    name: "Ads",
    team: "Ads Team",
    uptime: "99.99%",
    p95: "156ms",
    errors: "0.12%",
    dependencies: 2,
    status: "bg-[#FFEDD4]",
    img: adIcon,
  },
  {
    name: "Studio",
    team: "Media Team",
    uptime: "99.95%",
    p95: "45ms",
    errors: "0.03%",
    dependencies: 4,
    status: "bg-[#DCFCE7]",
    icon: TvMinimalPlay,
  },
  {
    name: "Business Suite",
    team: "Enterprise Team",
    uptime: "99.95%",
    p95: "45ms",
    errors: "0.03%",
    dependencies: 3,
    status: "bg-[#DCFCE7]",
    icon: IdCardIcon,
  },
  {
    name: "Automation/AWM",
    team: "Platform Team",
    uptime: "99.99%",
    p95: "156ms",
    errors: "0.12%",
    dependencies: 2,
    status: "bg-[#DCFCE7]",
    icon: Settings,
  },
  {
    name: "Alerts",
    team: "SRE Team",
    uptime: "99.95%",
    p95: "234ms",
    errors: "0.45%",
    dependencies: 4,
    status: "bg-[#FFDDDB]",
    icon: Bell,
    iconColor: "#CF2027",
  },
  {
    name: "Audit",
    team: "Compliance Team",
    uptime: "99.95%",
    p95: "45ms",
    errors: "0.00%",
    dependencies: 3,
    status: "bg-[#DCFCE7]",
    icon: FileText,
  },
];

const adrs = [
  {
    id: "ADR-001",
    title: "Migrate to Event-Driven Architecture for Order Processing",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "High Risk",
    status: "Approved",
    riskColor: "bg-red-50 text-red-600",
    statusColor: "bg-green-50 text-green-600",
  },
  {
    id: "ADR-001",
    title: "Adopt GraphQL Federation for API Gateway",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "Medium Risk",
    status: "Implemented",
    riskColor: "bg-orange-50 text-orange-600",
    statusColor: "bg-green-50 text-green-600",
  },
  {
    id: "ADR-001",
    title: "Split Provider Onboarding into Microservices",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "Low Risk",
    status: "Proposed",
    riskColor: "bg-green-50 text-green-600",
    statusColor: "bg-blue-50 text-blue-600",
  },
  {
    id: "ADR-001",
    title: "Implement Circuit Breaker Pattern for Payment Gateway",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "Low Risk",
    status: "Draft",
    riskColor: "bg-green-50 text-green-600",
    statusColor: "bg-gray-50 text-gray-400",
  },
  {
    id: "ADR-001",
    title: "Replace Redis with DynamoDB for Session Storage",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "High Risk",
    status: "Approved",
    riskColor: "bg-red-50 text-red-600",
    statusColor: "bg-green-50 text-green-600",
  },
];

const changeRequests = [
  {
    id: "CR-2024-001",
    title: "Deploy new microservice boundary for Provider Onboarding",
    author: "J. Smith",
    date: "01-15-2026",
    expires: "1d 14",
    risk: "High Risk",
    type: "Architecture",
    riskColor: "bg-red-50 text-red-600",
    typeColor: "bg-green-50 text-green-600",
  },
  {
    id: "CR-2024-001",
    title: "Upgrade Kubernetes cluster to v1.29",
    author: "J. Smith",
    date: "01-15-2026",
    expires: "2d 14",
    risk: "Medium Risk",
    type: "Infrastructure",
    riskColor: "bg-orange-50 text-orange-600",
    typeColor: "bg-blue-50 text-blue-600",
  },
  {
    id: "CR-2024-004",
    title: "Migrate session storage from Redis to DynamoDB",
    author: "K. Wong",
    date: "01-15-2026",
    expires: "3d 14",
    risk: "Low Risk",
    type: "Architecture",
    riskColor: "bg-green-50 text-green-600",
    typeColor: "bg-green-50 text-green-600",
  },
];

const PlatformArchitecturePage: React.FC = () => {
  return (
    <div className="w-full">
      <PageHeader
        title="Platform Architecture"
        subtitle="System structure and scalability control"
      />

      <div className="mb-8 mt-6">
        <h2 className="text-xl font-semibold text-(--dark-text-black) mb-6">
          Service Domain Map
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-4 gap-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-[14px] border-[0.8px] border-[#0000001A] relative"
            >
              <div
                className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-(--dark-green)`}
              ></div>
              <div className="flex items-start gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-lg ${service.status} flex items-center justify-center shrink-0`}
                >
                  {service.icon ? (
                    <service.icon
                      size={24}
                      color={service.iconColor || "#00A63E"}
                    />
                  ) : (
                    <img src={service.img} alt="" className="w-6 h-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-(--dark-text-black) truncate">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#717182] truncate">
                    {service.team}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pb-2 border-b border-[#00000033]">
                <div>
                  <p className="text-[10px] text-[#717182] uppercase mb-1">
                    Uptime
                  </p>
                  <p className="text-sm font-semibold text-(--dark-text-black)">
                    {service.uptime}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#717182] uppercase mb-1">
                    p95
                  </p>
                  <p className="text-sm font-semibold text-(--dark-text-black)">
                    {service.p95}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#717182] uppercase mb-1">
                    Errors
                  </p>
                  <p
                    className={`text-sm font-semibold ${service.errors.startsWith("0.0") ? "text-(--dark-text-black)" : "text-(--dark-red)"}`}
                  >
                    {service.errors}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                <span className="text-sm text-[#717182]">
                  {service.dependencies} dependencies
                </span>
                <img
                  src={blueLinkIcon}
                  alt="blueLinkIcon"
                  className="cursor-pointer shrink-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-6 gap-2 md:mb-8 mb-4">
        {/* ADRs */}
        <div className="lg:col-span-6 bg-white p-6 rounded-[14px] border border-[#0000001A] shadow-sm">
          <DashboardCardHeader
            title="Architecture Decision Records"
            subtitle="6 total"
          />
          <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto">
            {adrs.map((adr, index) => (
              <div
                key={index}
                className="pb-4 border-b border-(--dark-text-gray)"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-[10px] items-center flex text-[#717182] uppercase tracking-wider">
                    {adr.id}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${adr.riskColor}`}
                  >
                    {adr.risk}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${adr.statusColor}`}
                  >
                    {adr.status}
                  </span>
                </div>
                <h3 className="text-base font-normal text-(--dark-text-black) mb-2">
                  {adr.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#717182]">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {adr.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {adr.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change Requests */}
        <div className="lg:col-span-6 bg-white p-6 rounded-[14px] border border-[#0000001A] shadow-sm">
          <DashboardCardHeader
            title="Change Requests"
            subtitle="3 Pending"
            subtitleColor="text-(--dark-red)"
          />
          <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto">
            {changeRequests.map((cr, index) => (
              <div
                key={index}
                className="pb-6 border-b border-(--dark-text-gray) last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-sm items-center flex text-[#717182] uppercase tracking-wider">
                    {cr.id}
                  </span>
                  <span
                    className={`text-sm px-2 py-0.5 rounded font-medium ${cr.riskColor}`}
                  >
                    {cr.risk}
                  </span>
                  <span
                    className={`text-sm px-2 py-0.5 rounded font-medium ${cr.typeColor}`}
                  >
                    {cr.type}
                  </span>
                </div>
                <h3 className="text-base font-normal text-(--dark-text-black) mb-2">
                  {cr.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#717182] mb-2">
                  <span className="flex items-center gap-1 text-sm">
                    <User size={12} /> {cr.author}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Calendar size={12} /> {cr.date}
                  </span>
                  <span className="flex items-center gap-1 text-(--dark-red) font-normal text-sm">
                    <Clock size={14} /> Expires: {cr.expires}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="text-sm font-semibold text-(--dark-green) hover:underline">
                    Approve
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-sm font-semibold text-(--dark-red) hover:underline">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CapacityScalingKPIs />
      <DependencyGraph />
      <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-6 gap-2 md:mb-8 mb-4">
        <div className="lg:col-span-6">
          <RiskRegister />
        </div>
        <div className="lg:col-span-6">
          <ToolsRegistry />
        </div>
      </div>
    </div>
  );
};

export default PlatformArchitecturePage;
