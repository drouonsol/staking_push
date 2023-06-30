import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'

export const AppFooter: FC = () => {
    return (
        <div className={styles.AppFooter}>
           <a href="https://inflbs.com"><h1 className="infbrand" style={{fontFamily:"Oswald",fontSize:"200%",fontWeight:800,}}>INF</h1></a>
            <span></span>
            <div><h1 style={{fontFamily:"Oswald",fontSize:"150%",fontWeight:800,textTransform:"uppercase"}}>Copyright © 2023. </h1></div>
        </div>
    )
}