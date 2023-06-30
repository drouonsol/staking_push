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
import { ToastContainer, toast } from 'react-toast'
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
interface CustomProps {

}


export const ClaimButton: FC<CustomProps> = () => {


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
  let mintaccount: anchor.web3.PublicKey | undefined = undefined;
  const [programdebt, setProgramDebt] = useState(0)
  const [laststaked, setLastStaked] = useState(0)
  const [minttokenaccount, setTknAccount] = useState<any>()
  const [initCollection, setInitCollection] = useState(false);
  const stakemint = new PublicKey("JA7kHW1Y8MLVdpngrFR6AcDaiPPHznYxwLpfXovWNZKe")
  const [tokensOwedMint, setTokensOwed] = useState<any>("0.000")
  const [stakedAmount, setStakeAmount] = useState<any>()
  const tokensdaily = 10


  const Rewards =  async () => {
  
    if (!publicKey || !workspace.program || !workspace.connection ) {
        return 
      }
      setInitCollection(true)

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

      setProgramDebt(Number(tokensowed))
      setLastStaked(laststaked)
      if ((Number(tokensowed)/100 + totaltokensowed) <= 0) {
        setTokensOwed("0.00")
      } else {
      setTokensOwed((Number(tokensowed)/100 + totaltokensowed).toFixed(3))
      }


    

  }
}


const refreshget = async () => {
  if (!initCollection) {
    await Rewards()
  } 
  if (tokensOwedMint == "NaN") {
    
    setTokensOwed("0.000")
  }
  const getNewRate = () => {
    let totaltokensowed = Number((Number(stakedAmount) * ((Date.now()/1000 - laststaked)/ 86000) * tokensdaily))
  
    setTokensOwed(((Number(programdebt)/100 + totaltokensowed).toFixed(3)))
  1
  }

  setInterval(getNewRate, 2000);
}

refreshget()



  const handleSubmit =  async (event: any) => {

      if (!publicKey || !workspace.program || !workspace.connection ) {
          return 
        }
            const [mintPda] = findProgramAddressSync(
              [publicKey.toBytes() ,Buffer.from("infamousstakingnew")],
              workspace.program.programId
            )
            const tokenAddress = await getAssociatedTokenAddress(stakemint, publicKey);
    
            const [accountstats] = findProgramAddressSync(
              [publicKey.toBytes() ,Buffer.from("stake_global2")],
              programId
            )
            
         

            const ix = await workspace.program.methods
            .redeem()
            .accounts({
            stakeMint: stakemint,
            userStakeAta:  tokenAddress,

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
              toast.success('Claimed ' + tokensOwedMint + ' $INF', {
                backgroundColor: '#4BB543',
                color: '#fffffff',
          
              })
              Rewards();
              refreshget();
            } catch (e) {
              toast.error('Error:' + e, {
                color: '#fffffff',
          
              })
            }
          
 

            
  }

 



  return(
      <div>
      
      <button className="claimbutton" onClick={handleSubmit}><div className="rewardsestsection"><div className="tokensoweddisplay">{tokensOwedMint} $INF</div></div><h1 className="claimsection">CLAIM</h1></button>

     </div>
  )
}