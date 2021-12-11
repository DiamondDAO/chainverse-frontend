export const truncateAddress = (address: string) => {
  return address.substr(0, 4) + "..." + address.substr(address.length - 4);
};
