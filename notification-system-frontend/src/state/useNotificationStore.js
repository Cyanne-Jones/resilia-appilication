import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useNotificationStore = create(
  persist(
    set => ({
      notifications: [],
      addNotifications: (data) => set({ notifications: data }),
    }),
    {
      name: 'notification-storage'
    }
  )
);