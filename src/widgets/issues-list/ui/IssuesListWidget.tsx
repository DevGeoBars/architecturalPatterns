import { type FC } from 'react';

import type { IIssueApi } from "@/entities/issue";

import { IssuesListStoreProvider } from "../model/context/IssuesListStoreProvider";
import { IssuesList } from "./IssuesList";


type IssuesListWidgetProps = {
  issueApi: IIssueApi;
};

export const IssuesListWidget: FC<IssuesListWidgetProps> = ({ issueApi }) => {
  return (
    <IssuesListStoreProvider issueApi={issueApi}>
      <IssuesList />
    </IssuesListStoreProvider>
  );
};
