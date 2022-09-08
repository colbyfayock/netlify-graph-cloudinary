import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getSecrets } from '@netlify/functions';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/Home.module.scss'

export default function Home({ resourcesA }) {
  const [resourcesB, setResourcesB] = useState();

  useEffect(() => {
    (async function run() {
      const { data } = await fetch('/api/resources', {
        method: 'POST',
        body: JSON.stringify({ folder: 'netlify-graph-cloudinary' })
      }).then(r => r.json());
      setResourcesB(data?.resources);
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

        <div className={styles.columns}>

          <div className={styles.column}>

            <h2 className={styles.heading}>getStaticProps</h2>

            <ul className={styles.resources}>
              {resourcesA?.map(({ asset_id, secure_url }) => {
                return (
                  <li key={asset_id} className={styles.card}>
                    <img src={secure_url} alt="" loading="lazy" />
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.heading}>/api/resources</h2>

            <ul className={styles.resources}>
              {resourcesB?.map(({ asset_id, secure_url }) => {
                return (
                  <li key={asset_id} className={styles.card}>
                    <img src={secure_url} alt="" loading="lazy" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  // const { v2: cloudinary } = await import('cloudinary');
  // const secrets = await getSecrets();

  // let resources;

  // if ( secrets.cloudinary?.bearerToken ) {
  //   const { cloud_name } = await fetch('https://api.cloudinary.com/v1_1/token/info', {
  //     headers: {
  //       Authorization: `Bearer ${secrets.cloudinary.bearerToken}`
  //     }
  //   }).then(r => r.json());

  //   cloudinary.config({
  //     cloud_name,
  //     oauth_token: secrets.cloudinary.bearerToken
  //   });

  //   const data = await cloudinary.search.expression(`folder=netlify-graph-cloudinary`).execute();
  //   resources = data?.resources;
  // }

  return {
    props: {
      resourcesA: []
    }
  }
}