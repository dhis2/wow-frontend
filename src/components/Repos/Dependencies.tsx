import { RepoType } from "@site/src/types/repos";
import styles from "./index.module.css";

type RepoDependenciesPropsType = {
  packageFile: RepoType["package"];
};

const RepoDependencies = ({ packageFile }: RepoDependenciesPropsType) => {
  if (!packageFile) return <div className={styles.centered}>-</div>;

  const dependencies = Object.entries(packageFile.dependencies ?? {}).filter(
    ([dep, version]) => dep.match(/dhis/)
  );
  const devDependencies = Object.entries(
    packageFile.devDependencies ?? {}
  ).filter(([dep, version]) => dep.match(/dhis/));

  const noDependencies = !dependencies?.length && !devDependencies.length;

  if (noDependencies) return <div className={styles.centered}>-</div>;

  return (
    <div className={styles.dependenciesListContainer}>
      {!!dependencies?.length && (
        <div>
          <h1>Dependencies</h1>
          {dependencies.map(([dep, version]) => {
            return (
              <div>
                {dep}@{version}
              </div>
            );
          })}
        </div>
      )}
      {!!devDependencies?.length && (
        <div>
          <br />
          <h1>Dev Dependencies</h1>
          {devDependencies.map(([dep, version]) => {
            return (
              <div>
                {dep}@{version}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RepoDependencies;
