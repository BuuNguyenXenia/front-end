import React from "react"
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { itemPostThunk } from "src/components/ViewAllPosts/Posts.slice"
import { handleShowContent } from "src/helpers/string"
import { clearState } from "src/components/ViewAllPosts/Posts.slice"
import { useAppDispatch } from "src/store/hooks"
import { Item } from "./FeaturedItem.styles"
import { formatDate } from "src/helpers/date"
import { PATH } from "src/constants/path"

const FeaturedItem = ({ title, createdAt, postId, image }) => {
  const dispatch = useAppDispatch()

  const content = handleShowContent(title, 59)
  const creatDate = formatDate(createdAt)

  const handleItemPost = (_id: string) => {
    dispatch(itemPostThunk(_id))
    dispatch(clearState())
  }

  return (
    <Col xl={4} lg={4} md={12} sm={12} className="featured-items mb-4">
      <Item>
        <Link
          to={`${PATH.ITEM_POST}/${postId}`}
          className="featured-item"
          onClick={() => handleItemPost(postId)}
        >
          <span className="item-images entry-image-wrap">
            <img src={image} alt="apple" />
          </span>
          <div className="entry-header entry-info">
            <span className="entry-category"> Technology</span>
            <h5 className="entry-title">{content}</h5>
            <span className="entry-meta">
              <span className="entry-author">
                <span className="sp"> by </span>
                <span className="author"> Team DUT </span>
              </span>
              <span className="entry-time">
                <span className="symbol">&bull;</span>
                <time className={createdAt}> {creatDate}</time>
              </span>
            </span>
          </div>
        </Link>
      </Item>
    </Col>
  )
}

export default FeaturedItem
