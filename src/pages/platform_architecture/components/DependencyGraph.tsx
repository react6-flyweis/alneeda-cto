import React from "react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

const internalServices = [
  {
    name: "Redis Cluster",
    type: "Cache",
    latency: "8ms",
    usedBy: "Identity, Orders, Ads",
    status: "orange",
  },
  {
    name: "PostgreSQL",
    type: "Database",
    latency: "12ms",
    usedBy: "All Services",
    status: "green",
  },
  {
    name: "Kafka",
    type: "Messaging",
    latency: "15ms",
    usedBy: "All Services",
    status: "green",
  },
  {
    name: "Elasticsearch",
    type: "Search",
    latency: "65ms",
    usedBy: "Orders, Ads, Studio",
    status: "orange",
  },
];

const thirdPartyIntegrations = [
  {
    name: "Stripe API",
    type: "Payments",
    latency: "120ms",
    usedBy: "Payments, Orders",
    status: "green",
    external: true,
  },
  {
    name: "Twilio",
    type: "Communications",
    latency: "85ms",
    usedBy: "Alerts, Identity",
    status: "green",
    external: true,
  },
  {
    name: "AWS S3",
    type: "Storage",
    latency: "85ms",
    usedBy: "Alerts, Identity",
    status: "green",
    external: true,
  },
  {
    name: "SendGrid",
    type: "Email",
    latency: "200ms",
    usedBy: "Alerts, Identity",
    status: "green",
    external: true,
  },
];

const DependencyGraph: React.FC = () => {
  return (
    <div className="bg-white md:p-6 p-4 rounded-[14px] border-[0.8px] border-[#0000001A] shadow-sm mb-6">
      <DashboardCardHeader
        title="Dependency Graph"
        subtitle="Internal & External Services"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6 gap-2">
        {/* Internal Services */}
        <div>
          <h3 className="md:text-base text-sm font-normal text-[#717182] mb-2 tracking-wider">
            Internal Services
          </h3>
          <div className="space-y-4">
            {internalServices.map((service, index) => (
              <div
                key={index}
                className="md:p-4 p-1.5 rounded-lg border-[0.8px] border-gray-400 flex flex-col gap-2 relative"
              >
                <div className="flex flex-col justify-between w-full gap-3">
                  <div className="flex justify-between">
                    <h4 className="md:text-base text-sm font-semibold text-[#1E1E1E]">
                      {service.name}{" "}
                      <span className="text-[#717182] font-normal">
                        ({service.type})
                      </span>
                    </h4>
                    <div
                      className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${service.status === "green" ? "bg-(--dark-green)" : "bg-(--dark-red)"}`}
                    ></div>
                  </div>
                  <div className="flex w-full flex-wrap justify-between items-center">
                    <p className="md:text-sm text-xs text-[#717182] mt-1">
                      Latency:{" "}
                      <span className="font-semibold text-[#1E1E1E]">
                        {service.latency}
                      </span>
                    </p>
                    <p className="md:text-sm text-[10px] text-[#717182]">
                      Used by:{" "}
                      <span className="font-normal text-[#717182]">
                        {service.usedBy}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third-Party Integrations */}
        <div>
         <h3 className="md:text-base text-sm font-normal text-[#717182] mb-2 tracking-wider">
            Third-Party Integrations
          </h3>
          <div className="space-y-4">
            {thirdPartyIntegrations.map((integration, index) => (
              <div
                key={index}
                className="md:p-4 p-1.5 rounded-lg border-[0.8px] border-gray-400 flex flex-col gap-2 relative"
              >
                <div className="flex flex-col justify-between w-full gap-3">
                  <div className="flex justify-between">
                    <h4 className="md:text-base text-sm font-semibold text-[#1E1E1E]">
                      {integration.name}{" "}
                      <span className="text-[#717182] font-normal">
                        ({integration.type})
                      </span>
                    </h4>
                    <div
                      className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${integration.status === "green" ? "bg-(--dark-green)" : "bg-(--dark-red)"}`}
                    ></div>
                  </div>
                  <div className="flex w-full flex-wrap justify-between items-center">
                    <p className="md:text-sm text-xs text-[#717182] mt-1">
                      Latency:{" "}
                      <span className="font-semibold text-[#1E1E1E]">
                        {integration.latency}
                      </span>
                    </p>
                    <p className="md:text-sm text-[10px] text-[#717182]">
                      Used by:{" "}
                      <span className="font-normal text-[#717182]">
                        {integration.usedBy}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependencyGraph;
