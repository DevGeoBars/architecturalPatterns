export const getIssueStatus = (data: any) => {
    return data.completed ? "CLOSED" : "OPENED";
};