
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token?{Authorization:`Bearer ${token}`}:{}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  return res;
}