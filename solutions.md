ritik lakhwani

Q6 
solution - async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await apiFetch("/profile/settings", {
      method: "PUT",
      body: JSON.stringify({
        name,
        bio // Q6 bio is getting saved now
      }),
    });
    if (!res.ok) {
      setMessage("Save failed");
      return;
    }
    setMessage("Saved");
    await refreshUser();
  }

  Q3 
  solution - useEffect(() => {
    void loadPosts();
  }, [loadPosts]); // Q3 after this the clicking on save draft posts are being loaded saved


  Q3
  solution - const onDelete = async (id: string) => {
    const res = await apiFetch("/posts/" + id, { method: "DELETE" });
    if (!res.ok) {
      setError("Delete failed");
      return;
    }
    const remainingPosts = posts.filter((p) => p.id !== id) //1
    setPosts(remainingPosts) // Q3 delete is also working after adding these 2 lines 2
  };

  Q1 
  solution - 
  const logout = useCallback(() => {
    clearToken(); // same key shouldd be used in like api
    setUser(null);
    setTokenState(null);
  }, []); // logs out successfully


  Q4
  solution - function clientFilterPosts(posts: Post[], q1: string): Post[] {
  const q = q1.toLowerCase()// Q4 searching problem solution
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
