import { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../../constant/constant";

export default function UserLectures() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to top-left corner
    }, []);

    
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${serverURL}/api/guestLecture`);
        setLectures(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error("Failed to fetch guest lectures:", e);
        setLectures([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const upcoming = lectures.filter((lec) => !lec.done);
  const completed = lectures.filter((lec) => lec.done);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto pt-20 space-y-12">
        <PageHeader title="Guest Lectures" />
        <Section title="Upcoming Lectures" accent="red">
          <CardSkeletonGrid />
        </Section>
        <Section title="Completed Lectures" accent="green">
          <CardSkeletonGrid />
        </Section>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto pt-20 space-y-12">
      {/* Page Heading */}
      <PageHeader title="Guest Lectures" />

      {/* UPCOMING */}
      <Section title="Upcoming Lectures" accent="red">
        {upcoming.length === 0 ? (
          <EmptyState message="No upcoming guest lectures yet." />
        ) : (
          <CardGrid items={upcoming} highlight="#9B1C1C" />
        )}
      </Section>

      {/* COMPLETED */}
      <Section title="Completed Lectures" accent="green">
        {completed.length === 0 ? (
          <EmptyState message="No completed guest lectures yet." />
        ) : (
          <CardGrid items={completed} highlight="#16a34a" />
        )}
      </Section>
    </div>
  );
}

/* ---------- Page Header ---------- */
function PageHeader({ title }) {
  return (
    <div className="mb-8 mt-15 text-center">
      <h2 className="text-5xl font-bold text-[#9B1C1C]">{title}</h2>
    </div>
  );
}

/* ---------- Section Wrapper ---------- */
function Section({ title, children, accent = "red" }) {
  const accentColor =
    accent === "green" ? "bg-green-600" : "bg-[#9B1C1C]";

  return (
    <section className="bg-gray-50 rounded-2xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-6 w-1.5 rounded-full ${accentColor}`} />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ---------- Empty State ---------- */
function EmptyState({ message }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500 shadow-sm">
      {message}
    </div>
  );
}

/* ---------- Grid + Card ---------- */
function CardGrid({ items, highlight }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((lec) => (
        <LectureCard key={lec._id} lecture={lec} highlight={highlight} />
      ))}
    </div>
  );
}

function LectureCard({ lecture, highlight = "#9B1C1C" }) {
  const {
    topic,
    teacher,
    class: cls,
    venue,
    time,
    date,
    images,
    banner,
  } = lecture;

  const imgSrc = banner || images || "";
  const dateStr = toNiceDate(date);
  const timeStr = time || "—";

  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
      {/* Image */}
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={topic || "Guest lecture banner"}
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
            onError={(e) => {
              e.currentTarget.src =
                "https://dummyimage.com/800x450/ededed/666&text=Guest+Lecture";
            }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
        <div
          className="absolute top-3 left-3 text-xs font-semibold text-white px-2.5 py-1 rounded-full shadow"
          style={{ backgroundColor: highlight }}
        >
          {dateStr}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{topic}</h3>
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold text-gray-800">Teacher:</span>{" "}
          {teacher || "—"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <InfoRow label="Class" value={cls} />
          <InfoRow label="Venue" value={venue} />
          <InfoRow label="Time" value={timeStr} />
          <InfoRow label="Date" value={dateStr} />
        </div>

        <div className="mt-4">
          <span className="text-xs uppercase tracking-wide text-gray-500">
            Guest Lecture
          </span>
        </div>
      </div>
    </article>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-[64px] text-gray-500">{label}:</span>
      <span className="font-medium text-gray-900">{value || "—"}</span>
    </div>
  );
}

/* ---------- Skeleton ---------- */
function CardSkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="h-40 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
            <div className="h-8 bg-gray-200 rounded w-24 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Utils ---------- */
function toNiceDate(d) {
  const date = d ? new Date(d) : null;
  if (!date || isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
