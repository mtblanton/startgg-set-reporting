import Image from 'next/image'
import styles from './page.module.css'
import { TournamentCard } from '@/components/TournamentCard'
import { getClient } from '@/api/queries/client';
import { GET_TOURNAMENTS_BY_OWNER } from '@/api/queries/getTournamentsByOwner';

export default async function Home() {
  const client = getClient();
  const {data} = await client.query<{ tournaments: { "__typename": 'Tournament', nodes: {"__typename": 'TournamentConnection', id: number, name: string; slug: string}[]}}>({ query: GET_TOURNAMENTS_BY_OWNER, variables: { perPage: 10, ownerId: process.env.TEST_OWNER_ID} })

  const tournamentNodes = data.tournaments.nodes;
  
  return (
    <main className={styles.main}>
      {tournamentNodes.map(node => <TournamentCard name={node.name} id={node.id} key={node.id}/>)}
    </main>
  )
}
