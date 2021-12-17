import useSWR from "swr";
import { URLFormatter } from "../../utils";

type DaoOverviewData = {
  id: number;
  members: number;
  new_members: number;
  total_proposals: number;
  new_proposals: number;
  new_passed: number;
};

export const useGetDaoOverview = (id: string) => {
  const { data, error } = useSWR<DaoOverviewData>(
    URLFormatter(`api/dao/${id}/overview`)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
