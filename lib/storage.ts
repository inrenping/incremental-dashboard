const IS_SERVER = typeof window === "undefined";

export const storage = {
  set(key: string, value: unknown) {
    if (IS_SERVER) return;
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  },

  get(key: string) {
    if (IS_SERVER) return null;
    return localStorage.getItem(key);
  },

  getJson<T>(key: string): T | null {
    const value = this.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    if (IS_SERVER) return;
    localStorage.removeItem(key);
  },

  clearAuth() {
    if (IS_SERVER) return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpires");
  },
};
