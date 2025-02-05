export const getMaxDate = () => {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 13);
  return now.toISOString().split("T")[0];
};

export const leaderBoardRanking = () => {};
