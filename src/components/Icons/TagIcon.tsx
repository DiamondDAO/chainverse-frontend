import { IconVariants } from "@/common/types";

export const TagIcon = ({
  variant = IconVariants.Default,
}: {
  variant?: IconVariants;
}) => {
  switch (variant) {
    case IconVariants.White:
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.26039 6.94368L6.83011 2.37396C7.10257 2.1015 7.46749 1.94141 7.85248 1.92544L10.5899 1.8119C11.4875 1.77466 12.2253 2.51246 12.188 3.41009L12.0745 6.14746C12.0585 6.53245 11.8984 6.89737 11.626 7.16983L7.05626 11.7395C6.45646 12.3393 5.48401 12.3393 4.88422 11.7395L2.26039 9.11572C1.6606 8.51593 1.6606 7.54347 2.26039 6.94368Z"
            stroke="white"
          />
          <circle cx="9.13811" cy="4.4887" r="0.939868" stroke="white" />
        </svg>
      );
    case IconVariants.Black:
    default:
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.26039 6.94368L6.83011 2.37396C7.10257 2.1015 7.46749 1.94141 7.85248 1.92544L10.5899 1.8119C11.4875 1.77466 12.2253 2.51246 12.188 3.41009L12.0745 6.14746C12.0585 6.53245 11.8984 6.89737 11.626 7.16983L7.05626 11.7395C6.45646 12.3393 5.48401 12.3393 4.88422 11.7395L2.26039 9.11572C1.6606 8.51593 1.6606 7.54347 2.26039 6.94368Z"
            stroke="black"
          />
          <circle cx="9.13811" cy="4.4887" r="0.939868" stroke="black" />
        </svg>
      );
  }
};
