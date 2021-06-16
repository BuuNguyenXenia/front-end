import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  getCommentsPostItem,
  itemPostThunk
} from "src/redux/slices/allPostsSlice/Posts.slice"
import { PATH } from "src/services/constants/path"
import { formatDate } from "src/services/helpers/date"
import { useAppDispatch } from "src/redux/store/hooks"
import { ItemReview } from "./ReviewItem.styles"

export default function ReviewItem(props) {
  const { title, createdAt, postId, image } = props
  const dispatch = useAppDispatch()

  const creatDate = formatDate(createdAt)

  const handleItemPost = (postId: string) => {
    dispatch(itemPostThunk(postId))
    dispatch(getCommentsPostItem(postId))
  }
  return (
    <ItemReview>
      <Card className="card-review-item">
        <Row className="card-item">
          <Col sm={4} className="p-0">
            <Link
              to={`${PATH.ITEM_POST}/${postId}`}
              className="card-image"
              onClick={() => handleItemPost(postId)}
            >
              <Card.Img src={image} />
            </Link>
          </Col>
          <Col sm={8} className="p-0">
            <Card.Body className="card-review-body">
              <Card.Title className="card-review-title mb-1">
                <Link
                  to={`${PATH.ITEM_POST}/${postId}`}
                  onClick={() => handleItemPost(postId)}
                >
                  {title}
                </Link>
              </Card.Title>
              <time dateTime={createdAt} className="wrapper-time">
                {creatDate}
              </time>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </ItemReview>
  )
}
