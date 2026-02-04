import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../dashboard/components/SearchBar";
import { RiskRegisterItem, risks } from "./components/RiskRegister";

const RiskRegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[2512px]">
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer group w-fit"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft
          size={32}
          className="text-(--dark-text-black) group-hover:-translate-x-1 transition-transform"
        />
        <h1 className="md:text-[32px] sm:text-2xl text-lg font-semibold text-(--dark-text-black)">
          Risk Register
        </h1>
      </div>

      <div className="bg-white rounded-[14px] p-6 shadow-sm border border-[#0000001A]">
        <SearchBar />
        <div className="space-y-4">
          {risks.map((risk: any, index: any) => (
            <RiskRegisterItem risk={risk} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskRegisterPage;
