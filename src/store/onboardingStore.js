import { create } from "zustand";

export const useOnboardingStore = create((set) => ({
  step: 1,
  data: {},

  nextStep: () =>
    set((state) => ({ step: state.step + 1 })),

  prevStep: () =>
    set((state) => ({ step: state.step - 1 })),

  updateData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
}));