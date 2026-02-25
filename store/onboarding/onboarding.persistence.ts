const STORAGE_PREFIX = "onboarding";

export type OnboardingDraft = {
  currentStep: number;
  accumulatedData: Record<string, unknown>;
};

/** Combina defaultValues con datos acumulados/draft para valores iniciales del formulario. */
export function mergeOnboardingDefaults(
  base: Record<string, unknown> | undefined,
  accumulated: Record<string, unknown> | undefined
): Record<string, unknown> {
  if (!accumulated || Object.keys(accumulated).length === 0) {
    return base ?? {};
  }
  return { ...base, ...accumulated };
}

function getStorageKey(partnerId: string, flowKey: string): string {
  return `${STORAGE_PREFIX}:${partnerId}:${flowKey}`;
}

export function getOnboardingDraft(
  partnerId: string,
  flowKey: string
): OnboardingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(getStorageKey(partnerId, flowKey));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingDraft;
    if (
      typeof parsed?.currentStep !== "number" ||
      typeof parsed?.accumulatedData !== "object" ||
      parsed.accumulatedData === null
    ) {
      return null;
    }
    return {
      currentStep: parsed.currentStep,
      accumulatedData: parsed.accumulatedData,
    };
  } catch {
    return null;
  }
}

export function saveOnboardingDraft(
  partnerId: string,
  flowKey: string,
  draft: OnboardingDraft
): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      getStorageKey(partnerId, flowKey),
      JSON.stringify(draft)
    );
  } catch {
    // ignore quota or serialization errors
  }
}

export function clearOnboardingDraft(
  partnerId: string,
  flowKey: string
): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(getStorageKey(partnerId, flowKey));
  } catch {
    // ignore
  }
}
