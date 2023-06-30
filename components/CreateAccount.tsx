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

  
  
  export const CreateAccount = () => {
  
  
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
    
    const createAccount = async () => {
        if (!publicKey || !workspace.program || !workspace.connection ) {
          return 
        }
    
        const ix = await workspace.program.methods
        .createStakingAccount()
        .accounts({
        })
        .instruction()
        const transaction = new anchor.web3.Transaction()
        transaction.add(ix)
        try {
          let signature = await sendTransaction(transaction, workspace.connection)
          const latestBlockHash = await workspace.connection.getLatestBlockhash();
          await workspace.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: signature,
          });
          window.location.reload();
    
        } catch (e) {
         
          alert(JSON.stringify(e))
        }
    
      }
    
  
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
            <img className="nonftimg" src="https://media.discordapp.net/attachments/890670720705777785/1095263184606199848/godbackground.png?width=1316&height=658"></img>
            <h1 style={{fontFamily:"Oswald",fontSize:"200%",textTransform:"uppercase",fontWeight:"bolder",padding:"3px"}}>Hey. You need a staking account</h1>
    
    
            <button className="utilitybutton2" onClick={createAccount}>Create Staking Account</button>
                </div>
            </div>
       </div>
    )
  }

