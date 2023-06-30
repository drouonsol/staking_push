import {
  Button,
  Center,
  HStack,
  Spacer,
  Stack,
  Box,
  Heading,
} from "@chakra-ui/react"
import { FC, useState, useEffect } from "react"
import { useWorkspace } from "../context/Anchor"


interface CommentListProps {
  movie: any
}

export const CommentList: FC<CommentListProps> = ({
  movie,
}: CommentListProps) => {
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState<any[]>([])
  const [result, setResult] = useState<any[]>([])
  const { program } = useWorkspace()

  useEffect(() => {
    const fetch = async () => {}
    fetch()
  }, [page])

  return (
    <div>
    </div>
  )
}
