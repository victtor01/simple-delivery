import { create } from "zustand";

type StepStore = {
  step: number;
  increment: () => void;
};

const useStepStore = create<StepStore>((set) => ({
  step: 0,
  increment: () => set((prev) => ({ step: prev.step + 1 })),
}));

export { useStepStore };
