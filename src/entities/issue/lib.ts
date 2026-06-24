export const getIssueStatus = (data: {completed: "CLOSED" | "OPENED"}) => {
    return data.completed ? "CLOSED" : "OPENED";
};