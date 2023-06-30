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
    position,
  } from "@chakra-ui/react"
  import { FC, useState } from "react"
  import * as anchor from "@project-serum/anchor"
  import { getAssociatedTokenAddress } from "@solana/spl-token"
  import { CommentList } from "./CommentList"
  import { useConnection, useWallet } from "@solana/wallet-adapter-react"
  import { useWorkspace } from "../context/Anchor"
import { PublicKey } from "@solana/web3.js"
import { Metadata, Metaplex, Mint, Nft, NftEdition, NftWithToken, Sft, SftWithToken, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
import { ToastContainer, toast } from "react-toast"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
  interface CustomProps {
    mint: PublicKey;
  }

export const UnstakeButton: FC<CustomProps> = ({
    mint
  }: CustomProps) => {
    const wallet = useWallet()
    const workspace = useWorkspace()
    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const authoritykey =  new PublicKey("BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV")
    const stakemint = new PublicKey("JA7kHW1Y8MLVdpngrFR6AcDaiPPHznYxwLpfXovWNZKe")
    const programId = new PublicKey("9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU")
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))
    let nftData:any = undefined;
    const [isLoading, setLoading] = useState(false)
    const [buttonMsg, setButtonMsg] = useState("UNSTAKE")
    const handleSubmit =  async (event: any) => {
      let repeat = 1
      let pubdata = null;
      while (repeat != 0) {
        repeat -= 1
        const newmint = new PublicKey(mint)
        
        if (!publicKey || !workspace.program || !workspace.connection ) {
            return 
          }
             
              await  metaplex
              .nfts()
              .findByMint({ mintAddress: newmint })
              .run()
              .then(async (nft) => {
                 
                 nftData = nft
                pubdata = nft
                setLoading(true)
              
              })
             if (nftData) {
              
              const tokenAccount = (
                await connection.getTokenLargestAccounts(newmint)
              ).value[0].address
             
              const tokenAddress = await getAssociatedTokenAddress(stakemint, publicKey);
              const [mintPda] = findProgramAddressSync(
                [publicKey.toBytes() ,Buffer.from("infamousstakingnew")],
                workspace.program.programId
              )
              
              if ((nftData != null) && (nftData.edition)){
               
                const ih = await workspace.program.methods
                .prepunstake()
                .accounts({
                
                  nftMint: newmint,
                  nftEdition: nftData.edition.address,
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
                nftEdition: nftData.edition.address,
        
                        // stakeList: userFixedPoolKey,
                metadataProgram: METADATA_PROGRAM_ID,
              })
              
              .instruction()

              const transaction = new anchor.web3.Transaction()
            //   transaction.add(ih)
              transaction.add(ih)
              transaction.add(ix)
              
              try {
                let signature = await sendTransaction(transaction, workspace.connection)
                
         
                const latestBlockHash = await workspace.connection.getLatestBlockhash();
                await workspace.connection.confirmTransaction({
                  blockhash: latestBlockHash.blockhash,
                  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                  signature: signature,
                });
                toast.success('Unstaked ' + nftData.name, {
                  backgroundColor: '#4BB543',
                  color: '#fffffff',
                } )
                setButtonMsg("DONE!")
          
              } catch (e) {
                toast.error('' + e, {
                  color: '#fffffff',
                })
              }
            
            }
          }
      }
    }

    function componentdidupdta(prevstate: any, newstate: any) {
      if (prevstate !== newstate) {
        nftData = (newstate)
        
        
        
        
      }
    }
    return(
        <div>
        <button className="utilitybutton" onClick={handleSubmit}>{buttonMsg}</button>
       </div>
    )
}