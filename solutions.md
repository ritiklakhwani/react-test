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
