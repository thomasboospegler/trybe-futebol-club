const allMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Internacional'
    }
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Ferroviária'
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann'
    }
  }
];

const newMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}

const matchBody = {
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
};

const equalsTeamsBody = {
  "homeTeamId": 8,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
};

const incorrectTeamsBody = {
  "homeTeamId": 99,
  "awayTeamId": 0,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
};

const editMatchBody = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}

export {
  allMatches,
  newMatch,
  matchBody,
  equalsTeamsBody,
  incorrectTeamsBody,
  editMatchBody,
}
