import Head from 'next/head';
import { getSecrets } from '@netlify/functions';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/Home.module.scss'

export default function Home({ resources }) {
  return (
    <Layout>
      <Head>
        <title>Cloudinary + Netlify Graph</title>
        <meta name="description" content="Simple Cloudinary auth with Netlify Graph" />
      </Head>

      <Container>
        <h1 className="sr-only">Cloudinary + Netlify Graph</h1>

        <h2 className={styles.heading}>Resources</h2>

        {/* <ul className={styles.items}>
          {artists.map(artist => {
            return (
              <a key={artist.id} href={artist.external_urls.spotify} className={styles.card}>
                {artist.images[0] && (
                  <img width={artist.images[0].width} height={artist.images[0].height} src={artist.images[0].url} alt="" />
                )}
                <h2>{ artist.name }</h2>
              </a>
            );
          })}
        </ul> */}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const secrets = await getSecrets();

  console.log('secrets', secrets)
  return {
    props: {
      artists,
      tracks
    }
  }
}