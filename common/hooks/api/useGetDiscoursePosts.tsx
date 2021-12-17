import useSWR from "swr";
import { URLFormatter } from "../../utils";
type DiscoursePostsData = {
  category_id: number;
  count: number;
};
export const useGetDiscoursePosts = (id: string) => {
  const { data, error } = useSWR<DiscoursePostsData>(
    URLFormatter(`/api/discourse/${id}/posts`)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
