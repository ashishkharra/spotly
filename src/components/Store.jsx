import { create } from 'zustand';

export const userAuth = create((set) => ({
    user: {},
    loading: true,
    fromGoogle: false,

    fetchUser: async () => {
        try {
            const response = await fetch('/api/validate', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                set({ user: data?.user, loading: false });
            } else {
                set({ user: null, loading: false });
            }
        } catch (error) {
            set({ user: null, loading: false });
        }
    },

    setUser: (userData) => {
        set((state) => ({
            ...state,
            user: { ...userData }
        }));
    },

    // setFromGoogle: (isGoogle) => {
    //     set((state) => {
    //         ...state,
    //         fromGoogle : { ...}
    //     })
    // },

    logout: () => {
        fetch('/api/sign-out', { method: 'POST', credentials: 'include' })
            .then(() => set({ user: null }))
            .catch(err => console.error("Logout failed:", err));
    },

    clearUser: () => {
        set({ user: null })
    }
}));