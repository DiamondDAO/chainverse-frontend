import useSWR from "swr";
import { URLFormatter } from "../../utils";

type DiscordOverviewData = {
  guild: number;
  members: number;
  new_members: number;
};
export const useGetDiscordOverview = (id: string) => {
  const { data, error } = useSWR<DiscordOverviewData>(
    URLFormatter(`api/discord/${id}/overview`)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
