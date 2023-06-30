import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

import {
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    FormControl,
  } from "@chakra-ui/react"
  import * as anchor from "@project-serum/anchor"
  import { getAssociatedTokenAddress } from "@solana/spl-token"
  import { CommentList } from "./CommentList"
  import { useConnection, useWallet } from "@solana/wallet-adapter-react"
  import { useWorkspace } from "../context/Anchor"
import { PublicKey } from "@solana/web3.js"
import { Metadata, Metaplex, Mint, Nft, NftEdition, NftWithToken, Sft, SftWithToken, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"




export const AppBar: FC = () => {
    const [nftData, setNftData] = useState<any | null>(null);
const [connectwallet, setWalletConnect] = useState([])
const [stakedNftData, setStakedNftData] =  useState<any | null>(null);
const wallet = useWallet();
const workspace = useWorkspace()
const [claimDisplay, setClaimDisplay] = useState(<></>) 
const { publicKey, sendTransaction } = useWallet();
const { connection } = useConnection()




    return (
        <div className={styles.AppHeader}>
           <div>   <h1 style={{fontFamily:"Oswald",fontSize:"100%",fontWeight: 800}}><a className="infbrand">INF</a></h1></div>
            <span></span>
            <WalletMultiButton />
        </div>
    )
}