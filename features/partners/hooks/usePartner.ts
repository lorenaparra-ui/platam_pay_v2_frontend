import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Partner } from "../interfaces";
import { partnerService } from "../services/partners.service";

export const partnerKeys = {
  all: ["partners"] as const,
  detail: (id: string) => [...partnerKeys.all, "detail", id] as const,
};

export const usePartner = (
  partnerId: string,
  options?: Omit<UseQueryOptions<Partner, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Partner, Error>({
    queryKey: partnerKeys.detail(partnerId),
    queryFn: () => partnerService.getById(partnerId),
    enabled: !!partnerId,
    ...options,
  });
};
