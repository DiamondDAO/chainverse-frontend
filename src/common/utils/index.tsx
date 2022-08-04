export function truncateAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}
export function validURL(str: string) {  
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  
  const listOfUrl = str.split('https://').filter(x => x.length>0)
  const validUrl = listOfUrl.every(url => {
    if (!!pattern.test(`https://${url}`)) {
      return true
    }
    return false
  });
  return validURL;
}
export const filterUniqueObjects = (objectArray: any[], key: string) => {
  const tempArray = [];
  return objectArray?.filter((object) => {
    if (tempArray.includes(object[key])) {
      return false;
    } else {
      tempArray.push(object[key]);
      return true;
    }
  });
};

export const generateDateString = (date: Date) => {
  const month = date?.getUTCMonth() + 1; //months from 1-12
  const day = date?.getUTCDate();
  const year = date?.getUTCFullYear();

  return { month, day, year };
};

export const convertIPFSURLs = (url: string) => {
  if (url.slice(0, 4) === "ipfs") {
    return `https://ipfs.io/ipfs/${url.slice(7)}`;
  } else return url;
};
