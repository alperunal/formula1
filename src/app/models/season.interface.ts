export interface Season {
  round: string;
  grandPrix: {
    name: string;
    url: string;
  };
  raceWinner: {
    Driver: {
      code: string;
      givenName: string;
      familyName: string;
      url: string;
      isWinner?: boolean;
    };
    Constructor: {
      name: string;
      url: string;
    };
  };
  date: string;
  location: string;
}