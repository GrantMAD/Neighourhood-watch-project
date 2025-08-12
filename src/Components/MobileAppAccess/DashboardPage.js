import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../supabase';

function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState('overall');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const [overallMetrics, setOverallMetrics] = useState({});
  const [groupMetrics, setGroupMetrics] = useState([]);
  const [userMetrics, setUserMetrics] = useState([]);
  const [eventMetrics, setEventMetrics] = useState([]);
  const [newsMetrics, setNewsMetrics] = useState([]);
  const [incidentMetrics, setIncidentMetrics] = useState([]);
  const [requestMetrics, setRequestMetrics] = useState({ userRequests: [], groupRequests: [] });

  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  const fetchDataForCategory = useCallback(async (category) => {
    setLoading(true);
    try {
      switch (category) {
        case 'overall': {
          const { count: totalUsers } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
          const { count: totalGroups } = await supabase.from('groups').select('id', { count: 'exact', head: true });
          const { data: allGroupsData } = await supabase.from('groups').select('events, news, reports');
          let totalEvents = 0, totalNews = 0, totalIncidents = 0;
          allGroupsData?.forEach(g => {
            totalEvents += g.events?.length || 0;
            totalNews += g.news?.length || 0;
            totalIncidents += g.reports?.length || 0;
          });
          setOverallMetrics({ totalUsers, totalGroups, totalEvents, totalNews, totalIncidents });
          break;
        }
        case 'groups': {
          const { data } = await supabase.from('groups').select('id, name, created_by, users, events, news, reports, contact_email');
          setGroupMetrics(data || []);
          break;
        }
        case 'users': {
          const { data } = await supabase.from('profiles').select('id, name, email, role, group_id, checked_in');
          setUserMetrics(data || []);
          break;
        }
        case 'events': {
          const { data: groups } = await supabase.from('groups').select('id, name, created_by, events');
          const allEvents = groups?.flatMap(group => (group.events || []).map(e => ({ ...e, groupId: group.id, groupName: group.name }))) || [];
          setEventMetrics(allEvents);
          break;
        }
        case 'news': {
          const { data: groups } = await supabase.from('groups').select('id, name, created_by, news');
          const allNews = groups?.flatMap(group => (group.news || []).map(n => ({ ...n, groupId: group.id, groupName: group.name }))) || [];
          setNewsMetrics(allNews);
          break;
        }
        case 'incidents': {
          const { data: groups } = await supabase.from('groups').select('id, name, created_by, reports');
          const allIncidents = groups?.flatMap(group => (group.reports || []).map(r => ({ ...r, groupId: group.id, groupName: group.name }))) || [];
          setIncidentMetrics(allIncidents);
          break;
        }
        case 'requests': {
          const { data: users } = await supabase.from('profiles').select('id, name, email, Requests');
          const { data: groups } = await supabase.from('groups').select('id, name, created_by, requests');
          const userRequests = users?.flatMap(u => (u.Requests || []).map(r => ({ ...r, userId: u.id, userName: u.name, userEmail: u.email }))) || [];
          const groupRequests = groups?.flatMap(g => (g.requests || []).map(r => ({ ...r, groupId: g.id, groupName: g.name, creatorId: g.created_by }))) || [];
          setRequestMetrics({ userRequests, groupRequests });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      showToast(`Error loading ${category}: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDataForCategory(activeCategory);
  }, [activeCategory, fetchDataForCategory]);

  async function handleDeleteEvent(eventId, groupId) {
    try {
      const { data: group } = await supabase.from('groups').select('events, previous_events').eq('id', groupId).single();
      const eventToDelete = group.events.find(e => e.id === eventId);
      const updatedEvents = group.events.filter(e => e.id !== eventId);
      const updatedPreviousEvents = [...(group.previous_events || []), eventToDelete];
      const { error } = await supabase.from('groups').update({ events: updatedEvents, previous_events: updatedPreviousEvents }).eq('id', groupId);
      if (error) throw error;
      showToast('Event successfully deleted and archived.');
      fetchDataForCategory('events');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function handleDeleteNews(newsId, groupId) {
    try {
      const { data: group } = await supabase.from('groups').select('news').eq('id', groupId).single();
      const updatedNews = group.news.filter(n => n.id !== newsId);
      const { error } = await supabase.from('groups').update({ news: updatedNews }).eq('id', groupId);
      if (error) throw error;
      showToast('News story successfully deleted.');
      fetchDataForCategory('news');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function handleDeleteIncident(incidentId, groupId) {
    try {
      const { data: group } = await supabase.from('groups').select('reports').eq('id', groupId).single();
      const updatedReports = group.reports.filter(r => r.id !== incidentId);
      const { error } = await supabase.from('groups').update({ reports: updatedReports }).eq('id', groupId);
      if (error) throw error;
      showToast('Incident report successfully deleted.');
      fetchDataForCategory('incidents');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  // New modal-related functions:
  function openLogoutModal() {
    setShowLogoutModal(true);
  }

  async function confirmLogout() {
    setShowLogoutModal(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      showToast('Logout failed: ' + error.message, 'error');
    } else {
      window.location.href = '/';
    }
  }

  function cancelLogout() {
    setShowLogoutModal(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      {/* Sidebar */}
      <nav className="bg-white w-72 p-6 flex flex-col shadow-lg border-r border-gray-300">
        <img
          src="/images/nwLogo.png"
          alt="NeighWatch Logo"
          className="mb-8 w-48 object-contain select-none mx-auto"
          draggable={false}
        />
        {['overall', 'groups', 'users', 'events', 'news', 'incidents', 'requests'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`mb-3 px-5 py-3 rounded-lg text-lg font-medium transition
              ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-100'}
              focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        <button
          onClick={openLogoutModal} // show modal instead of alert
          className="mt-auto bg-red-600 hover:bg-red-700 py-3 rounded-lg text-lg font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
        >
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto bg-gray-50">
        {loading && (
          <p className="text-center text-lg text-indigo-600 animate-pulse">
            Loading {activeCategory} data...
          </p>
        )}

        {/* Overall */}
        {!loading && activeCategory === 'overall' && (
          <>
            <h2 className="text-3xl font-bold mb-2">Overall Application Metrics</h2>
            <p className="mb-6 text-gray-600">
              This section provides a snapshot of the key statistics across all users, groups, events, news, and incidents in the application.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <MetricCard icon="users" title="Total Users" value={overallMetrics.totalUsers || 0} onClick={() => setActiveCategory('users')} whiteBg />
              <MetricCard icon="layer-group" title="Total Groups" value={overallMetrics.totalGroups || 0} onClick={() => setActiveCategory('groups')} whiteBg />
              <MetricCard icon="calendar-check" title="Total Events" value={overallMetrics.totalEvents || 0} onClick={() => setActiveCategory('events')} whiteBg />
              <MetricCard icon="newspaper" title="Total News" value={overallMetrics.totalNews || 0} onClick={() => setActiveCategory('news')} whiteBg />
              <MetricCard icon="exclamation-triangle" title="Total Incidents" value={overallMetrics.totalIncidents || 0} onClick={() => setActiveCategory('incidents')} whiteBg />
            </div>
          </>
        )}

        {/* Groups */}
        {!loading && activeCategory === 'groups' && (
          <>
            <h2 className="text-4xl font-bold mb-2 border-b-2 border-purple-600 pb-2 tracking-tight">
              Group Metrics
            </h2>
            <p className="mb-6 text-gray-600">
              Overview of all groups with details including user counts, events, news, and incident reports.
            </p>
            <GroupsTable groups={groupMetrics} />
          </>
        )}

        {/* Users */}
        {!loading && activeCategory === 'users' && (
          <>
            <h2 className="text-4xl font-bold mb-2 border-b-2 border-indigo-600 pb-2 tracking-tight">
              User Metrics
            </h2>
            <p className="mb-6 text-gray-600">
              Manage users, view roles, and check users’ group assignments and check-in statuses.
            </p>
            <input
              type="text"
              placeholder="Search users by name..."
              className="mb-6 w-full max-w-md px-4 py-3 rounded-lg border border-indigo-400 bg-white text-indigo-900 placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <UsersTable users={userMetrics.filter(u => u.name?.toLowerCase().includes(searchQuery.toLowerCase()))} />
          </>
        )}

        {/* Events */}
        {!loading && activeCategory === 'events' && (
          <>
            <h2 className="text-4xl font-bold mb-2 border-b-2 border-pink-600 pb-2 tracking-tight">
              Event Metrics
            </h2>
            <p className="mb-6 text-gray-600">
              View all events across groups with details such as date, location, and associated group.
            </p>
            <EventsTable events={eventMetrics} onDelete={handleDeleteEvent} />
          </>
        )}

        {/* News */}
        {!loading && activeCategory === 'news' && (
          <>
            <h2 className="text-4xl font-bold mb-2 border-b-2 border-green-600 pb-2 tracking-tight">
              News Metrics
            </h2>
            <p className="mb-6 text-gray-600">
              Review published news stories for all groups and manage content.
            </p>
            <NewsTable news={newsMetrics} onDelete={handleDeleteNews} />
          </>
        )}

        {/* Incidents */}
        {!loading && activeCategory === 'incidents' && (
          <>
            <h2 className="text-4xl font-bold mb-2 border-b-2 border-red-600 pb-2 tracking-tight">
              Incident Reports
            </h2>
            <p className="mb-6 text-gray-600">
              Browse reported incidents with status and group details.
            </p>
            <IncidentsTable incidents={incidentMetrics} onDelete={handleDeleteIncident} />
          </>
        )}

        {/* Requests */}
        {!loading && activeCategory === 'requests' && (
          <>
            <h2 className="text-4xl font-bold mb-2 border-b-2 border-yellow-600 pb-2 tracking-tight">
              Requests
            </h2>
            <p className="mb-6 text-gray-600">
              View and manage pending user and group requests.
            </p>
            <RequestsView requests={requestMetrics} />
          </>
        )}

      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Sign Out</h2>
            <p className="mb-6">Are you sure you want to sign out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.visible && (
        <div
          className={`fixed bottom-8 right-8 px-7 py-4 rounded-lg shadow-lg font-semibold text-lg select-none
            ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} animate-fade-in`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

function MetricCard({ icon, title, value, onClick, whiteBg = false }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-gray-100 transition
        ${whiteBg ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-800 text-white hover:bg-gray-700'}
      `}
    >
      <i className={`fas fa-${icon} text-4xl mb-4 ${whiteBg ? 'text-gray-700' : 'text-gray-300'}`}></i>
      <span className="text-3xl font-bold">{value}</span>
      <span className={`mt-2 ${whiteBg ? 'text-gray-600' : 'text-gray-400'}`}>{title}</span>
    </button>
  );
}

function Table({ columns, rows, actions }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300 bg-white">
      <table className="min-w-full bg-white text-gray-900">
        <thead className="bg-indigo-100 text-indigo-900">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="py-3 px-6 text-left font-semibold uppercase tracking-wide whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {actions && <th className="py-3 px-6"></th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-6 text-gray-500 italic">
                No data found.
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className={`border-b border-gray-300 hover:bg-indigo-50 transition`}>
                {columns.map(col => (
                  <td key={col.key} className="py-3 px-6 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="py-3 px-6 text-right space-x-4">
                    {actions.map(({ label, onClick, color = 'red' }, idx) => (
                      <button
                        key={idx}
                        onClick={() => onClick(row)}
                        className={`text-${color}-600 hover:text-${color}-800 font-semibold focus:outline-none`}
                        title={label}
                      >
                        {label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function GroupsTable({ groups }) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'contact_email', label: 'Contact Email', render: g => g.contact_email || '—' },
    { key: 'users', label: 'Users Count', render: g => g.users?.length || 0 },
    { key: 'events', label: 'Events Count', render: g => g.events?.length || 0 },
    { key: 'news', label: 'News Count', render: g => g.news?.length || 0 },
    { key: 'reports', label: 'Incidents Count', render: g => g.reports?.length || 0 },
  ];

  return <Table columns={columns} rows={groups} />;
}

function UsersTable({ users }) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'group_id', label: 'Group ID' },
    { key: 'checked_in', label: 'Checked In', render: u => (u.checked_in ? 'Yes' : 'No') },
  ];

  return <Table columns={columns} rows={users} />;
}

function EventsTable({ events, onDelete }) {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'date', label: 'Date', render: e => new Date(e.date).toLocaleDateString() },
    { key: 'groupName', label: 'Group' },
  ];

  const actions = [
    { label: 'Delete', onClick: e => onDelete(e.id, e.groupId), color: 'red' },
  ];

  return <Table columns={columns} rows={events} actions={actions} />;
}

function NewsTable({ news, onDelete }) {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'published_at', label: 'Published', render: n => new Date(n.published_at).toLocaleDateString() },
    { key: 'groupName', label: 'Group' },
  ];

  const actions = [
    { label: 'Delete', onClick: n => onDelete(n.id, n.groupId), color: 'red' },
  ];

  return <Table columns={columns} rows={news} actions={actions} />;
}

function IncidentsTable({ incidents, onDelete }) {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'reported_at', label: 'Reported', render: i => new Date(i.reported_at).toLocaleDateString() },
    { key: 'groupName', label: 'Group' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    { label: 'Delete', onClick: i => onDelete(i.id, i.groupId), color: 'red' },
  ];

  return <Table columns={columns} rows={incidents} actions={actions} />;
}

function RequestsView({ requests }) {
  const { userRequests, groupRequests } = requests;

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">User Requests</h3>
      <Table
        columns={[
          { key: 'userName', label: 'User Name' },
          { key: 'userEmail', label: 'User Email' },
          { key: 'type', label: 'Request Type' },
          { key: 'requestedAt', label: 'Requested At', render: r => new Date(r.requestedAt).toLocaleString() },
        ]}
        rows={userRequests}
      />

      <h3 className="text-2xl font-semibold mt-8 mb-4">Group Requests</h3>
      <Table
        columns={[
          { key: 'groupName', label: 'Group Name' },
          { key: 'type', label: 'Request Type' },
          { key: 'requestedAt', label: 'Requested At', render: r => new Date(r.requestedAt).toLocaleString() },
        ]}
        rows={groupRequests}
      />
    </div>
  );
}

export default DashboardPage;
