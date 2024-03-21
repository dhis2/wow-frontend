type TagType = {
  name: string;
};
type BranchType = {
  name: string;
};

type ContributorType = {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  contributions: number;
};

export type RepoOwnerType =
  | "analytics"
  | "platform"
  | "tracker"
  | "android"
  | "training"
  | "backend"
  | "qa"
  | "ux"
  | "others"
  | "all"
  | "deprecated";

export type RepoType = {
  id: number;
  name: string;
  description: string;
  language?: string;
  html_url?: string;
  pushed_at?: string;
  topics?: string[];
  stargazers_count?: number;
  deprecated?: boolean;
  teamOwner?: RepoOwnerType;
  contributors?: Array<ContributorType>;
  tags?: Array<TagType>;
  branches?: Array<BranchType>;
  package?: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };

  /** inferred */
  isContinuouslyDelivered?: boolean;
  type?: "web-app" | "web-lib";
  lastTag?: string;
  isWebApp?: boolean
};
