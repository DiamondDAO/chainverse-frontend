import useSWR from "swr";

export const useGetOverview = (id: number) => {
  const url = `${
    process.env.NEXT_PUBLIC_API_URL ?? ""
  }api/dao/${id}/overview`.trim();
  const { data, error } = useSWR(url);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
