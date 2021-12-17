import useSWR from "swr";
import { URLFormatter } from "../../utils";

type DaoParticipationData = {
  id: number;
  member_new_proposals: number;
};

export const useGetDaoParticipation = (id: string) => {
  const { data, error } = useSWR<DaoParticipationData>(
    URLFormatter(`api/dao/${id}/participation`)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
