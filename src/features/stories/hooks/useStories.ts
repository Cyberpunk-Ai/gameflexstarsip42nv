import { useQuery } from "@tanstack/react-query";

export function useStories(userId: string) {
  return useQuery({
    queryKey: ["stories", userId],
    queryFn: async () => {
      const { storiesService } = await import("@/services/stories/StoriesService");
      return storiesService.getStories(userId);
    },
    enabled: !!userId,
  });
}
