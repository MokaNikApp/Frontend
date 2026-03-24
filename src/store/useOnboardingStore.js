// /src/store/useOnboardingStore.js
import { create } from "zustand";

export const useOnboardingStore = create((set) => ({
  step: 1,
  userType: null,
  data: {
    name: "",
    email: "",
    phone: "",
  },

  setUserType: (type) => set({ userType: type }),

  nextStep: () =>
    set((state) => ({
      step: state.step + 1,
    })),

  prevStep: () =>
    set((state) => ({
      step: state.step - 1,
    })),

  updateData: (payload) =>
    set((state) => ({
      data: { ...state.data, ...payload },
    })),
}));