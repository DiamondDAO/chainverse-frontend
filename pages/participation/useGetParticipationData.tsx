import { useGetDaoOverview } from "../../common/hooks/api/useGetDaoOverview";
import { useGetDiscordOverview } from "../../common/hooks/api/useGetDiscordOverview";
import { useGetDiscourseParticipation } from "../../common/hooks/api/useGetDiscourseParticipation";
import { formatResult } from "../../common/utils";

export const useGetParticipationData = () => {
  const { data: overviewData, isLoading: isLoadingDaoOverview } =
    useGetDaoOverview("792");

  const {
    data: discourseParticipationData,
    isLoading: isLoadingDiscourseParticipation,
  } = useGetDiscourseParticipation("106");
  const { data: discordOverviewData, isLoading: isLoadingDiscordOverview } =
    useGetDiscordOverview("862918840890425355");
  return {
    isLoading:
      isLoadingDaoOverview ||
      isLoadingDiscourseParticipation ||
      isLoadingDiscordOverview,
    data: {
      overviewSummaryFacts: [
        {
          key: "ACTIVATED MEMBERS",
          value: formatResult(),
        },
        {
          key: "TOTAL MEMBERS",
          value: formatResult(overviewData?.members),
        },
      ],
      overviewGraph: [
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
        {
          title: "TOTAL DROPOFF %",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
      ],
      newMembersSummaryFacts: [
        {
          key: "MEMBERS WITH FIRST PROPOSAL INTERACTION",
          value: "-",
        },
        {
          key: "MEMBERS WITH FIRST FORUM POST",
          value: formatResult(discourseParticipationData?.first_posts),
        },
        {
          key: "MEMBERS WITH FIRST DISCORD POST",
          value: "-",
        },
        {
          key: "TOTAL ACTIVATED MEMBERS",
          value: "-",
        },
        {
          key: "TOTAL NEW MEMBERS",
          value: formatResult(overviewData?.new_members),
        },
      ],
      newMemberGraph: [
        {
          title: "ACTIVATION RATE",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "TOTAL NEW MEMBERS",
          value: formatResult(overviewData?.new_members),
          metric: "N/A COMPARED TO PREV 14D",
        },
      ],
      memberActivityGraph: [
        {
          title: "TOTAL PROPOSAL INTERACTIONS",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "TOTAL FORUM INTERACTIONS",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "TOTAL DISCORD MEMBERS",
          value: formatResult(discordOverviewData?.members),
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "MEMBERS WITH PROPOSAL INTERACTIONS",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "MEMBERS WITH FORUM INTERACTIONS",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
        {
          title: "MEMBERS WITH DISCORD ACTIVITY",
          value: "-",
          metric: "N/A COMPARED TO PREV 14D",
        },
      ],
    },
  };
};
