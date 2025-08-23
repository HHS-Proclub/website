"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import NewsCard from "@/components/NewsCard";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function AdminClient() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Auth + admin guard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (!u) {
          setIsAdmin(false);
          setAuthChecked(true);
          router.replace("/");
          return;
        }
        setUserId(u.uid);
        const userDoc = await getDoc(doc(db, "users", u.uid));
        const admin = !!userDoc.data()?.isAdmin;
        setIsAdmin(admin);
        setAuthChecked(true);
        if (!admin) router.replace("/");
      } catch (e) {
        console.error(e);
        setIsAdmin(false);
        setAuthChecked(true);
        router.replace("/");
      }
    });
    return () => unsub();
  }, [router]);

  // Load news when authorized
  useEffect(() => {
    if (!authChecked || !isAdmin) return;
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "news"), orderBy("date", "desc"));
        const snap = await getDocs(q);
        const docs = snap.docs.map((d) => {
          const data = d.data();
          const rawDate = data?.date;
          let formattedDate = "";
          if (rawDate && typeof rawDate.toDate === "function") {
            formattedDate = rawDate.toDate().toISOString().slice(0, 10);
          } else if (
            rawDate &&
            typeof rawDate === "object" &&
            "seconds" in rawDate
          ) {
            formattedDate = new Date(rawDate.seconds * 1000)
              .toISOString()
              .slice(0, 10);
          } else if (typeof rawDate === "string") {
            formattedDate = rawDate;
          } else if (typeof rawDate === "number") {
            formattedDate = new Date(rawDate).toISOString().slice(0, 10);
          }
          return { id: d.id, ...data, date: formattedDate };
        });
        if (isMounted) setItems(docs);
      } catch (e) {
        console.error(e);
        if (isMounted) setError("Failed to load news.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [authChecked, isAdmin]);

  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) || null,
    [items, selectedId]
  );

  useEffect(() => {
    if (selected) {
      setForm({
        title: selected.title || "",
        date: selected.date || "",
        text: selected.text || "",
      });
    } else {
      setForm({ title: "", date: "", text: "" });
    }
  }, [selectedId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const saveNews = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        text: form.text.trim(),
        date: form.date
          ? Timestamp.fromDate(new Date(form.date))
          : serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (!payload.title || !payload.text)
        throw new Error("Title and text are required");
      if (selectedId) {
        await updateDoc(doc(db, "news", selectedId), payload);
      } else {
        await addDoc(collection(db, "news"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      // Refresh list
      const q = query(collection(db, "news"), orderBy("date", "desc"));
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => {
        const data = d.data();
        const rawDate = data?.date;
        let formattedDate = "";
        if (rawDate && typeof rawDate.toDate === "function") {
          formattedDate = rawDate.toDate().toISOString().slice(0, 10);
        } else if (
          rawDate &&
          typeof rawDate === "object" &&
          "seconds" in rawDate
        ) {
          formattedDate = new Date(rawDate.seconds * 1000)
            .toISOString()
            .slice(0, 10);
        } else if (typeof rawDate === "string") {
          formattedDate = rawDate;
        } else if (typeof rawDate === "number") {
          formattedDate = new Date(rawDate).toISOString().slice(0, 10);
        }
        return { id: d.id, ...data, date: formattedDate };
      });
      setItems(docs);
      setSelectedId(null);
      setForm({ title: "", date: "", text: "" });
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to save news.");
    } finally {
      setSaving(false);
    }
  };

  const removeNews = async () => {
    if (!isAdmin || !selectedId) return;
    setSaving(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "news", selectedId));
      setItems((prev) => prev.filter((x) => x.id !== selectedId));
      setSelectedId(null);
      setForm({ title: "", date: "", text: "" });
    } catch (e) {
      console.error(e);
      setError("Failed to delete news.");
    } finally {
      setSaving(false);
    }
  };

  if (!authChecked) {
    return <Card className="p-4">Checking permissions...</Card>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-2">
        <button
          type="button"
          className="w-full rounded-md border border-[var(--brand)] text-[var(--foreground)] px-3 py-2 text-sm font-medium hover:bg-[var(--brand)] hover:text-black"
          onClick={() => {
            setSelectedId(null);
            setForm({ title: "", date: "", text: "" });
          }}
        >
          + Add News
        </button>
        <div className="space-y-2 max-h-[60vh] overflow-auto pr-1">
          {loading ? (
            <Card className="p-4 text-sm">Loading...</Card>
          ) : items.length === 0 ? (
            <Card className="p-4 text-sm">No news yet.</Card>
          ) : (
            items.map((n) => (
              <button
                key={n.id}
                className={`w-full text-left ${
                  selectedId === n.id ? "ring-1 ring-[var(--brand)]" : ""
                }`}
                onClick={() => setSelectedId(n.id)}
              >
                <NewsCard title={n.title} date={n.date} text={n.text} />
              </button>
            ))
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">
            {selected ? "Edit News" : "Add News"}
          </h3>
          {error && (
            <div className="mb-3 rounded-md border border-red-500 bg-red-500/10 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <form onSubmit={saveNews} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Title</label>
              <input
                name="title"
                type="text"
                className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                value={form.title}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Date</label>
              <input
                name="date"
                type="date"
                className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                value={form.date}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Text</label>
              <textarea
                name="text"
                rows={6}
                className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                value={form.text}
                onChange={onChange}
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center rounded-md bg-[var(--brand)] text-black px-4 py-2 text-sm font-medium hover:bg-[var(--brand-hover)] disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : selected
                  ? "Save Changes"
                  : "Create News"}
              </button>
              {selected && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={removeNews}
                  className="inline-flex items-center rounded-md border border-red-500 text-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500/10 disabled:opacity-50"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
