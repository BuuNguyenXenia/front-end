import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  clearState,
  itemPostThunk
} from "src/components/ViewAllPosts/Posts.slice"
import { PATH } from "src/constants/path"
import { formatDate } from "src/helpers/date"
import { useAppDispatch } from "src/store/hooks"
import { TopReview } from "./ReviewTop.styled"

export default function ReviewTop({ title, createdAt, postId, image }) {
  const dispatch = useAppDispatch()

  const creatDate = formatDate(createdAt)

  const handleItemPost = (_id: string) => {
    dispatch(itemPostThunk(_id))
    dispatch(clearState())
  }
  return (
    <TopReview>
      <Card className="card-review-top">
        <Link
          to={`${PATH.ITEM_POST}/${postId}`}
          onClick={() => handleItemPost(postId)}
        >
          <Card.Img src={image} className="card-review-image" />
        </Link>
        <Card.Body className="card-review-body card-top">
          <Card.Title className="card-review-title">
            <Link
              to={`${PATH.ITEM_POST}/${postId}`}
              onClick={() => handleItemPost(postId)}
            >
              {title}
            </Link>
          </Card.Title>
          <Card.Text className="card-review-text">
            by <span>Team DUT</span> • {creatDate}
          </Card.Text>
        </Card.Body>
      </Card>
    </TopReview>
  )
}
