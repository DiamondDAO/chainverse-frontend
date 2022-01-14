import { useGetDaoOverview } from "../../common/hooks/api/useGetDaoOverview";
import { useGetDiscoursePosts } from "../../common/hooks/api/useGetDiscoursePosts";
import { formatResult } from "../../common/utils";

export const useGetGovernanceData = () => {
  const { data: overviewData, isLoading: isLoadingDaoOverview } =
    useGetDaoOverview("792");
  const { data: discoursePostsData, isLoading: isLoadingDiscoursePosts } =
    useGetDiscoursePosts("106");

  return {
    isLoading: isLoadingDaoOverview || isLoadingDiscoursePosts,
    data: {
      overviewSummaryFacts: [
        {
          key: "PROPOSAL PASSED",
          value: formatResult(),
        },
        {
          key: "NEW PROPOSALS",
          value: formatResult(overviewData?.new_proposals),
        },
        {
          key: "NEW FORUM POSTS",
          value: formatResult(discoursePostsData?.count),
        },
      ],
      proposalActivitySummaryFacts: [
        {
          key: "PROPOSALS PASSED",
          value: formatResult(overviewData?.new_passed),
        },
        {
          key: "PROPOSALS FAILED",
          value: "-",
        },
        {
          key: "PROPOSALS POSTED",
          value: formatResult(overviewData?.new_proposals),
        },
        {
          key: "OPEN PROPOSALS",
          value: "-",
        },
        {
          key: "PROPOSALS W/O SPONSORS",
          value: "-",
        },
      ],
    },
  };
};
