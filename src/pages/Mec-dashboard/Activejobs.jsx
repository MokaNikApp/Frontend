









import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import api from "../../api/axios";

// ─── Utility Components ────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    'IN_PROGRESS': 'bg-blue-50 text-blue-600 border-blue-100',
    'EN_ROUTE': 'bg-amber-50 text-amber-600 border-amber-100',
    'ACCEPTED': 'bg-purple-50 text-purple-600 border-purple-100',
    'COMPLETED': 'bg-green-50 text-green-600 border-green-100',
    'CANCELLED': 'bg-red-50 text-red-600 border-red-100',
    'PENDING': 'bg-gray-50 text-gray-600 border-gray-100',
  };

  const labels = {
    'IN_PROGRESS': 'IN PROGRESS',
    'EN_ROUTE': 'EN ROUTE',
    'ACCEPTED': 'ACCEPTED',
    'COMPLETED': 'COMPLETED',
    'CANCELLED': 'CANCELLED',
    'PENDING': 'PENDING',
  };

  const dotColors = {
    'IN_PROGRESS': 'bg-blue-500',
    'EN_ROUTE': 'bg-amber-500',
    'ACCEPTED': 'bg-purple-500',
    'COMPLETED': 'bg-green-500',
    'CANCELLED': 'bg-red-500',
    'PENDING': 'bg-gray-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['PENDING']}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status] || dotColors['PENDING']}`} />
      {labels[status] || labels['PENDING']}
    </span>
  );
};

const ProgressBar = ({ serviceName, progress }) => (
  <div className="mt-3">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm font-medium text-gray-700">{serviceName}</span>
      <span className="text-sm font-semibold text-blue-600">{progress}%</span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const LocationInfo = ({ serviceType, location }) => {
  const icons = {
    pickup: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    towing: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };

  return (
    <div className="mt-3 flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icons[serviceType]}</div>
      <div>
        <p className="text-sm font-medium text-gray-800">
          {serviceType === 'pickup' ? 'Pick-up Request' : 'Towing Service'}
        </p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

const UpdateStatusDropdown = ({ currentStatus, onUpdate, isUpdating }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusOptions = [
    { value: 'EN_ROUTE', label: 'En Route' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
  ];

  // Don't show options that are already the current status
  const availableOptions = statusOptions.filter(opt => opt.value !== currentStatus);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
      >
        {isUpdating ? 'Updating...' : 'Update Status'}
        {!isUpdating && (
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && availableOptions.length > 0 && (
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {availableOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onUpdate(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const JobCard = ({ job, onUpdateStatus, updatingJobId }) => {
  const isUpdating = updatingJobId === job.id;

  // Calculate progress based on status timestamps
  const getProgress = () => {
    if (job.status === 'COMPLETED') return 100;
    if (job.status === 'IN_PROGRESS') {
      // If startedAt exists, calculate pseudo-progress based on time elapsed
      if (job.startedAt) {
        const start = new Date(job.startedAt).getTime();
        const now = Date.now();
        const elapsed = now - start;
        // Assume avg job takes ~2 hours, cap at 95% until completed
        const progress = Math.min(95, Math.floor((elapsed / (2 * 60 * 60 * 1000)) * 100));
        return Math.max(20, progress);
      }
      return 45;
    }
    if (job.status === 'EN_ROUTE') return 10;
    if (job.status === 'ACCEPTED') return 5;
    return 0;
  };

  const getTimeDisplay = () => {
    if (job.startedAt) {
      const diff = Math.floor((Date.now() - new Date(job.startedAt).getTime()) / 1000 / 60);
      if (diff < 60) return `Started ${diff}m ago`;
      const hours = Math.floor(diff / 60);
      return `Started ${hours}h ago`;
    }
    if (job.enRouteAt) {
      const diff = Math.floor((Date.now() - new Date(job.enRouteAt).getTime()) / 1000 / 60);
      if (diff < 60) return `En route ${diff}m ago`;
      const hours = Math.floor(diff / 60);
      return `En route ${hours}h ago`;
    }
    if (job.acceptedAt) {
      const diff = Math.floor((Date.now() - new Date(job.acceptedAt).getTime()) / 1000 / 60);
      if (diff < 60) return `Accepted ${diff}m ago`;
      const hours = Math.floor(diff / 60);
      return `Accepted ${hours}h ago`;
    }
    return null;
  };

  // Determine if this is a workshop job (has progress) or mobile service (has location)
  // For now, all API jobs are treated as workshop-style with progress
  const isWorkshop = !job.location;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {job.user?.firstName} {job.user?.lastName}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-gray-500">{job.title}</span>
              <span className="text-sm font-semibold text-gray-900">₦{job.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <StatusBadge status={job.status} />
              {getTimeDisplay() && (
                <span className="text-sm text-gray-400">{getTimeDisplay()}</span>
              )}
            </div>
          </div>
        </div>
        <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Service Details */}
      <div className="mt-4 pt-4 border-t border-gray-50">
        {isWorkshop ? (
          <ProgressBar serviceName={job.title} progress={getProgress()} />
        ) : (
          <LocationInfo serviceType="pickup" location={job.location} />
        )}
        
        {/* Description */}
        <p className="mt-3 text-sm text-gray-500 line-clamp-2">{job.description}</p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
            {job.provider?.firstName?.[0]}{job.provider?.lastName?.[0]}
          </div>
          <span className="text-sm text-gray-600">
            {job.provider?.firstName} {job.provider?.lastName}
          </span>
        </div>
        <UpdateStatusDropdown 
          currentStatus={job.status} 
          onUpdate={(status) => onUpdateStatus(job.id, status)} 
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
};

// ─── Main Dashboard Page ───────────────────────────────────

const OngoingServices = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Jobs' },
    { id: 'EN_ROUTE', label: 'En Route' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'ACCEPTED', label: 'Accepted' },
  ];

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/jobs');
      setJobs(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError(err.response?.data?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'all') return true;
    return job.status === activeTab;
  });

  // Update job status via API
  const handleUpdateStatus = async (jobId, newStatus) => {
    setUpdatingJobId(jobId);
    
    try {
      await api.patch(`/jobs/${jobId}/status`, { status: newStatus });
      
      // Update local state after successful API call
      setJobs((prev) =>
        prev.map((job) => 
          job.id === jobId 
            ? { 
                ...job, 
                status: newStatus,
                ...(newStatus === 'EN_ROUTE' && { enRouteAt: new Date().toISOString() }),
                ...(newStatus === 'IN_PROGRESS' && { startedAt: new Date().toISOString() }),
                ...(newStatus === 'COMPLETED' && { completedAt: new Date().toISOString(), isCompletedByProvider: true }),
              } 
            : job
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingJobId(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-2xl font-bold text-gray-900">Ongoing Services</h1>
                <p className="text-gray-500 mt-1">Real-time status of all active workshop repairs.</p>
              </div>

              {/* Tabs */}
              <div className="inline-flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Error loading jobs</h3>
                <p className="text-gray-500 mt-1">{error}</p>
                <button 
                  onClick={fetchJobs}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Jobs Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onUpdateStatus={handleUpdateStatus}
                    updatingJobId={updatingJobId}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="text-gray-500 mt-1">
                  There are no {activeTab !== 'all' ? activeTab.replace('_', ' ') : 'active'} jobs at the moment.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OngoingServices;