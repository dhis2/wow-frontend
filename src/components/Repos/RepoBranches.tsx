import { RepoType } from "@site/src/types/repos";
import styles from "./index.module.css";

type RepoBranchesType = {
  repo: RepoType;
};

const RepoBranches = ({ repo }: RepoBranchesType) => {
  if (!repo.branches?.length) return <div className={styles.centered}>-</div>;

  const isContinuouslyDelivered = repo.tags?.[0]?.name?.match(/v10\d{1}\./i);

  return (
    <>
      <small>
        <div>
          {repo.branches.slice(0, 10).map((b, i) => {
            return (
              <>
                <a href={`${repo.html_url}/commits/${b.name}`}>{b.name}</a>
                {i < repo.branches.length - 1 ? ", " : <></>}
              </>
            );
          })}
        </div>
        <div>
          {isContinuouslyDelivered && (
            <i className="text--danger">* this app is on Continuous Delivery</i>
          )}
        </div>
      </small>
    </>
  );
};

export default RepoBranches;
