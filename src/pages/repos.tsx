import Layout from "@theme/Layout";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { usePluginData } from "@docusaurus/useGlobalData";
import ReposList, { ReposProps } from "../components/Repos/ReposList";

const repos = () => {
  const { siteConfig } = useDocusaurusContext();
  const repos = usePluginData("github-repos");

  return (
    <Layout title={`${siteConfig.title}`} description="DHIS2 Web Academy">
      <main className={styles.repoMain}>
        <ReposList repos={repos} />
      </main>
    </Layout>
  );
};

export default repos;
