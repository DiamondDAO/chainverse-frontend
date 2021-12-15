import useSWR from "swr";

export const useGetOverview = (id: number) => {
  const url = `/api/dao/${id}/overview`.trim();
  const { data, error } = useSWR(url);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
