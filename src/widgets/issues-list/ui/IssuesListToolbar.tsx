import { CreateIssueButton } from "@/features/create-issue";

import {
  useIssuesStore,
} from '../model/context/useIssuesStore';


export const IssuesListToolbar = () => {
  const addIssue =
    useIssuesStore(
      (state) =>
        state.addIssue,
    );

  return (
    <CreateIssueButton
      onCreated={addIssue}
    />
  );
};
