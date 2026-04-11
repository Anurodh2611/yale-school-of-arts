import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Events() {
  const { role, isLoggedIn } = useAuth();
  const isAdmin = role === 'admin';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Add-event form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', date: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch('http://localhost:5000/api/events');
      if (!res.ok) throw new Error('Failed to load events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setFetchError(err.message || 'Could not load events. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setFormSuccess('✅ Event created successfully!');
        setFormData({ title: '', description: '', date: '' });
        setShowForm(false);
        fetchEvents(); // Refresh list
      } else {
        setFormError(data.error || 'Failed to create event');
      }
    } catch (err) {
      setFormError('Network error. Is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  // Format date as "MMM DD"
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      day: d.getDate()
    };
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 mt-12 min-h-[60vh]">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-12">
        <h1 className="text-7xl md:text-9xl font-black border-4 border-[var(--color-border)] border-dashed bg-[var(--color-background)] inline-block px-8 py-2 transform -translate-x-4 shadow-[10px_10px_0_0_var(--color-border)]">
          EVENTS
        </h1>

        {/* Admin: Add Event button */}
        {isAdmin && (
          <button
            onClick={() => { setShowForm(prev => !prev); setFormError(''); setFormSuccess(''); }}
            className="mt-4 px-6 py-3 font-black uppercase text-lg border-4 border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text-light)] brutal-shadow hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
          >
            {showForm ? '✕ Cancel' : '+ Add Event'}
          </button>
        )}
      </div>

      {/* Success message after creating event */}
      {formSuccess && (
        <div className="mb-6 p-4 bg-green-600 text-white font-bold border-4 border-black uppercase">
          {formSuccess}
        </div>
      )}

      {/* Admin: Add Event Form */}
      {isAdmin && showForm && (
        <div className="mb-10 p-8 border-4 border-[var(--color-border)] bg-[var(--color-surface)] brutal-shadow">
          <h2 className="text-3xl font-black uppercase mb-6 text-[var(--color-primary)]">New Event</h2>
          {formError && (
            <div className="mb-4 p-3 bg-red-600 text-white font-bold border-4 border-black uppercase text-sm">
              {formError}
            </div>
          )}
          <form onSubmit={handleAddEvent} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase text-[var(--color-text-primary)]">Title</label>
              <input
                name="title"
                required
                value={formData.title}
                onChange={handleFormChange}
                placeholder="EVENT TITLE"
                className="p-3 border-4 border-[var(--color-border)] bg-gray-50 text-black font-bold focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase text-[var(--color-text-primary)]">Date</label>
              <input
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleFormChange}
                className="p-3 border-4 border-[var(--color-border)] bg-gray-50 text-black font-bold focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase text-[var(--color-text-primary)]">Description</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleFormChange}
                placeholder="DESCRIBE THE EVENT..."
                className="p-3 border-4 border-[var(--color-border)] bg-gray-50 text-black font-bold focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 p-4 text-xl font-bold uppercase border-4 border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text-light)] brutal-shadow hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-60"
            >
              {submitting ? 'Saving...' : 'Create Event'}
            </button>
          </form>
        </div>
      )}

      {/* Events list */}
      {loading && (
        <p className="text-2xl font-bold uppercase text-[var(--color-text-primary)] animate-pulse">
          Loading events...
        </p>
      )}

      {fetchError && (
        <div className="p-4 border-4 border-red-600 bg-red-50 text-red-700 font-bold uppercase">
          {fetchError}
        </div>
      )}

      {!loading && !fetchError && events.length === 0 && (
        <div className="p-8 border-4 border-[var(--color-border)] border-dashed text-center">
          <p className="text-2xl font-bold uppercase text-[var(--color-text-primary)]">
            No events yet.{isAdmin ? ' Create one above!' : ' Check back later.'}
          </p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="flex flex-col gap-8">
          {events.map((event) => {
            const { month, day } = formatDate(event.date);
            return (
              <div
                key={event._id}
                className="flex flex-col md:flex-row border-[6px] border-[var(--color-border)] brutal-shadow-hover bg-[var(--color-surface)] hover:bg-[var(--color-accent)] transition-all"
              >
                <div className="bg-[var(--color-primary)] text-[var(--color-text-light)] p-6 md:w-48 flex justify-center items-center flex-col uppercase font-black">
                  <span className="text-xl">{month}</span>
                  <span className="text-5xl">{day}</span>
                </div>
                <div className="p-6 md:p-10 flex-1">
                  <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-[var(--color-primary)]">
                    {event.title}
                  </h2>
                  {event.createdBy?.username && (
                    <p className="text-lg font-bold font-mono uppercase mb-2 text-gray-500">
                      By {event.createdBy.username}
                    </p>
                  )}
                  <p className="mt-4 text-lg border-t-4 border-[var(--color-border)] pt-4">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
