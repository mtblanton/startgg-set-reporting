import { gql } from "@apollo/client";

export const GET_EVENTS_IN_TOURNAMENT = gql`
  query EventsInTournament($tournamentId: ID!) {
    tournament(id: $tournamentId) {
      id
      name
      events {
        name
        id
      }
    }
  }
`;
