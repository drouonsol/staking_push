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
import { PublicKey } from "@solana/web3.js"
import { Metadata, Metaplex, Mint, Nft, NftEdition, NftWithToken, Sft, SftWithToken, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
import { ToastContainer, toast } from "react-toast"
  interface CustomProps {
    mint: PublicKey;
    metadata: PublicKey
  }

export const StakeButton: FC<CustomProps> = ({
    mint,
    metadata

  }: CustomProps) => {
    const wallet = useWallet()
    const stakedList: Array<PublicKey> = []
   
    const [buttonTxt, setButtonTxt] = useState("STAKE")
    const workspace = useWorkspace()
    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const authoritykey =  new PublicKey("BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV")
    const programId = new PublicKey("9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU")
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))
    let nftData: any = undefined;
    const [isLoading, setLoading] = useState(false)

    if (stakedList.includes(mint)) {
      setButtonTxt("Done!")
    }
    
    const handleSubmit =  async (event: any) => {
      let repeat = 1
      let pubdata = null;
      while (repeat != 0) {
        repeat -= 1

        if (!publicKey || !workspace.program || !workspace.connection ) {
            return 
          }
             
          let transaction = new anchor.web3.Transaction()   
  
        
              const [mintPda] = findProgramAddressSync(
                [publicKey.toBytes() ,Buffer.from("infamousstakingnew")],
                workspace.program.programId
              )
             
              const newmint = new PublicKey(mint)
              
                
              const fetchednftinfo: any = await metaplex.nfts().findByMint({mintAddress: newmint}).run()
              
              
              
              const tokenAccount = (
                await connection.getTokenLargestAccounts(fetchednftinfo.mint.address)
              ).value[0].address
              
              const ix = await workspace.program.methods
              .stake()
              .accounts({
                nftTokenAccount: tokenAccount,
                nftMint: fetchednftinfo.mint.address,
                nftMetadataAccount: fetchednftinfo.metadataAddress,
                nftEdition: fetchednftinfo.edition.address,
                stakeAccountList: mintPda,
                        // stakeList: userFixedPoolKey,
                metadataProgram: METADATA_PROGRAM_ID,
              })
              
              .instruction()
              
              transaction.add(ix)
              try {
                let signature = await sendTransaction(transaction, workspace.connection)
            
                const latestBlockHash = await workspace.connection.getLatestBlockhash();
                await workspace.connection.confirmTransaction({
                  blockhash: latestBlockHash.blockhash,
                  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                  signature: signature,
                });


                setButtonTxt("DONE!")
                setName()
                toast.success('Staked:  ' + fetchednftinfo.name, {
                  backgroundColor: '#4BB543',
                  color: '#fffffff',
                })
              } catch (e) {
                toast.error('An Error Appeared')
              }
            
            }
          }
          const [functionCalled, setFunction] = useState(       
            <button className="utilitybutton" onClick={handleSubmit}>{buttonTxt}</button>)
    
          function setName() {
            setFunction(
              <button style={{transition:".2s"}}className="utilitybutton">DONE!</button>
            )
          }

    return(
        <div>

        {functionCalled}

       </div>
    )
}