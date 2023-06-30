
import { Center, Box, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { AppBar } from '../components/AppBar'
import { FetchNfts } from '../components/FetchNfts'

import styles from '../styles/Home.module.css'
import { ClaimButton } from '../components/ClaimButton'
import { AppFooter } from '../components/AppFooter'
import { ToastContainer } from 'react-toast'

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Stake Wolves.</title>
        <meta name="description" content="Stake Your Wolves And Earn Rewards"></meta>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Climate+Crisis&family=Oswald&family=Permanent+Marker&display=swap" rel="stylesheet" />
      </Head>

      <AppBar />
      <Center>
     
        <Box>
        
          <FetchNfts />
        
          <ToastContainer position='top-right'/>
          
        </Box>
      </Center>
      <AppFooter />  
    </div>
  )
}

export default Home
