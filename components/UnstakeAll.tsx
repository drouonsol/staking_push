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
  import { FC, useState } from "react"
  import * as anchor from "@project-serum/anchor"
  import { getAssociatedTokenAddress } from "@solana/spl-token"
  import { CommentList } from "./CommentList"
  import { useConnection, useWallet } from "@solana/wallet-adapter-react"
  import { useWorkspace } from "../context/Anchor"
import { PublicKey, Transaction, TransactionInstruction, TransactionInstructionCtorFields } from "@solana/web3.js"
import { Metadata, Metaplex, Mint, Nft, NftEdition, NftWithToken, Sft, SftWithToken, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
import { ToastContainer, toast } from "react-toast"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
  interface CustomProps {
    totalmints: any[];
  }

export const UnstakeButtonAll: FC<CustomProps> = ({
    totalmints,

  }: CustomProps) => {


    const copytllmints = JSON.parse(JSON.stringify(totalmints));

    const wallet = useWallet()
    const workspace = useWorkspace()
    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const authoritykey =  new PublicKey("BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV")
    const programId = new PublicKey("9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU")
    const stakemint = new PublicKey("JA7kHW1Y8MLVdpngrFR6AcDaiPPHznYxwLpfXovWNZKe")
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))
    let nftData: any = undefined;
    const [buttonMsg, setButtonMsg] = useState("UNSTAKE ALL")
    const [txleft, setTxLeft] = useState(0);
    const [isLoading, setLoading] = useState(false)

    function formatString(str: string): string {
      if (str.length <= 6) {
        return str;
      } else {
        return str.slice(0, 3) + "..." + str.slice(-3);
      }
    }

    const handleSubmit =  async (event: any) => {
      setButtonMsg("FETCHING")
      let totalnfts = copytllmints.length
      let repeat = 1
      let pubdata = null;

      const transactionsrequired = Math.round(totalnfts/ 4 + 0.4)
      setTxLeft(transactionsrequired)
     
     
      while (repeat != 0) {
        repeat -= 1

    
        if (!publicKey || !workspace.program || !workspace.connection ) {
            return 
          }
             
         
          const transaction = new anchor.web3.Transaction()

          let transactionarray: any = []
              
          const [mintPda] = findProgramAddressSync(
            [publicKey.toBytes() ,Buffer.from("infamousstakingnew")],
            workspace.program.programId
          )

          for (let i = 0; i < transactionsrequired ; i++) {
            let transactiontest = new anchor.web3.Transaction()   
            for (let x = 0; x < 4; x++) {
                if (copytllmints.length > 0) {
              const newmint = new PublicKey(copytllmints[0].mintAddress)
              const fetchednftinfo: any = await metaplex.nfts().findByMint({mintAddress: newmint}).run()
              const tokenAccount = (
                await connection.getTokenLargestAccounts(newmint)
              ).value[0].address
              const tokenAddress = await getAssociatedTokenAddress(stakemint, publicKey);


             


            
             

              const ih = await workspace.program.methods
              .prepunstake()
              .accounts({
              
                nftMint: newmint,
                nftEdition: fetchednftinfo.edition.address,
                stakeAccountList: mintPda,
                nftTokenAccount: tokenAccount,
                metadataProgram: METADATA_PROGRAM_ID,
              }).instruction()
              
            const ix = await workspace.program.methods
            .unstake()
            .accounts({
              nftTokenAccount: tokenAccount,
              nftMint: newmint,
              userStakeAta: tokenAddress,
              stakeMint: stakemint,
              nftEdition: fetchednftinfo.edition.address,
      
                      // stakeList: userFixedPoolKey,
              metadataProgram: METADATA_PROGRAM_ID,
            })
            
            .instruction()
            transactiontest.add(ih)
            transactiontest.add(ix)
            copytllmints.shift();


                }
            }
          
            transactionarray.push(transactiontest)
        
          
          }
           
         





         
             
              setButtonMsg("Txs Left: "+ transactionsrequired)
              for (let i = 0; i < transactionsrequired ; i++) {
                try {
                // transaction.instructions[0] =
                 ;
                // transaction.add(txarray)
     
                setButtonMsg("Txs Left:" + (transactionsrequired - i))
                let signature = await sendTransaction(transactionarray[i], workspace.connection)
               
         
                const latestBlockHash = await workspace.connection.getLatestBlockhash();
                await workspace.connection.confirmTransaction({
                  blockhash: latestBlockHash.blockhash,
                  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                  signature: signature,
                });
                toast.success('' + formatString(signature) + ' Confirmed', {
                  backgroundColor: '#4BB543',
                  color: '#fffffff',
                })
                setTxLeft(txleft - 1)
              } catch (e) {
                toast.error('' + e, {
                  color: '#fffffff',
                  backgroundColor: "#c52965"
                })
                setButtonMsg("UNSTAKE ALL")
              }
            }
      
            } 
        }
        





    
    return(

             <div>
      
             <button  className="claimbutton" onClick={handleSubmit}><div className="allbuttonstk_inner"><div className="tokensoweddisplay" style={{textTransform:"uppercase"}}>{buttonMsg}</div></div></button>
   
            </div>
    )
  }
