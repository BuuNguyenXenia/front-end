import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  clearState,
  itemPostThunk
} from "src/components/ViewAllPosts/Posts.slice"
import { PATH } from "src/constants/path"
import { formatDate } from "src/helpers/date"
import { handleShowContent } from "src/helpers/string"
import { useAppDispatch } from "src/store/hooks"
import { ItemReview } from "./ReviewItem.styles"

export default function ReviewItem({ title, createdAt, postId, image }) {
  const dispatch = useAppDispatch()

  const creatDate = formatDate(createdAt)

  const handleItemPost = (_id: string) => {
    dispatch(itemPostThunk(_id))
    dispatch(clearState())
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
