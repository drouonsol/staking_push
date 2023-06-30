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
  
  import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
  import { FC, useEffect, useState } from "react"
  import * as anchor from "@project-serum/anchor"
  import { Account, createAssociatedTokenAccount, getAccount, getAssociatedTokenAddress } from "@solana/spl-token"
  import { CommentList } from "./CommentList"
  import { useConnection, useWallet } from "@solana/wallet-adapter-react"
  import { useWorkspace } from "../context/Anchor"
  import {  PublicKey } from "@solana/web3.js"
  import { Metaplex, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"
  import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
  import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
import { Idl, Program } from "@project-serum/anchor"
import { IDL } from "../context/Anchor/movie_review"

  
  
  export const Loading = () => {
  
  
    const wallet = useWallet()
    const workspace = useWorkspace()
    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const authoritykey =  new PublicKey("BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV")
    const programId = new PublicKey("9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU")
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))
    const [nftData, setNftData] = useState<any>()
    const [isLoading, setLoading] = useState(false)
    const tokensdaily = 10;
    let mintaccount: anchor.web3.PublicKey | undefined = undefined;
    const [tokensOwedMint, setTokensOwed] = useState<any>()
    const [minttokenaccount, setTknAccount] = useState<any>()
    const stakemint = new PublicKey("JA7kHW1Y8MLVdpngrFR6AcDaiPPHznYxwLpfXovWNZKe")
    
  
  
    let f = 1
    if (f == 1) {
      f =0
    const handleSubmit =  async () => {
  }
}
    return(
        <div>
          <div className="verticalalign" style={{justifyContent: "center",verticalAlign:"middle",textAlign:"center",alignItems:"center"}}>
            <div>
                <div style={{justifyContent:"center"}}>
             
                </div>

               <svg width="67.5" height="70" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="black">
    <rect y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.5s" dur="0.7s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.5s" dur="0.7s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="30" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.25s" dur="0.7s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.25s" dur="0.7s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="60" width="15" height="140" rx="6">
        <animate attributeName="height"
             begin="0s" dur="0.7s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0s" dur="0.7s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="90" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.25s" dur="0.7s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.25s" dur="0.7s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="120" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.5s" dur="0.7s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.5s" dur="0.7s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
</svg>
                <br/>
                </div>
            </div>
       </div>
    )
  }

