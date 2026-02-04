import React from "react";
import { Clock, LayoutGrid, Timer } from "lucide-react";

const sprintItems = [
  {
    id: "FEAT-1234",
    title: "Provider bulk import API",
    tags: [
        { label: "Business Suite", color: "bg-purple-50 text-purple-600" },
        { label: "High", color: "bg-orange-50 text-orange-600" }
    ],
    assignee: "MK",
    timeInColumn: "5d in column",
    status: "Backlog"
  },
  {
    id: "FEAT-1235",
    title: "Studio video templates",
    tags: [
        { label: "Studio", color: "bg-orange-50 text-orange-600" },
        { label: "Medium", color: "bg-yellow-50 text-yellow-600" }
    ],
    assignee: "JP",
    timeInColumn: "3d in column",
    status: "Backlog"
  },
  {
    id: "FEAT-1236",
    title: "Food delivery tracking v2",
    tags: [
        { label: "Food", color: "bg-orange-100 text-orange-700" },
        { label: "High", color: "bg-orange-50 text-orange-600" }
    ],
    assignee: "AS",
    timeInColumn: "2d in column",
    status: "Backlog"
  },
  {
    id: "FEAT-1234",
    title: "Home services booking flow",
    tags: [
        { label: "Home Services", color: "bg-blue-50 text-blue-600" },
        { label: "Critical", color: "bg-red-50 text-red-600" },
        { label: "Blocked", color: "bg-red-50 text-red-600" }
    ],
    assignee: "RK",
    timeInColumn: "5d in column",
    status: "In Progress"
  },
  {
    id: "FEAT-1231",
    title: "Payment retry logic",
    tags: [
        { label: "Shopping", color: "bg-green-50 text-green-600" },
        { label: "High", color: "bg-orange-50 text-orange-600" }
    ],
    assignee: "VL",
    timeInColumn: "2d in column",
    status: "In Progress"
  },
    {
    id: "FEAT-1232",
    title: "Viral content scheduler",
    tags: [
        { label: "Viral", color: "bg-pink-50 text-pink-600" },
        { label: "Medium", color: "bg-yellow-50 text-yellow-600" }
    ],
    assignee: "AS",
    timeInColumn: "1d in column",
    status: "In Progress"
  },
  {
    id: "FEAT-1225",
    title: "IT ticketing integration",
    tags: [
        { label: "IT", color: "bg-blue-100 text-blue-700" },
        { label: "High", color: "bg-orange-50 text-[#A65F00]" }
    ],
    assignee: "DP",
    timeInColumn: "5d in column",
    status: "Code Review"
  },
  {
    id: "FEAT-1231",
    title: "Provider analytics dashboard",
    tags: [
        { label: "Business Suite", color: "bg-purple-50 text-purple-600" },
        { label: "Medium", color: "bg-yellow-50 text-yellow-600" }
    ],
    assignee: "LW",
    timeInColumn: "2d in column",
    status: "Code Review"
  }
];

const ProductDeliveryBoard: React.FC = () => {
  const columns = ["Backlog", "In Progress", "Code Review"];
  
  const getColumnIcon = (column: string) => {
      switch(column) {
          case "Backlog": return <LayoutGrid size={16} />;
          case "In Progress": return <Timer size={16} className="text-blue-500" />;
          case "Code Review": return <Clock size={16} className="text-[#A65F00]" />;
          default: return null;
      }
  };

  const getColumnColor = (column: string) => {
       switch(column) {
          case "In Progress": return "text-blue-500";
          case "Code Review": return "text-[#A65F00]";
          case "Backlog": return "text-[#1E1E1E]";
          default: return "text-[#1E1E1E]";
      }
  };

  const getCountColor = () => {
      return "bg-[#FEF9C2] text-yellow-700";
  };


  return (
    <div className="w-full">
       <div className="bg-white p-6 rounded-[14px] border border-[#0000001A]">
        <div className="flex items-center gap-2 mb-6 flex-wrap">
            <h2 className="md:text-xl text-lg font-semibold text-(--dark-text-black)">Product Delivery Board</h2>
            <span className="md:text-base text-sm text-(--dark-text-black) font-normal">(Sprint 47 • 14 items)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {columns.map((column) => {
                const items = sprintItems.filter(item => item.status === column);
                return (
                    <div key={column} className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                {getColumnIcon(column)}
                                <span className={`text-sm font-medium ${getColumnColor(column)}`}>{column}</span>
                            </div>
                            {items.length > 0 && (
                                <span className={`text-xs px-2 py-0.5 rounded font-medium ${getCountColor()}`}>
                                    {items.length}
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="bg-white border border-[#0000001A] rounded-[14px] md:p-4 p-2">
                                    <p className="text-xs text-[#717182] mb-2">{item.id}</p>
                                    <h3 className="md:text-base text-sm font-semibold text-[#1E1E1E] mb-3">{item.title}</h3>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className={`text-xs px-2 py-1 rounded font-medium ${tag.color}`}>
                                                {tag.label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="w-8 h-8 rounded-full border border-(--dark-text-gray) flex items-center justify-center text-xs text-[#717182] bg-white">
                                            {item.assignee}
                                        </div>
                                        <span className="text-xs text-[#717182]">{item.timeInColumn}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductDeliveryBoard;
