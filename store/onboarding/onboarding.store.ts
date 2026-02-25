import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type OnboardingProgressStatus =
  | "draft"
  | "in_progress"
  | "completed"
  | "rejected"
  | "abandoned";

export type OnboardingStoreState = {
  currentStep: number;
  accumulatedData: Record<string, unknown>;
  isValidationPending: boolean;
  progressStatus: OnboardingProgressStatus;
};

export type OnboardingStoreActions = {
  setCurrentStep: (step: number) => void;
  setAccumulatedData: (data: Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>)) => void;
  setValidationPending: (pending: boolean) => void;
  setProgressStatus: (status: OnboardingProgressStatus) => void;
  /** Hidrata el store con un draft (ej. desde sessionStorage al montar el flujo). */
  hydrateFromDraft: (draft: { currentStep: number; accumulatedData: Record<string, unknown> }) => void;
  reset: () => void;
};

const initialState: OnboardingStoreState = {
  currentStep: 1,
  accumulatedData: {},
  isValidationPending: false,
  progressStatus: "draft",
};

export type OnboardingStore = OnboardingStoreState & OnboardingStoreActions;

export const useOnboardingStore = create<OnboardingStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setCurrentStep: (currentStep) =>
        set({ currentStep }, undefined, "onboarding/setCurrentStep"),

      setAccumulatedData: (data) =>
        set(
          (state) => ({
            accumulatedData:
              typeof data === "function" ? data(state.accumulatedData) : data,
          }),
          undefined,
          "onboarding/setAccumulatedData"
        ),

      setValidationPending: (isValidationPending) =>
        set({ isValidationPending }, undefined, "onboarding/setValidationPending"),

      setProgressStatus: (progressStatus) =>
        set({ progressStatus }, undefined, "onboarding/setProgressStatus"),

      hydrateFromDraft: (draft) =>
        set(
          {
            currentStep: draft.currentStep,
            accumulatedData: draft.accumulatedData ?? {},
          },
          undefined,
          "onboarding/hydrateFromDraft"
        ),

      reset: () => set(initialState, undefined, "onboarding/reset"),
    }),
    { name: "OnboardingStore" }
  )
);
