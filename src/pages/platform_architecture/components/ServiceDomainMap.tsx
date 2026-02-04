import React from "react";
import {
  UsersRoundIcon,
  ShoppingCartIcon,
  TvMinimalPlay,
  IdCardIcon,
  Settings,
  Bell,
  FileText,
} from "lucide-react";
import GreenLaptopIcon from "../../../assets/icons/greenLaptopIcon.svg";
import CardIcon from "../../../assets/icons/CardIcon.svg";
import adIcon from "../../../assets/icons/adIcon.svg";
import blueLinkIcon from "../../../assets/icons/blueLinkIcon.svg";

export const services = [
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

const ServiceDomainMap: React.FC = () => {
  return (
    <div className="mb-8 mt-6">
      <h2 className="text-xl font-semibold text-(--dark-text-black) mb-6">
        Service Domain Map
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-4 gap-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-[14px] border-[0.8px] border-[#0000001A] relative transition-shadow"
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
              <img src={blueLinkIcon} alt="blueLinkIcon" className="cursor-pointer shrink-0"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDomainMap;
