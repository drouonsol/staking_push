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

interface ReviewDetailProps {
  isOpen: boolean
  onClose: any
  movie: any
}

export const ReviewDetail: FC<ReviewDetailProps> = ({
  isOpen,
  onClose,
  movie,
}: ReviewDetailProps) => {
  

  return (
    <></>
  )
}
