import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Metaplex, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"
import { FC, useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"
import { Button } from "@chakra-ui/react"
import { useWorkspace } from "../context/Anchor"

export const FetchNfts: FC = () => {
  const [nftData, setNftData] = useState<any | null>(null);
  const [nftMints, setNftMints] = useState([])
  const wallet = useWallet()
  const workspace = useWorkspace()

  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const authoritykey =  new PublicKey("BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV")
 
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))
  
  
  function handleClick(this: any,event: any) {
    event.preventDefault()
    let data = event?.target.dataset;
   
  }


  const fetchNfts = async () => {
    if (!publicKey || !workspace.program || !workspace.connection ) {
      return 
    } 
    
    const nfts =  (await metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey })
      .run())
      .filter((r) => r.updateAuthorityAddress.toBase58().toString() === "BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV") 
  
   
    const newnfts = nfts
   
    let nftData = []


    

    for (let i = 0; i < nfts.length; i++) {
      let fetchMint = await  new PublicKey(nfts[i].address).toBase58()
     
     
     
      let fetchResult = await fetch(nfts[i].uri
      //   {
      //      headers : { 
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json'
      // }
      //  }
       );
      
     
      let json = await fetchResult.json()
      let mergedarray = [json, fetchMint]
      nftData.push(mergedarray)
     
    }
    setNftData(nftData)
  }

  useEffect(() => {
    fetchNfts()
  }, [wallet])


  let cards = 2


  return (
    <div style={{textAlign:"left"}} className="nft_fetcher">
         <h1 style={{fontSize:"200%", fontFamily:"Oswald"}}>Unstaked:</h1>
         <div className="nft_grid">
      {nftData &&
       (
        <div  style={{textAlign:"center"}}>
   
       
            {nftData.map((nft: any[]) => (
              <div className="nft_card">
        
           
              <img src={nft[0].image} />
              <ul>{nft[0].name}</ul>
              <button onClick={handleClick} data-value-mint={nft[1]}>STAKE</button>
            </div>
            
          ))}      
        

        </div>
      )}
    </div>
    <h1 style={{fontSize:"200%"}}>Staked:</h1>
    </div>
  )
}