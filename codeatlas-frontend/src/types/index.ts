export interface Profile {
  userId: string;
  cfHandle: string;
  cfRating: number;
  cfMaxRating: number;
  cfRank: string;
  cfMaxRank: string;
  lcHandle: string;
  lcTotalSolved: number;
  lcTotalQuestions: number;
  lcEasySolved: number;
  lcMediumSolved: number;
  lcHardSolved: number;
  lcAcceptanceRate: number;
  lcRanking: number;
  college: string;
}
export interface UserHandle{
  userId: string;
    leetcodeUsername: string;
    codeforcesUsername: string;
    college: string ;
}