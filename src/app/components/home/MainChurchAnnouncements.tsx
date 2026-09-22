import React from "react";
import { ArrowRight, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { churchService } from "../../services/app.service";
import type { AnnouncementAPI } from "../../types/church.type";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";

export default function MainChurchAnnouncements() {
  const [announcements, setAnnouncements] = React.useState<AnnouncementAPI[]>([]);
  const [churchId, setChurchId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    churchService
      .getChurches({}, "")
      .then(async (response: any) => {
        const churches = Array.isArray(response)
          ? response
          : response?.churches || response?.data || [];
        const jerusalem = churches.find((church: any) =>
          /jerusalem|eyursalem/i.test(String(church?.name || "")),
        );

        if (!jerusalem?.id) return;

        const detailResponse = await churchService.getChurch(String(jerusalem.id));
        const church = detailResponse?.church || detailResponse;
        const latest = Array.isArray(church?.announcements)
          ? [...church.announcements].sort(
              (first, second) =>
                new Date(second.date).getTime() -
                new Date(first.date).getTime(),
            )
          : [];

        setChurchId(String(jerusalem.id));
        setAnnouncements(latest);
      })
      .catch((requestError) => {
        console.error("Failed to load Jerusalem announcements", requestError);
        setError("Could not load the latest church announcements.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-[#f8f7f2] border-y border-[#e5dfd0]">
        <LoadingState message="Loading church announcements..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-[#f8f7f2] border-y border-[#e5dfd0]">
        <div className="max-w-4xl mx-auto px-5">
          <ErrorState title="Announcements unavailable" message={error} />
        </div>
      </section>
    );
  }

  if (announcements.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#f8f7f2] border-y border-[#e5dfd0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[#9b7b12] text-sm font-semibold uppercase tracking-[0.18em]">
              <Bell className="w-4 h-4" />
              Addis Ababa Jerusalem Main Church
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#1a3c34]">
              Latest Announcements
            </h2>
            <p className="mt-2 text-[#5c5854]">
              Important updates from our main church, available at a glance.
            </p>
          </div>
          <Link
            to={churchId ? `/services/${churchId}#announcements` : "/services"}
            className="inline-flex items-center gap-2 text-[#80650a] font-semibold hover:text-[#1a3c34] transition-colors"
          >
            View all updates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {announcements.slice(0, 3).map((announcement) => (
            <article
              key={announcement.id}
              className="bg-white border border-[#e5dfd0] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ae8f05]">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[#1a3c34] line-clamp-2">
                {announcement.title || "Church Announcement"}
              </h3>
              {announcement.content && (
                <p className="mt-3 text-[#5c5854] leading-relaxed line-clamp-4 whitespace-pre-line">
                  {announcement.content}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
