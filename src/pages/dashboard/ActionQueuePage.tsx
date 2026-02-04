import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';

const ActionQueuePage: React.FC = () => {
  const navigate = useNavigate();

  const queueItems = [
    { priority: 'High', type: 'approval', title: 'Production deploy: v2.4.1', requester: 'Sarah Chen', status: 'Waiting: 2 approvers', color: 'bg-(--light-red) text-(--dark-red)' },
    { priority: 'High', type: 'approval', title: 'IAM role modification', requester: 'Mike Johnson', status: 'Waiting: Security review', color: 'bg-(--light-red) text-(--dark-red)' },
    { priority: 'Medium', type: 'execution', title: 'Database migration: users table', status: 'Waiting: Scheduled window', color: 'bg-(--light-yellow) text-(--dark-orange)' },
    { priority: 'Low', type: 'approval', title: 'Weekly backup verification', time: 'Today, 3:00 PM', color: 'bg-green-50 text-green-600' },
    { priority: 'Medium', type: 'scheduled', title: 'SSL certificate renewal', time: 'Tomorrow, 9:00 AM', color: 'bg-(--light-yellow) text-(--dark-orange)' },
  ];

  return (
    <div className="w-full max-w-[2512px]">
      <div 
        className="flex items-center gap-2 mb-8 cursor-pointer group w-fit"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={32} className="text-(--dark-text-black) group-hover:-translate-x-1 transition-transform" />
        <h1 className="md:text-[32px] sm:text-2xl text-lg font-semibold text-(--dark-text-black)">Action Queue</h1>
      </div>

      <div className="bg-white rounded-[14px] p-6 shadow-sm border border-[#0000001A]">
        <SearchBar />
        <div className="space-y-0">
          {queueItems.map((item, index) => (
            <div key={index} className="py-6 border-b border-(--text-gray)">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-normal px-2 py-0.5 rounded ${item.color}`}>
                  {item.priority}
                </span>
                <span className="text-xs font-normal text-gray-400 tracking-wide">
                  {item.type}
                </span>
              </div>
              <h3 className="text-lg font-normal text-[#1E1E1E]">
                {item.title}
              </h3>
              {item.requester && (
                <p className="text-sm text-gray-500 my-2">
                  Requested by {item.requester}
                </p>
              )}
              {item.status && (
                <p className="text-sm text-[#3178EC] my-2">
                  {item.status}
                </p>
              )}
              {item.time && (
                <p className="text-sm text-gray-400 my-2">
                  {item.time}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionQueuePage;

