export function truncateAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export const URLFormatter = (url: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL ?? ""}${url}`.trim();
};

export const formatResult = (dataVal?: number) => {
  return dataVal?.toString() ?? "-";
};
