import { useGetDaoOverview } from "../../common/hooks/api/useGetDaoOverview";
import { useGetDiscourseParticipation } from "../../common/hooks/api/useGetDiscourseParticipation";
import { useGetDiscoursePosts } from "../../common/hooks/api/useGetDiscoursePosts";
import { formatResult } from "../../common/utils";

export const useGetOverviewData = () => {
  const { data: overviewData, isLoading: isLoadingDaoOverview } =
    useGetDaoOverview("792");

  const { data: discoursePostsData, isLoading: isLoadingDiscoursePosts } =
    useGetDiscoursePosts("106");

  return {
    isLoading: isLoadingDaoOverview || isLoadingDiscoursePosts,
    data: {
      overviewSummaryFacts: [
        {
          key: "TOTAL MEMBERS",
          value: formatResult(overviewData?.members),
        },
        {
          key: "NEW PROPOSALS",
          value: formatResult(overviewData?.new_proposals),
        },
        {
          key: "PROPOSALS PASSED",
          value: formatResult(overviewData?.new_passed),
        },
        {
          key: "NEW FORUM POSTS",
          value: formatResult(discoursePostsData?.count),
        },
      ],
      overviewGraph: [
        {
          title: "TOTAL MEMBERS",
          value: formatResult(overviewData?.members),
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "TOTAL NEW MEMBERS",
          value: formatResult(overviewData?.new_members),
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "ACTIVATION RATE",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
      ],
      activitySummaryFacts: [
        {
          key: "PASSED",
          value: formatResult(),
        },
        {
          key: "FAILED",
          value: formatResult(),
        },
        {
          key: "OPEN",
          value: formatResult(),
        },
        {
          key: "UNSPONSORED",
          value: formatResult(),
        },
        {
          key: "POSTED",
          value: formatResult(
            overviewData &&
              discoursePostsData &&
              overviewData.new_proposals + discoursePostsData.count
          ),
        },
      ],
    },
  };
};
