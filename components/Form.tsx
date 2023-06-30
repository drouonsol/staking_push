import { FC } from "react"
import { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Switch,
} from "@chakra-ui/react"
import { useWorkspace } from "../context/Anchor"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
import { getAssociatedTokenAddressSync } from "@solana/spl-token"
import * as anchor from "@project-serum/anchor"
import InstructionNamespaceFactory from "@project-serum/anchor/dist/cjs/program/namespace/instruction"
import { IDL } from "../context/Anchor/movie_review"
import { Idl, Program } from "@project-serum/anchor"
import { Account, PublicKey } from "@solana/web3.js"
import { Metaplex, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"


export const StakeOptions: FC = () => {
  const [title, setTitle] = useState("")
  const [rating, setRating] = useState(0)
  const [buttonrender, setButtonrender] = useState(<div>Stake</div>)
  const [description, setDescription] = useState("")
  const [toggle, setToggle] = useState(true)
  const programId = new PublicKey("9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU")
  const wallet = useWallet()
  const workspace = useWorkspace()
  const { publicKey, sendTransaction } = useWallet()

  const { connection } = useConnection()
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))


  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!publicKey || !workspace.program || !workspace.connection) {
      alert("Please connect your wallet")
      return
    }
    const program = new Program(IDL as Idl, programId)
    const transaction = new anchor.web3.Transaction()
    const [mintPda] = findProgramAddressSync(
      [publicKey.toBytes() ,Buffer.from("infamousstakingnew")],
      workspace.program.programId
    )
    try {
    const account = await program.account.walletList.fetch(mintPda)
    const mintlist = (account.mintlist) as string
    const mintlist2 = Array.from(mintlist)
    
    let convertedarray = mintlist2.map(key =>
      {
        const newkey = new PublicKey(key)
        return newkey;
      }

    )

    const nfts =  (await metaplex
      .nfts()
      .findAllByMintList(
        {
          mints: convertedarray
        }
      )
      .run())

    


    
    } catch (error) {
      setButtonrender(<button>Create Account</button>)
      const ix = await workspace.program.methods
      .createStakingAccount()
      .accounts({
      })
      .instruction()

      transaction.add(ix)
      try {
        let signature = await sendTransaction(transaction, workspace.connection)

      } catch (e) {
   
        alert(JSON.stringify(e))
      }
    }




   

    if (toggle) {
     
    } else {
      // const ix = await workspace.program.methods
      //   .updateMovieReview(title, description, rating)
      //   .instruction()

      // transaction.add(ix)
    }

    
  }

  return (
    <div>
   {buttonrender}
    </div>
  )
}
