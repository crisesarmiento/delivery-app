import { IBranch } from "@/types";

export interface BranchesContainerProps {
  branches: IBranch[];
  onBranchClick: (branch: IBranch) => void;
}