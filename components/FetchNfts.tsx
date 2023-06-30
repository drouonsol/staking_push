import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Metaplex, findNftsByMintListOperation, walletAdapterIdentity } from "@metaplex-foundation/js"
import { FC, useEffect, useState } from "react"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"

import { useWorkspace } from "../context/Anchor"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
import { Idl, Program } from "@project-serum/anchor"
import { IDL } from "../context/Anchor/movie_review"
import * as anchor from "@project-serum/anchor"
import { StakeButton } from "./StakeButton"
import { ClaimButton } from "./ClaimButton"
import { UnstakeButton } from "./UnstakeButton"

import { NoNfts } from "./NoNfts"
import { CreateAccount } from "./CreateAccount"
import { Loading } from "./Loading"
import { ConnectWallet } from "./Connect"
import { getAssociatedTokenAddress } from "@solana/spl-token"
import { StakeButtonAll } from "./StakeAll"
import { UnstakeButtonAll } from "./UnstakeAll"
import { NoStake } from "./NoStake"
import { AppFooter } from "./AppFooter"

import axios from "axios"


export const FetchNfts: FC = () => {
  const [nftData, setNftData] = useState<any | null>(null);
  const [nftMints, setNftMints] = useState([])
  const [stakedNftData, setStakedNftData] =  useState<any | null>(null);
  const wallet = useWallet();
  const workspace = useWorkspace()
  const [claimDisplay, setClaimDisplay] = useState(<></>) 
  const [tokensOwedMint, setTokensOwed] = useState<any>("0.00")
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection()
  const authoritykey =  new PublicKey("BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV")
  const programId = new PublicKey("9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU")
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))
  const [ displayButton, setDisplayButton ] = useState(<div><ConnectWallet/></div>)
  const stakemint = new PublicKey("JA7kHW1Y8MLVdpngrFR6AcDaiPPHznYxwLpfXovWNZKe")
  const [stakeddisplay, setStaked] = useState(<></>) 
  const [unstakeddisplay, setUnstaked] = useState(<></>) 
  const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
  const [stakedamount, setStakedAmount] = useState(0)
  const [unstakedamount, setUnstakedAmount] = useState(0)
  const [errorpassed, setError] = useState(false)
  const [tabbuttonl, setTabButtons] = useState(<>Hold Up</>)
  let repeatrefresh = 1  
  const [solanabalance, setSolBalance] = useState(0)
  const [usd_value, setUsdValue] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [stakedclass, setStakedClass] = useState("tabselection")
  const [unstakedclass, setUntakedClass] = useState("tabselectionsel")
  const [buttonAll, setButtonAll] = useState(<></>)
  const [zeroStake, setZeroStake] = useState(<div></div>)
  const [stakedList, setStakedList] = useState<any>()
  const [unstakedList, setUnstakedList] = useState<any>()
  const [fetchedNfts, setDoneFetching] = useState(false)
  function handleClick(this: any,event: any) {
    event.preventDefault()
    let data = event?.target.dataset;
  }



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


  const setpage = async (event: any) => {
    if (!errorpassed && fetchedNfts) {   
       event.preventDefault()
       let data = event?.target.dataset

      
      
       if (data.side == "wallet") {
         setDisplayButton(
           <>
           {unstakeddisplay}
           </>
         )

         setUntakedClass(
          "tabselectionsel"
         )

         setStakedClass(
          "tabselection"
         )

         setButtonAll(
          <>
             <StakeButtonAll fetchedarray={unstakedList} totalmints={unstakedList} />
          </>
         )
       }
       if (data.side == "staked") {
         setDisplayButton(
           <>
           {stakeddisplay}
           </>
         )
         setStakedClass(
          "tabselectionsel"
         )


         setButtonAll(
          <>
            <UnstakeButtonAll totalmints={stakedList} />
          </>
         )
         setUntakedClass(
          "tabselection"
         )
  
       }
      
      
      }

     }


     const startpageload = async (side: String) => {
      
         if (side == "wallet") {
           setDisplayButton(
             <>
             {unstakeddisplay}
             </>
           )
         }
         if (side == "staked") {
           setDisplayButton(
             <>
             {stakeddisplay}
             </>
           )
         }}
       
    
        


  const fetchNfts = async () => {

    
    if (!wallet.publicKey || !workspace.program || !workspace.connection || !publicKey) {
    
      return
    } else {
        // Get Solana Balance
        let balance = await connection.getBalance(wallet.publicKey)
        balance = balance/LAMPORTS_PER_SOL
        setSolBalance(Number(balance.toFixed(4)))
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=Solana&vs_currencies=USD')
        .then(response => {
          const jsonString = JSON.stringify(response.data.solana.usd);

          setUsdValue(Number((Number(jsonString) * balance).toFixed(2)))

        })
        .catch(error => {
          console.error('Error fetching Solana price:', error);
        });

        
        // END OF SOLANA BALANCE

 
    if (!loaded) {
    setDisplayButton(<div><Loading/></div>)
    }
    setLoaded(false)
    const nfts: any =  (await metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey })
      .run())
      .filter((r) => r.updateAuthorityAddress.toBase58().toString() === "BWxYFcNv1TacJTkVo39eimrJHWiBkNYn2KRebAbEr6ZV") 
   
   
    const newnfts = nfts
   
    let nftData: any[][] = []
    if (nfts.length == 0) {
     
    }

    for (let i = 0; i < nfts.length; i++) {
      let fetchMint = await  new PublicKey(nfts[i].mintAddress).toBase58()
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

    const program = new Program(IDL as Idl, programId)
   
    const [mintPda] = findProgramAddressSync(
      [publicKey.toBytes() ,Buffer.from("infamousstakingnew")],
      programId
    )
    const [accountstats] = findProgramAddressSync(
      [publicKey.toBytes() ,Buffer.from("stake_global")],
      programId
    )
    

    try {

    // const accounttokens = await program.account.userStakeInfo.fetch(accountstats)
    // let totaltokensowed =((Number(accounttokens.tokensOwed) + ((Number(accounttokens.stakedAmount) * ( (Date.now()/100) - Number(accounttokens.stakeStartTime)))))  ) / (100 * 86000 * 100) * 10
    //
    
     
    const account = await program.account.walletList.fetch(mintPda)
    const mintlist = (account.mintlist) as string
    const mintlist2 = Array.from(mintlist)
      



    const arraywithpubkeys = mintlist2.map(key => {
      let x = new PublicKey(key)
      let y = x.toBase58()
      return y
    })
   
    
    const filteredoutarraywithoutplaceholders = arraywithpubkeys.filter(key => key != new PublicKey("11111111111111111111111111111111").toBase58())
   
    const finalstakedarray = filteredoutarraywithoutplaceholders.map(key => {
     return new PublicKey(key)
    })
    setUnstakedList(finalstakedarray)


    let pubarray  = mintlist2.map(key =>
      {  
        const newkey = new PublicKey(key)
        return newkey; 
      }
    )
   
    const nftsbymint: any = await (await metaplex
      .nfts()
      .findAllByMintList(
        {
          mints: finalstakedarray
        }
      )
      .run())
    setStakedList(nftsbymint)
    let stakednftdata = []
    let newstakedarray: any[]  = [] 
    if (nftsbymint[64]) {
      // Condition Will never be true since maximum tokens allowed are 63
    } else
    if (nftsbymint) {

       
        if (nftsbymint == null) {
        
        } else {      
          for (let i = 0; i <= nftsbymint.length; i++) {
            if (nftsbymint[i] == null) {
             
          } else {
          stakednftdata.push(nftsbymint[i])
          }
          
        }
        

        for (let i = 0; i <=  stakednftdata.length; i++) {
          if (nftsbymint[i]?.uri != null) {
            let uri = nftsbymint[i]?.uri
            if (uri !== null) {
       
              let mint = nftsbymint[i]?.mintAddress;
      
              let uriconverted = uri as unknown as URL;
              let fetchResult = await fetch(uriconverted);
           
              
              let json = await fetchResult.json()
              let mergedarray = [json, mint.toBase58()]
              newstakedarray.push(mergedarray)
              
            
            }
          }
        }
        setStakedNftData(newstakedarray)

      }
      
    }

    let nonstakedarrayfull = []
    for (let i = 0; i < nfts.length; i++) {
      let passes = true;
      for (let x = 0; x < nftsbymint.length; x++) {        
        if (nfts[i].mintAddress.toBase58() == nftsbymint[x].mintAddress.toBase58()) {
          x = nftsbymint.length
          passes = false
      } else {
       
        passes = true
      }
    }
    if (passes == true) {  
      nonstakedarrayfull.push(nfts[i])

    passes = false 
    }
    }
   
    // let arrayfullnonstaked = nfts.filter(key => key in nftsbymint)   
    //
    // Checks if NFTs is inside of the newstaked (Fetched Version aka URI)

    let newnonstakedarray = []
    for (let i = 0; i < nftData.length; i++) {
      let passes = true;
      for (let x = 0; x < newstakedarray.length; x++) {        
        if (nftData[i][1] == newstakedarray[x][1]) {
          x = newstakedarray.length
          passes = false
      } else {
       
        passes = true
      }
    }
    if (passes == true) {  
    newnonstakedarray.push(nftData[i])
    setNftData(newnonstakedarray);
    passes = false 
    }
    }
    
    // I HAVE NO FUCKING IDEA WHAT THE FUCK IS GOING ON RIGHT NOW

    if (!newstakedarray[0]) {
    let emptyarray: any[] = []
   
     
      setZeroStake(<div><NoStake/></div>)
      
    } else {
    let unstakednfts = nftData.filter(data => !data[0].address == newstakedarray[0][0].address)
    setClaimDisplay(<div></div>)
    setNftData(unstakednfts)
    }

    
    const [accountstats] = findProgramAddressSync(
      [publicKey.toBytes() ,Buffer.from("stake_global2")],
      programId
    )

    const tokenAddress = await getAssociatedTokenAddress(stakemint, publicKey);
    let accounttokens = undefined;
     try {accounttokens = await program.account.userStakeInfo.fetch(accountstats) } catch(err) {

    }
    if ((typeof(accounttokens) != "undefined")) {
    let laststaked = Number(accounttokens.stakeStartTime)
    let stakeamount = accounttokens.stakedAmount
    setTokensOwed(stakeamount)
    let totaltokensowed = Number(stakeamount) * ((Date.now()/1000 - laststaked)/ 86000) * 10 
    const tokensowed = accounttokens.tokensOwed as string

   
    setTokensOwed((Number(tokensowed)/100 + totaltokensowed).toFixed(3))
   

   
  

}


    
    if (typeof nftData[0] == 'undefined' || nftData.length == 0)  {
      setDisplayButton(<div><NoNfts/></div>)
      setError(true)

    } else {
     

      setStakedAmount(newstakedarray.length)
      if (newstakedarray.length == 0) {
        setStaked(<><NoStake/></>)
      } else {
      setStaked(<>   
      {!stakednftdata && (
       <div><h1>None Staked</h1></div>
      )}
     {stakednftdata && (
       <div>
         <>
         <div  style={{height: "fit-content", textAlign:"center" }}> <div className="container">
       <>
       {newstakedarray.map((nft: any) => (
                       <div className="card"  >
                       <div className="content" >
                           <div className="imgBx">
                               <img src={nft[0].image} />
                           </div>
                           <div className="contentBx">
                   
                               <h4 style={{textTransform:"uppercase", fontFamily:"Oswald"}}>{nft[0].name}</h4>
                             
                           <UnstakeButton mint={nft[1]} />
                              <br/>
                               {/* <h5 className="nftnumber" style={{padding:"15px",fontFamily:"Oswald",}}>Elysian Kid #{[nftnumber3]}</h5> */}
                           </div>
                           <div className="sci">
       
                           </div>
                       </div>
                   </div>
           ))}
       </></div></div>
         </>
       </div>
     )}</>)
       }
       setUnstakedAmount(newnonstakedarray.length)
       if (!newnonstakedarray[0]) {
       
        setUnstaked(<><NoNfts/></>)
      } else {
        setUnstaked(<>
       
          {nftData &&
          (
          
            <div  style={{height: "fit-content", textAlign:"center" }}> <div className="container">
            <>
         
               {newnonstakedarray.map((nft: any[]) => (
                          <div  className="card" style={{alignContent:"left",justifyContent:"center"}} >
                          <div className="content" >
                              <div className="imgBx">
                                  <img src={nft[0].image} alt={nft[0].name}/>
                              </div>
                              <div className="contentBx">
                                  <h4 style={{textTransform:"uppercase", fontFamily:"Oswald"}}>{nft[0].name}</h4>
                           
      
                                  <StakeButton mint={nft[1]} metadata={nft[0].address}/>
                                  <br />
                                  {/* <h5 className="nftnumber" style={{padding:"15px",fontFamily:"Oswald",}}>Elysian Kid #{[nftnumber3]}</h5> */}
                              </div>
                              <div className="sci">
          
                              </div>
                          </div>
                      </div>
              ))}      
      
      
         
           </>
      
           </div>
           </div>
          )}</>)
               }
        
          setButtonAll(
            <>
              <StakeButtonAll fetchedarray={newnonstakedarray} totalmints={nonstakedarrayfull} />
              
            </>
          )
          
    if (!loaded) {
    if (!newnonstakedarray[0])  {
            setDisplayButton(<><NoNfts/></>)
          } else {
        setDisplayButton(
        
      
        <>
           
          <h1 style={{fontSize:"200%",fontFamily:"Oswald"}}></h1>
            {nftData &&
            (
            
              <div  style={{height: "fit-content",  }}> <div className="container">

            
                 {newnonstakedarray.map((nft: any[]) => (
                            <div  className="card" style={{alignContent:"left",justifyContent:"center",textAlign:"center"}} >
                            <div className="content" >
                                <div className="imgBx">
                                    <img src={nft[0].image} alt={nft[0].name}/>
                                </div>
                                <div className="contentBx">
                                    <h4 style={{textTransform:"uppercase", fontFamily:"Oswald"}}>{nft[0].name}</h4>
                                    <h1>{nft[0].address}</h1>
                                    <StakeButton mint={nft[1]} metadata={nft[0].address}/>
                                    <br/>
                                    {/* <h5 className="nftnumber" style={{padding:"15px",fontFamily:"Oswald",}}>Elysian Kid #{[nftnumber3]}</h5> */}
                                </div>
                                <div className="sci">
            
                                </div>
                            </div>
                        </div>
                ))}      
        
        
           
             </div>
        
             </div>
     
            )}</>)
                 }
                }
                 setLoaded(true)
                 setDoneFetching(true)

        
    }

 



    } catch (error) {
      setError(true)
     setDisplayButton(<div><CreateAccount/></div>)
    
    }
  
  
  }
}
  useEffect(() => {
    fetchNfts()
  }, [wallet])


  

  let cards = 2


  if (publicKey) {
  return (
    <div  className="nft_fetcher" style={{textAlign:"left"}}>
    <div className="statbar">
        <div>
      <span>
        <><button className={unstakedclass} onClick={setpage} data-side="wallet">Wallet({unstakedamount})</button>
      
    <button className={stakedclass} onClick={setpage} data-side="staked">Staked({stakedamount})</button></>
      </span>
      </div>

     
      <span></span>
     
      <span className="gridT">
      <div className="solana_balance"><div className="solana_rewardsection">  {solanabalance} SOL <span>(≈${usd_value})</span></div></div>

      {/* <button className="solana_balance" onClick={fetchNfts}><div className="solana_rewardsection">
          REFRESH
        </div></button> */}
      <span className="spacecreatormbl"></span>
         {buttonAll}<span className="spacecreator"></span><ClaimButton /></span>
       </div>
       <div style={{minHeight:"60vh"}}>
     {claimDisplay}
 
      {displayButton}
      </div>
    </div>
  )
  } else {
    return (
      <div>
          
        <ConnectWallet/>
        </div>
    )
  }
}