import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getSecrets } from '@netlify/functions';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/Home.module.scss'

export default function Home({ cloudName }) {
  const [resources, setResources] = useState();

  console.log('resources', resources)

  useEffect(() => {
    (async function run() {
      const { data } = await fetch('/api/resources', {
        method: 'POST',
        body: JSON.stringify({ folder: 'netlify-plugin-cloudinary' })
      }).then(r => r.json());
      setResources(data?.resources);
    })()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Cloudinary + Netlify Graph</title>
        <meta name="description" content="Simple Cloudinary auth with Netlify Graph" />
      </Head>

      <Container>
        <h1 className="sr-only">Cloudinary + Netlify Graph</h1>

        <h2 className={styles.heading}>Resources from My Cloud</h2>

        <div className={styles.grid}>
          {resources?.map(({ asset_id, secure_url }) => {
            return (
              <div key={asset_id} className={styles.card}>
                <img src={secure_url} />
              </div>
            )
          })}
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const secrets = await getSecrets();

  console.log('secrets', secrets)

  const { cloud_name: cloudName } = await fetch('https://api.cloudinary.com/v1_1/token/info', {
    headers: {
      Authorization: `Bearer ${secrets.cloudinary.bearerToken}`
    }
  }).then(r => r.json());

  return {
    props: {
      cloudName
    }
  }
}