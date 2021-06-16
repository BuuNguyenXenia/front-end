import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  clearState,
  itemPostThunk
} from "src/components/ViewAllPosts/Posts.slice"
import { PATH } from "src/constants/path"
import { formatDate } from "src/helpers/date"

import { useAppDispatch } from "src/store/hooks"
import { PostsItem } from "./PopularPostsItem.styles"

export default function PopularPostsItem({ title, createdAt, postId, image }) {
  const dispatch = useAppDispatch()

  const creatDate = formatDate(createdAt)

  const handleItemPost = (_id: string) => {
    dispatch(itemPostThunk(_id))
    dispatch(clearState())
  }
  return (
    <PostsItem>
      <Card.Text as="div">
        <Row>
          <Col xs={4} className="p-0">
            <Link
              to={`${PATH.ITEM_POST}/${postId}`}
              className="posts-item-image wrapper-image"
              onClick={() => handleItemPost(postId)}
            >
              <img src={image} alt="img" />
            </Link>
          </Col>
          <Col xs={8} className="posts-item-body">
            <h5 className="posts-item-title wrapper-title">
              <Link
                to={`${PATH.ITEM_POST}/${postId}`}
                onClick={() => handleItemPost(postId)}
              >
                {title}
              </Link>
            </h5>
            <time className="posts-item-time wrapper-time" dateTime={createdAt}>
              {creatDate}
            </time>
          </Col>
        </Row>
      </Card.Text>
    </PostsItem>
  )
}
