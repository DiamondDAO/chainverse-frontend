import useSWR from "swr";
import { URLFormatter } from "../../utils";
type DiscourseParticipationData = {
  category_id: number;
  first_posts: number;
};
export const useGetDiscourseParticipation = (id: string) => {
  const { data, error } = useSWR<DiscourseParticipationData>(
    URLFormatter(`api/discourse/${id}/participation`)
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
