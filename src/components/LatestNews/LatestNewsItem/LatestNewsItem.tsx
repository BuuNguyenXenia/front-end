import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import { LastsNewsItemPage } from "./LatestNewsItem.styles"
import { handleShowContent } from "src/helpers/string"
import { Link } from "react-router-dom"
import { useAppDispatch } from "src/store/hooks"
import {
  clearState,
  itemPostThunk
} from "src/components/ViewAllPosts/Posts.slice"

import { formatDate } from "src/helpers/date"
import { PATH } from "src/constants/path"

export default function LatestNewsItem({
  title,
  body,
  createdAt,
  postId,
  image
}) {
  const dispatch = useAppDispatch()

  const creatDate = formatDate(createdAt)

  const handleItemPost = (postId: string) => {
    dispatch(itemPostThunk(postId))
    dispatch(clearState())
  }
  return (
    <LastsNewsItemPage>
      <Card className="card-lastsNews-item">
        <Row className="lastsNews-item">
          <Col xl={4} lg={4} md={4} sm={4} className="lastsNews-image px-2">
            <Link
              to={`${PATH.ITEM_POST}/${postId}`}
              className="card-lastsNews-image"
              onClick={() => handleItemPost(postId)}
            >
              <Card.Img src={image} />
            </Link>
          </Col>
          <Col xl={8} lg={8} md={8} sm={8} className="p-0">
            <Card.Body className="card-lastsNews-body">
              <Card.Title className="card-lastsNews-title mb-1">
                <Link
                  to={`${PATH.ITEM_POST}/${postId}`}
                  onClick={() => handleItemPost(postId)}
                >
                  {title}
                </Link>
              </Card.Title>
              <Card.Text as="div" className="card-lastsNews-text">
                <p dangerouslySetInnerHTML={{ __html: body }}></p>
              </Card.Text>
              <span className="card-lastsNews-author">
                by <span>Team DUT</span> • {creatDate}
              </span>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </LastsNewsItemPage>
  )
}
