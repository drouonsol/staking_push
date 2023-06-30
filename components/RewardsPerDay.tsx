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
import { ClaimButton } from "./ClaimButton"

  
  
  export const RewardsPerDay = () => {
  
  
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
    const [tokensOwedMint, setTokensOwed] = useState<any>("0.00")
    const [minttokenaccount, setTknAccount] = useState<any>()
    const [stakedAmount, setStakeAmount] = useState<any>()
    const stakemint = new PublicKey("JA7kHW1Y8MLVdpngrFR6AcDaiPPHznYxwLpfXovWNZKe")
    
  
  
    let f = 1
    if (f == 1) {
      f =0
    const handleSubmit =  async () => {
  
        if (!publicKey || !workspace.program || !workspace.connection ) {
            return 
          }
          
          const [mintPda] = findProgramAddressSync(
            [publicKey.toBytes() ,Buffer.from("infamousstakingnew")],
            workspace.program.programId
          )
          
          const [accountstats] = findProgramAddressSync(
            [publicKey.toBytes() ,Buffer.from("stake_global2")],
            programId
          )
          const program = new Program(IDL as Idl, programId)
          const tokenAddress = await getAssociatedTokenAddress(stakemint, publicKey);
          let accounttokens = undefined;
           try {accounttokens = await program.account.userStakeInfo.fetch(accountstats) } catch(err) {

          }
          if ((typeof(accounttokens) != "undefined")) {
          let laststaked = Number(accounttokens.stakeStartTime)
          let stakeamount = accounttokens.stakedAmount
          setStakeAmount(stakeamount)
          let totaltokensowed = Number(stakeamount) * ((Date.now()/1000 - laststaked)/ 86000) * tokensdaily 
          const tokensowed = accounttokens.tokensOwed as string

         
          setTokensOwed((Number(tokensowed)/100 + totaltokensowed).toFixed(3))
         

         
        
        const getNewRate = () => {
            let totaltokensowed = Number((Number(stakeamount) * ((Date.now()/1000 - laststaked)/ 86000) * tokensdaily))

            setTokensOwed(((Number(tokensowed)/100 + totaltokensowed).toFixed(3)))

        }

        setInterval(getNewRate, 1000);
      }
    }

    handleSubmit();
  }
    return(
      <div className="statbar">
        <div>
      <span>
        <button>Wallet</button>
        
        <button>Staked</button>
      </span>
      </div>
      <span><h1>{tokensOwedMint} $INF</h1></span>
       </div>
    )
  }

