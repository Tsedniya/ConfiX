"use client";

import { useState } from "react";

export default function ApplyOrganizerForm() {
  const [form, setForm] = useState({
    organizationName: "",
    position: "",
    website: "",
    motivation: "",
    expectedEvents: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.organizationName.trim()) return "Organization name is required";
    if (!form.position.trim()) return "Position is required";
    if (!form.motivation.trim()) return "Please share your motivation";
    if (form.expectedEvents <= 0) return "Expected events must be greater than 0";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/organizer/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setSuccess(true);
      setForm({
        organizationName: "",
        position: "",
        website: "",
        motivation: "",
        expectedEvents: 0,
      });
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Apply as Organizer</h2>
          <p className="text-gray-600 mt-2">
            Join our team and help create amazing events
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Organization Name
            </label>
            <input
              type="text"
              placeholder="e.g. TechHub Community"
              value={form.organizationName}
              onChange={(e) => handleChange("organizationName", e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Position
            </label>
            <input
              type="text"
              placeholder="e.g. President, Event Lead, Community Manager"
              value={form.position}
              onChange={(e) => handleChange("position", e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Website / Social Link
            </label>
            <input
              type="url"
              placeholder="https://yourorganization.com"
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Expected Events */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Expected Events per Year
            </label>
            <input
              type="number"
              min="1"
              placeholder="12"
              value={form.expectedEvents}
              onChange={(e) => handleChange("expectedEvents", Number(e.target.value))}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Why do you want to become an organizer?
            </label>
            <textarea
              rows={5}
              placeholder="Tell us about your vision, experience, and what you want to bring to the community..."
              value={form.motivation}
              onChange={(e) => handleChange("motivation", e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y min-h-[120px]"
            />
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-100">
              ✅ Your application has been submitted successfully! We'll review it soon.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
          >
            {loading ? "Submitting Application..." : "Submit Application"}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        All applications are reviewed manually
      </p>
    </div>
  );
}