import type { NextPage } from "next";
import React from "react";
import { ComingSoonCard } from "../components/ComingSoonCard";
import { Layout } from "../components/Layout";

const Governance: NextPage = () => {
  return (
    <Layout>
      <ComingSoonCard />
    </Layout>
  );
};

export default Governance;
