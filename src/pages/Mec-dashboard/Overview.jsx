

import React, { useState, useEffect } from 'react';
import {
  ClipboardList, CheckCircle2, Clock, DollarSign,
  ChevronRight, UserPlus, Banknote, Star,
  MessageSquare, CalendarDays, ChevronDown, ChevronUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, change, changeType, iconBg }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[112px]">
    <div className="flex items-start justify-between gap-2">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={17} className="text-gray-700" strokeWidth={2} />
      </div>
      {change && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
          changeType === 'positive' ? 'bg-green-50 text-green-600'
          : changeType === 'negative' ? 'bg-red-50 text-red-500'
          : 'bg-gray-100 text-gray-500'
        }`}>
          {change}
        </span>
      )}
    </div>
    <div className="mt-3">
      <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-[22px] font-bold text-gray-900 mt-0.5 leading-none">{value}</p>
    </div>
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: 'bg-blue-600 text-white',
    WAITING:   'bg-amber-400 text-white',
    UPCOMING:  'bg-gray-100 text-gray-500',
    COMPLETED: 'bg-green-500 text-white',
    ACCEPTED:  'bg-purple-500 text-white',
    CANCELLED: 'bg-red-500 text-white',
    PENDING:   'bg-amber-400 text-white',
  };
  return (
    <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-widest flex-shrink-0 ${styles[status] || styles.UPCOMING}`}>
      {status}
    </span>
  );
};

// ─── Activity config ──────────────────────────────────────────────────────────
const ACTIVITY_CFG = {
  service_request: { bg: 'bg-blue-50',  icon: UserPlus,      color: 'text-blue-500',  dot: 'bg-blue-500'  },
  payment:         { bg: 'bg-green-50', icon: Banknote,      color: 'text-green-500', dot: 'bg-green-500' },
  review:          { bg: 'bg-amber-50', icon: Star,          color: 'text-amber-500', dot: 'bg-amber-400' },
  message:         { bg: 'bg-gray-100', icon: MessageSquare, color: 'text-gray-500',  dot: 'bg-gray-400'  },
  job:             { bg: 'bg-blue-50',  icon: ClipboardList, color: 'text-blue-500',  dot: 'bg-blue-500'  },
};

// ─── Single activity row ──────────────────────────────────────────────────────
const ActivityRow = ({ activity, showBorder }) => {
  const cfg = ACTIVITY_CFG[activity.type] || ACTIVITY_CFG.job;
  const Icon = cfg.icon;
  const hasLiveDot = activity.type === 'service_request' || activity.type === 'job';

  return (
    <div className={`flex items-start gap-3 ${showBorder ? 'pb-3.5 mb-3.5 border-b border-gray-50' : ''}`}>
      {/* Icon */}
      <div className="relative flex-shrink-0">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${cfg.bg}`}>
          <Icon size={15} className={cfg.color} strokeWidth={2.2} />
        </div>
        {hasLiveDot && (
          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${cfg.dot} border-2 border-white rounded-full`} />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {/* Customer name — bold, always visible */}
        {activity.customerName && (
          <p className="text-[13px] font-bold text-gray-900 leading-tight">{activity.customerName}</p>
        )}
        {/* Job title + status */}
        <p className={`text-[12px] leading-snug ${activity.customerName ? 'text-gray-500 mt-0.5' : 'text-gray-800 font-semibold'}`}>
          {activity.title}
          {activity.status && (
            <span className={`ml-1.5 inline-block text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide
              ${activity.status === 'COMPLETED' ? 'bg-green-50 text-green-600'
              : activity.status === 'ACCEPTED'  ? 'bg-purple-50 text-purple-600'
              : activity.status === 'PENDING'   ? 'bg-amber-50 text-amber-600'
              : 'bg-gray-100 text-gray-500'}`}>
              {activity.status}
            </span>
          )}
        </p>
        {/* Amount if present */}
        {activity.amount && (
          <p className="text-[11px] text-green-600 font-semibold mt-0.5">₦{Number(activity.amount).toLocaleString()}</p>
        )}
        {/* Time ago */}
        <p className="text-[11px] text-gray-300 mt-0.5">{activity.timeAgo}</p>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const ProviderDashboard = () => {
  const navigate = useNavigate();

  const [greeting, setGreeting]     = useState('');
  const [date, setDate]             = useState('');
  const [stats, setStats]           = useState({
    totalJobs: 0, completed: 0, pending: 0, monthlyEarnings: 0,
    changes: { totalJobs: '0%', completed: '+0%', pending: '0%', earnings: '+0%' },
  });
  const [schedule, setSchedule]     = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [showAll, setShowAll]       = useState(false);
  const [isOpen, setIsOpen]         = useState(false);
  const [isOnline, setIsOnline]     = useState(true);

  const PREVIEW = 3;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true); setError(null);
        const { data } = await api.get('/provider/dashboard');

        if (data.greeting) setGreeting(data.greeting);
        if (data.date)     setDate(data.date);

        if (data.stats) {
          setStats({
            totalJobs:       data.stats.totalJobs?.value       ?? 0,
            completed:       data.stats.completed?.value       ?? 0,
            pending:         data.stats.pending?.value         ?? 0,
            monthlyEarnings: data.stats.monthlyEarnings?.value ?? 0,
            changes: {
              totalJobs: data.stats.totalJobs?.change       ?? '0%',
              completed: data.stats.completed?.change       ?? '+0%',
              pending:   data.stats.pending?.change         ?? '0%',
              earnings:  data.stats.monthlyEarnings?.change ?? '+0%',
            },
          });
        }

        if (data.upcoming) setSchedule(data.upcoming);

        if (data.activity) {
          setActivities(data.activity.map(act => ({
            id:           act.id,
            type:         act.type,
            customerName: act.customerName || null,
            title:        act.title || 'Activity',
            status:       act.status || null,
            amount:       act.amount || null,
            timeAgo:      act.timeAgo || 'Recently',
          })));
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, []);

  const visible    = showAll ? activities : activities.slice(0, PREVIEW);
  const hiddenCount = activities.length - PREVIEW;

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
          <main className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              <p className="text-[13px] text-gray-400 font-medium">Loading…</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

        {/* ── Scrollable page ────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-10 max-w-7xl mx-auto w-full">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="mb-5 sm:mb-8">
              {date && (
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  {date}
                </p>
              )}
              <h1 className="text-[22px] sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {greeting || 'Welcome back'}
              </h1>
              <p className="text-gray-400 mt-1 text-[13px] sm:text-sm">
                {schedule.length > 0 ? (
                  <>You have{' '}
                    <span className="font-semibold text-gray-700">
                      {schedule.length} appointment{schedule.length !== 1 ? 's' : ''}
                    </span>{' '}today.
                  </>
                ) : 'No upcoming appointments for today.'}
              </p>
            </div>

            {/* ── Stats — 2×2 on mobile, 4×1 on desktop ──────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5 sm:mb-8">
              <StatCard
                icon={ClipboardList} label="Total Jobs" value={stats.totalJobs}
                change={stats.changes?.totalJobs}
                changeType={stats.changes?.totalJobs?.startsWith('+') ? 'positive' : stats.changes?.totalJobs?.startsWith('-') ? 'negative' : 'neutral'}
                iconBg="bg-blue-50"
              />
              <StatCard
                icon={CheckCircle2} label="Completed" value={stats.completed}
                change={stats.changes?.completed} changeType="positive"
                iconBg="bg-green-50"
              />
              <StatCard
                icon={Clock} label="Pending" value={stats.pending}
                change={stats.changes?.pending}
                changeType={stats.changes?.pending?.startsWith('+') ? 'positive' : stats.changes?.pending?.startsWith('-') ? 'negative' : 'neutral'}
                iconBg="bg-amber-50"
              />
              <StatCard
                icon={DollarSign} label="Earnings" value={`₦${stats.monthlyEarnings.toLocaleString()}`}
                change={stats.changes?.earnings} changeType="positive"
                iconBg="bg-indigo-50"
              />
            </div>

            {/* ── Content — stacked on mobile, side-by-side on desktop ── */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 lg:gap-6">

              {/* Upcoming Schedule */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[15px] sm:text-base font-bold text-gray-900">Upcoming Schedule</h2>
                  <button
                    onClick={() => navigate('/mec-dashboard/schedule')}
                    className="flex items-center gap-1 text-blue-600 text-[12px] sm:text-[13px] font-semibold active:opacity-70 transition-opacity"
                  >
                    <CalendarDays size={13} />
                    View Calendar
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {schedule.length > 0 ? schedule.map((item, i) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group ${i !== schedule.length - 1 ? 'border-b border-gray-50' : ''}`}
                    >
                      {/* Time */}
                      <div className="flex-shrink-0 text-center w-12">
                        <p className="text-[13px] font-bold text-gray-800 leading-tight">{item.time?.split(' ')[0] || '--:--'}</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wide">{item.time?.split(' ')[1] || ''}</p>
                      </div>

                      <div className="w-px h-8 bg-gray-100 flex-shrink-0" />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-900 truncate">{item.title || 'Untitled'}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate">{item.vehicle || item.customerName || ''}</p>
                      </div>

                      {/* Badge + arrow */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <StatusBadge status={item.status || 'UPCOMING'} />
                        <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                      </div>
                    </div>
                  )) : (
                    <div className="py-12 text-center">
                      <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                        <CalendarDays size={19} className="text-gray-300" />
                      </div>
                      <p className="text-[13px] font-semibold text-gray-400">No upcoming appointments</p>
                      <p className="text-[12px] text-gray-300 mt-1">Your schedule is clear.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[15px] sm:text-base font-bold text-gray-900">Recent Activity</h2>
                  {activities.length > 0 && (
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {activities.length}
                    </span>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {activities.length === 0 ? (
                    <div className="py-12 text-center">
                      <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                        <MessageSquare size={19} className="text-gray-300" />
                      </div>
                      <p className="text-[13px] font-semibold text-gray-400">No recent activity</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4">
                        {visible.map((act, i) => (
                          <ActivityRow
                            key={act.id}
                            activity={act}
                            showBorder={i < visible.length - 1}
                          />
                        ))}
                      </div>

                      {hiddenCount > 0 && (
                        <button
                          onClick={() => setShowAll(s => !s)}
                          className="w-full flex items-center justify-center gap-1.5 py-3 border-t border-gray-50 text-[12px] font-semibold transition-colors active:bg-gray-50"
                          style={{ color: showAll ? '#9ca3af' : '#2563eb' }}
                        >
                          {showAll
                            ? <><ChevronUp size={13} /> Show less</>
                            : <><ChevronDown size={13} /> {hiddenCount} more {hiddenCount === 1 ? 'activity' : 'activities'}</>
                          }
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Error toast */}
      {error && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg text-[12px] sm:text-[13px] font-medium flex items-center gap-2 z-50">
          <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
          <span className="flex-1">{error}</span>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;

