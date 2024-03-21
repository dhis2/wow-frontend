import Layout from "@theme/Layout";
import styles from "./index.module.css";
import ReposList, { ReposProps } from "./ReposList";

const repos = (props: ReposProps) => {
  return (
    <Layout
      title="Projects List"
      description="All projects in DHIS2 organisation"
    >
      <main className={styles.main}>
        <ReposList repos={props.repos} />
      </main>
    </Layout>
  );
};

export default repos;
