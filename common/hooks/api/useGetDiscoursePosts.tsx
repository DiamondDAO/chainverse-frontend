import useSWR from "swr";

export const useGetDiscoursePosts = (id: number) => {
  const url = `api/discourse/${id}/posts`.trim();
  const { data, error } = useSWR(url);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
