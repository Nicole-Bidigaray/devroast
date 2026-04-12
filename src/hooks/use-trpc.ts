import { useTRPC as useTRPCContext } from "@/trpc/client";

export function useTRPC() {
  return useTRPCContext();
}
