
// import React, { useState, useEffect } from 'react';
// import {
//   ClipboardList,
//   CheckCircle2,
//   Clock,
//   DollarSign,
//   ChevronRight,
//   UserPlus,
//   Banknote,
//   Star,
//   MessageSquare,
//   CalendarDays
// } from 'lucide-react';
// import api from '../../api/axios';
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";

// const StatCard = ({ icon: Icon, label, value, change, changeType, iconBg }) => (
//   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
//     <div className="flex items-start justify-between">
//       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
//         <Icon size={20} className="text-gray-700" strokeWidth={2} />
//       </div>
//       {change && (
//         <span
//           className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
//             changeType === 'positive'
//               ? 'bg-green-50 text-green-600'
//               : changeType === 'negative'
//               ? 'bg-red-50 text-red-500'
//               : 'bg-gray-100 text-gray-500'
//           }`}
//         >
//           {change}
//         </span>
//       )}
//     </div>
//     <div>
//       <p className="text-gray-500 text-sm font-medium mt-2">{label}</p>
//       <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//     </div>
//   </div>
// );

// const StatusBadge = ({ status }) => {
//   const styles = {
//     CONFIRMED: 'bg-blue-600 text-white',
//     WAITING: 'bg-amber-400 text-white',
//     UPCOMING: 'bg-gray-200 text-gray-500',
//     COMPLETED: 'bg-green-500 text-white',
//     ACCEPTED: 'bg-purple-500 text-white',
//     CANCELLED: 'bg-red-500 text-white',
//     PENDING: 'bg-amber-400 text-white',
//   };
//   return (
//     <span className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide ${styles[status] || styles.UPCOMING}`}>
//       {status}
//     </span>
//   );
// };

// const ActivityIcon = ({ type }) => {
//   const configs = {
//     service_request: { bg: 'bg-blue-50', icon: UserPlus, color: 'text-blue-500' },
//     payment: { bg: 'bg-green-50', icon: Banknote, color: 'text-green-500' },
//     review: { bg: 'bg-amber-50', icon: Star, color: 'text-amber-500' },
//     message: { bg: 'bg-gray-100', icon: MessageSquare, color: 'text-gray-500' },
//     job: { bg: 'bg-blue-50', icon: ClipboardList, color: 'text-blue-500' },
//   };
//   const config = configs[type] || configs.job;
//   const Icon = config.icon;
//   return (
//     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
//       <Icon size={18} className={config.color} />
//     </div>
//   );
// };

// // ─── Main Dashboard Component ──────────────────────────────────────

// const ProviderDashboard = () => {
//   const [stats, setStats] = useState({
//     totalJobs: 0,
//     completed: 0,
//     pending: 0,
//     monthlyEarnings: 0,
//     changes: { totalJobs: '0%', completed: '+0%', pending: '0%', earnings: '+0%' },
//   });
//   const [schedule, setSchedule] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [greeting, setGreeting] = useState('Good morning');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch dashboard data from API
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await api.get(`/provider/dashboard`);
//         const data = response.data;

//         // Map stats from API
//         if (data.stats) {
//           setStats({
//             totalJobs: data.stats.totalJobs?.value ?? 0,
//             completed: data.stats.completed?.value ?? 0,
//             pending: data.stats.pending?.value ?? 0,
//             monthlyEarnings: data.stats.monthlyEarnings?.value ?? 0,
//             changes: {
//               totalJobs: data.stats.totalJobs?.change ?? '0%',
//               completed: data.stats.completed?.change ?? '+0%',
//               pending: data.stats.pending?.change ?? '0%',
//               earnings: data.stats.monthlyEarnings?.change ?? '+0%',
//             },
//           });
//         }

//         // Map upcoming schedule
//         if (data.upcoming) {
//           setSchedule(data.upcoming);
//         }

//         // Map activities from API
//         if (data.activity) {
//           const mappedActivities = data.activity.map((act) => ({
//             id: act.id,
//             type: act.type === 'job' ? 'service_request' : act.type,
//             title:
//               act.type === 'job'
//                 ? `${act.customerName || 'Someone'} — ${act.title} (${act.status})`
//                 : act.type === 'payment'
//                 ? `Payment of ₦${Number(act.amount).toLocaleString()} received`
//                 : act.type === 'review'
//                 ? `New ${act.rating || 5}-star review from ${act.customerName || 'a customer'}`
//                 : act.title || 'New activity',
//             timeAgo: act.timeAgo || 'Recently',
//             hasIndicator: act.type === 'job' || act.type === 'service_request',
//             rawTime: act.time,
//           }));
//           setActivities(mappedActivities);
//         }

//         // Set greeting
//         if (data.greeting) {
//           setGreeting(data.greeting);
//         }
//       } catch (err) {
//         console.error('Dashboard fetch error:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();

//     // Poll for real-time updates every 30 seconds
//     const interval = setInterval(fetchDashboard, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // ─── Loading State ───────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//         <Sidebar />
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           <Topbar />
//           <main className="flex-1 overflow-y-auto flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         {/* Topbar */}
//         <Topbar />

//         {/* Scrollable Content */}
//         <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
//           <div className="max-w-7xl mx-auto">
//             {/* ─── Header ─────────────────────────────────────────────── */}
//             <div className="mb-8">
//               <h1 className="text-2xl md:text-2xl font-bold text-gray-900">{greeting}</h1>
//               <p className="text-gray-500 mt-1 text-sm md:text-base">
//                 {schedule.length > 0 ? (
//                   <>
//                     You have <span className="font-semibold text-gray-700">{schedule.length} appointment{schedule.length !== 1 ? 's' : ''}</span> scheduled for today.
//                   </>
//                 ) : (
//                   'No upcoming appointments for today.'
//                 )}
//               </p>
//             </div>

//             {/* ─── Stats Cards ────────────────────────────────────────── */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//               <StatCard
//                 icon={ClipboardList}
//                 label="Total Jobs"
//                 value={stats.totalJobs}
//                 change={stats.changes?.totalJobs}
//                 changeType={stats.changes?.totalJobs?.startsWith('+') ? 'positive' : stats.changes?.totalJobs?.startsWith('-') ? 'negative' : 'neutral'}
//                 iconBg="bg-blue-50"
//               />
//               <StatCard
//                 icon={CheckCircle2}
//                 label="Completed"
//                 value={stats.completed}
//                 change={stats.changes?.completed}
//                 changeType="positive"
//                 iconBg="bg-green-50"
//               />
//               <StatCard
//                 icon={Clock}
//                 label="Pending"
//                 value={stats.pending}
//                 change={stats.changes?.pending}
//                 changeType={stats.changes?.pending?.startsWith('+') ? 'positive' : stats.changes?.pending?.startsWith('-') ? 'negative' : 'neutral'}
//                 iconBg="bg-amber-50"
//               />
//               <StatCard
//                 icon={DollarSign}
//                 label="Monthly Earnings"
//                 value={`₦${stats.monthlyEarnings.toLocaleString()}`}
//                 change={stats.changes?.earnings}
//                 changeType="positive"
//                 iconBg="bg-indigo-50"
//               />
//             </div>

//             {/* ─── Main Content Grid ──────────────────────────────────── */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//               {/* ─── Upcoming Schedule (2/3 width) ────────────────────── */}
//               <div className="lg:col-span-2">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-bold text-gray-900">Upcoming Schedule</h2>
//                   <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors">
//                     <CalendarDays size={16} />
//                     View Calendar
//                   </button>
//                 </div>

//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   {schedule.length > 0 ? (
//                     schedule.map((item, index) => (
//                       <div
//                         key={item.id}
//                         className={`flex items-center p-4 md:p-5 hover:bg-gray-50 transition-colors cursor-pointer group ${
//                           index !== schedule.length - 1 ? 'border-b border-gray-100' : ''
//                         }`}
//                       >
//                         {/* Time Column */}
//                         <div className="w-16 md:w-20 flex-shrink-0 text-center">
//                           <p className="text-sm font-bold text-gray-400 leading-tight">{item.time?.split(' ')[0] || '--:--'}</p>
//                           <p className="text-xs text-gray-400 uppercase">{item.time?.split(' ')[1] || ''}</p>
//                         </div>

//                         {/* Divider */}
//                         <div className="w-px h-10 bg-gray-200 mx-4 md:mx-6 flex-shrink-0"></div>

//                         {/* Content */}
//                         <div className="flex-1 min-w-0">
//                           <h3 className="text-sm md:text-base font-bold text-gray-900 truncate">{item.title || 'Untitled'}</h3>
//                           <p className="text-sm text-gray-500 mt-0.5">{item.vehicle || item.customerName || 'No details'}</p>
//                         </div>

//                         {/* Status & Arrow */}
//                         <div className="flex items-center gap-3 ml-4 flex-shrink-0">
//                           <StatusBadge status={item.status || 'UPCOMING'} />
//                           <ChevronRight
//                             size={18}
//                             className="text-gray-300 group-hover:text-gray-500 transition-colors"
//                           />
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="p-8 text-center text-gray-400">
//                       <CalendarDays size={32} className="mx-auto mb-3 text-gray-300" />
//                       <p className="text-sm font-medium">No upcoming appointments</p>
//                       <p className="text-xs mt-1">Your schedule is clear for now.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ─── Recent Activity (1/3 width) ───────────────────────── */}
//               <div className="lg:col-span-1">
//                 <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>

//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                   {activities.length > 0 ? (
//                     <>
//                       <div className="space-y-5">
//                         {activities.map((activity) => (
//                           <div key={activity.id} className="flex items-start gap-3">
//                             <div className="relative flex-shrink-0">
//                               <ActivityIcon type={activity.type} />
//                               {activity.hasIndicator && (
//                                 <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                               )}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-semibold text-gray-900 leading-snug">{activity.title}</p>
//                               <p className="text-xs text-gray-400 mt-0.5">{activity.timeAgo}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <button className="w-full mt-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//                         View All Activity
//                       </button>
//                     </>
//                   ) : (
//                     <div className="py-8 text-center text-gray-400">
//                       <MessageSquare size={32} className="mx-auto mb-3 text-gray-300" />
//                       <p className="text-sm font-medium">No recent activity</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//             </div>

//             {/* ─── Error Toast (if API fails) ─────────────────────────── */}
//             {error && (
//               <div className="fixed bottom-6 right-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 z-50">
//                 <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//                 {error}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProviderDashboard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  DollarSign,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Banknote,
  Star,
  MessageSquare,
  CalendarDays,
  Wrench,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import api from '../../api/axios';
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

// ─── Stat Card ─────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, change, iconBg }) => {
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={20} className="text-gray-700" strokeWidth={2} />
        </div>
        {change && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full ${
              isPositive
                ? 'bg-emerald-50 text-emerald-600'
                : isNegative
                ? 'bg-rose-50 text-rose-600'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {isPositive && <TrendingUp size={12} />}
            {isNegative && <TrendingDown size={12} />}
            {!isPositive && !isNegative && <Minus size={12} />}
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium mt-3">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{value}</p>
      </div>
    </div>
  );
};

// ─── Status Badge ──────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: 'bg-blue-600 text-white shadow-blue-200',
    WAITING: 'bg-amber-400 text-white shadow-amber-200',
    UPCOMING: 'bg-slate-200 text-slate-500',
    COMPLETED: 'bg-emerald-500 text-white shadow-emerald-200',
    ACCEPTED: 'bg-violet-500 text-white shadow-violet-200',
    CANCELLED: 'bg-rose-500 text-white shadow-rose-200',
    PENDING: 'bg-amber-400 text-white shadow-amber-200',
  };
  return (
    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm ${styles[status] || styles.UPCOMING}`}>
      {status}
    </span>
  );
};

// ─── Activity Item ─────────────────────────────────────────────────

const ActivityItem = ({ activity }) => {
  const getActivityConfig = (type, status) => {
    if (type === 'service_request' || type === 'job') {
      const statusColors = {
        COMPLETED: { bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100', icon: CheckCircle2 },
        ACCEPTED: { bg: 'bg-violet-50', color: 'text-violet-600', border: 'border-violet-100', icon: ClipboardList },
        PENDING: { bg: 'bg-amber-50', color: 'text-amber-600', border: 'border-amber-100', icon: Clock },
        IN_PROGRESS: { bg: 'bg-blue-50', color: 'text-blue-600', border: 'border-blue-100', icon: Wrench },
        CANCELLED: { bg: 'bg-rose-50', color: 'text-rose-600', border: 'border-rose-100', icon: MessageSquare },
      };
      return statusColors[status] || { bg: 'bg-slate-50', color: 'text-slate-600', border: 'border-slate-100', icon: ClipboardList };
    }
    
    const configs = {
      payment: { bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100', icon: Banknote },
      review: { bg: 'bg-amber-50', color: 'text-amber-600', border: 'border-amber-100', icon: Star },
      message: { bg: 'bg-slate-50', color: 'text-slate-600', border: 'border-slate-100', icon: MessageSquare },
    };
    return configs[type] || configs.message;
  };

  const config = getActivityConfig(activity.type, activity.status);
  const Icon = config.icon;

  return (
    <div className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
      <div className="relative flex-shrink-0">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${config.bg} border ${config.border}`}>
          <Icon size={18} className={config.color} />
        </div>
        {activity.hasIndicator && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></span>
        )}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
          {activity.title}
        </p>
        
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-gray-400 font-medium">{activity.timeAgo}</span>
          {activity.status && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className={`text-[11px] font-bold uppercase tracking-wide ${
                activity.status === 'COMPLETED' ? 'text-emerald-600' :
                activity.status === 'ACCEPTED' ? 'text-violet-600' :
                activity.status === 'PENDING' ? 'text-amber-600' :
                'text-gray-500'
              }`}>
                {activity.status}
              </span>
            </>
          )}
          {activity.amount && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-xs font-bold text-gray-700">₦{Number(activity.amount).toLocaleString()}</span>
            </>
          )}
        </div>
      </div>

      <ChevronRight 
        size={16} 
        className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-2.5" 
      />
    </div>
  );
};

// ─── Main Dashboard Component ──────────────────────────────────────

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    completed: 0,
    pending: 0,
    monthlyEarnings: 0,
    changes: { totalJobs: '0%', completed: '+0%', pending: '0%', earnings: '+0%' },
  });
  const [schedule, setSchedule] = useState([]);
  const [activities, setActivities] = useState([]);
  const [greeting, setGreeting] = useState('Good morning');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllActivities, setShowAllActivities] = useState(false);

  const ACTIVITY_LIMIT = 3;

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/provider/dashboard`);
        const data = response.data;

        if (data.stats) {
          setStats({
            totalJobs: data.stats.totalJobs?.value ?? 0,
            completed: data.stats.completed?.value ?? 0,
            pending: data.stats.pending?.value ?? 0,
            monthlyEarnings: data.stats.monthlyEarnings?.value ?? 0,
            changes: {
              totalJobs: data.stats.totalJobs?.change ?? '0%',
              completed: data.stats.completed?.change ?? '+0%',
              pending: data.stats.pending?.change ?? '0%',
              earnings: data.stats.monthlyEarnings?.change ?? '+0%',
            },
          });
        }

        if (data.upcoming) {
          setSchedule(data.upcoming);
        }

        if (data.activity) {
          const mappedActivities = data.activity.map((act) => ({
            id: act.id,
            type: act.type === 'job' ? 'service_request' : act.type,
            title:
              act.type === 'job'
                ? `${act.customerName || 'Someone'} — ${act.title}`
                : act.type === 'payment'
                ? `Payment of ₦${Number(act.amount).toLocaleString()} received`
                : act.type === 'review'
                ? `New ${act.rating || 5}-star review from ${act.customerName || 'a customer'}`
                : act.title || 'New activity',
            timeAgo: act.timeAgo || 'Recently',
            hasIndicator: act.type === 'job' || act.type === 'service_request',
            status: act.status,
            amount: act.amount,
            rawTime: act.time,
          }));
          setActivities(mappedActivities);
        }

        if (data.greeting) {
          setGreeting(data.greeting);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const displayedActivities = showAllActivities 
    ? activities 
    : activities.slice(0, ACTIVITY_LIMIT);

  const hasMoreActivities = activities.length > ACTIVITY_LIMIT;

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-blue-100 border-t-blue-600"></div>
              <p className="text-sm text-gray-400 font-medium">Loading dashboard...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* ─── Header ─────────────────────────────────────────────── */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{greeting}</h1>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                {schedule.length > 0 ? (
                  <>
                    You have <span className="font-semibold text-gray-700">{schedule.length} appointment{schedule.length !== 1 ? 's' : ''}</span> scheduled for today.
                  </>
                ) : (
                  'No upcoming appointments for today.'
                )}
              </p>
            </div>

            {/* ─── Stats Cards ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <StatCard
                icon={ClipboardList}
                label="Total Jobs"
                value={stats.totalJobs}
                change={stats.changes?.totalJobs}
                iconBg="bg-blue-50"
              />
              <StatCard
                icon={CheckCircle2}
                label="Completed"
                value={stats.completed}
                change={stats.changes?.completed}
                iconBg="bg-emerald-50"
              />
              <StatCard
                icon={Clock}
                label="Pending"
                value={stats.pending}
                change={stats.changes?.pending}
                iconBg="bg-amber-50"
              />
              <StatCard
                icon={DollarSign}
                label="Monthly Earnings"
                value={`₦${stats.monthlyEarnings.toLocaleString()}`}
                change={stats.changes?.earnings}
                iconBg="bg-indigo-50"
              />
            </div>

            {/* ─── Main Content Grid ──────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ─── Upcoming Schedule (2/3 width) ────────────────────── */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Upcoming Schedule</h2>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">Your next appointments</p>
                  </div>
                  <button 
                    onClick={() => navigate('/mec-dashboard/schedule')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
                  >
                    <CalendarDays size={16} />
                    View Calendar
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {schedule.length > 0 ? (
                    schedule.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex items-center p-4 md:p-5 hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${
                          index !== schedule.length - 1 ? 'border-b border-gray-50' : ''
                        }`}
                      >
                        <div className="w-16 md:w-20 flex-shrink-0 text-center">
                          <p className="text-sm font-bold text-gray-900 leading-tight">{item.time?.split(' ')[0] || '--:--'}</p>
                          <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider mt-0.5">{item.time?.split(' ')[1] || ''}</p>
                        </div>

                        <div className="w-px h-12 bg-gray-100 mx-4 md:mx-6 flex-shrink-0"></div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm md:text-base font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{item.title || 'Untitled'}</h3>
                          <p className="text-sm text-gray-400 mt-1">{item.vehicle || item.customerName || 'No details'}</p>
                        </div>

                        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                          <StatusBadge status={item.status || 'UPCOMING'} />
                          <ChevronRight
                            size={18}
                            className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all duration-200"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CalendarDays size={24} className="text-gray-300" />
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No upcoming appointments</p>
                      <p className="text-xs text-gray-400 mt-1">Your schedule is clear for now.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ─── Recent Activity (1/3 width) ───────────────────────── */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                      {activities.length > 0 ? `${activities.length} total activities` : 'No recent activity'}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {activities.length > 0 ? (
                    <>
                      <div className="p-2">
                        {displayedActivities.map((activity, index) => (
                          <div key={activity.id}>
                            <ActivityItem activity={activity} />
                            {index < displayedActivities.length - 1 && (
                              <div className="mx-4 h-px bg-gray-50"></div>
                            )}
                          </div>
                        ))}
                      </div>

                      {hasMoreActivities && (
                        <div className="border-t border-gray-50 p-2">
                          <button
                            onClick={() => setShowAllActivities(!showAllActivities)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                          >
                            {showAllActivities ? (
                              <>
                                <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                                <span>Show Less</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                                <span>Show {activities.length - ACTIVITY_LIMIT} More</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-10 text-center">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageSquare size={24} className="text-gray-300" />
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No recent activity</p>
                      <p className="text-xs text-gray-400 mt-1">Check back later for updates.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Error Toast ─────────────────────────── */}
            {error && (
              <div className="fixed bottom-6 right-6 bg-rose-50 border border-rose-200 text-rose-700 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold flex items-center gap-3 z-50">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
                {error}
                <button 
                  onClick={() => setError(null)}
                  className="ml-2 text-rose-400 hover:text-rose-600 font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;