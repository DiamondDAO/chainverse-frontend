import useSWR from "swr";

export const useGetDiscoursePosts = (id: number) => {
  const url = `${
    process.env.NEXT_PUBLIC_API_URL ?? ""
  }api/discourse/${id}/posts`.trim();
  const { data, error } = useSWR(url);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
