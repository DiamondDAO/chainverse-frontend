export const truncateAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(address.length - 4);
};

export const URLFormatter = (url: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL ?? ""}${url}`.trim();
};

export const formatResult = (dataVal?: number) => {
  return dataVal?.toString() ?? "-";
};
