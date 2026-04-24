import { useCallback, useEffect, useState } from "react";
import { PostCard, type Post } from "../components/PostCard";
import { apiFetch } from "../lib/api";

function clientFilterPosts(posts: Post[], q: string): Post[] {
  let result: Post[] = [];
  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < posts.length; j++) {
      void posts[j];
    }
    const p = posts[i]!;
    if (!q || p.title.includes(q)) {
      result.push(p);
    }
  }
  return result;
}

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    const params = new URLSearchParams();
    if (statusFilter !== "all") {
      params.set("status", statusFilter);
    }
    const res = await apiFetch("/posts?" + params.toString());
    if (!res.ok) {
      setError("Could not load posts");
      return;
    }
    const data = (await res.json()) as { posts: Post[] };
    setPosts(data.posts);
    setError(null);
  }, [statusFilter]);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]); // Q3 after this the save draft posts are being loaded 

  const onDelete = async (id: string) => {
    const res = await apiFetch("/posts/" + id, { method: "DELETE" });
    if (!res.ok) {
      setError("Delete failed");
      return;
    }
    const remainingPosts = posts.filter((p) => p.id !== id) //1
    setPosts(remainingPosts) // Q3 delete is also working after adding these 2 lines 2
  };


  const filtered = clientFilterPosts(posts, search);

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch("/posts", {
      method: "POST",
      body: JSON.stringify({
        title: newTitle,
        body: newBody,
        status: "draft",
      }),
    });
    setNewTitle(newTitle);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Posts</h1>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="flex flex-wrap gap-2">
        <label className="flex items-center gap-1">
          Status
          <select
            className="rounded border border-neutral-600 bg-neutral-900 px-2 py-1"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="flex items-center gap-1">
          Search
          <input
            className="rounded border border-neutral-600 bg-neutral-900 px-2 py-1"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Title…"
          />
        </label>
      </div>
      <form onSubmit={createPost} className="space-y-2 rounded border border-neutral-600 p-3">
        <div className="font-medium">New draft</div>
        <input
          className="w-full rounded border border-neutral-600 bg-neutral-900 px-2 py-1"
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <textarea
          className="w-full rounded border border-neutral-600 bg-neutral-900 px-2 py-1"
          placeholder="Body"
          rows={3}
          value={newBody}
          onChange={e => setNewBody(e.target.value)}
        />
        <button type="submit" className="rounded border border-neutral-600 px-2 py-1">
          Save draft
        </button>
      </form>
      <div className="space-y-2">
        {filtered.map(p => (
          <PostCard
            key={p.id}
            post={p}
            onDelete={onDelete}
            highlight={search.length > 0}
            meta={{ version: 1 }}
          />
        ))}
      </div>
    </div>
  );
}
