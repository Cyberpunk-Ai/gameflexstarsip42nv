import { useQuery } from "@tanstack/react-query";

export function useTeams(userId: string) {
  return useQuery({
    queryKey: ["teams", userId],
    queryFn: async () => {
      const { teamsService } = await import("@/services/teams/TeamsService");
      return teamsService.getTeams(userId);
    },
    enabled: !!userId,
  });
}
