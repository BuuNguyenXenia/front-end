import React from "react"
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  clearState,
  itemPostThunk
} from "src/components/ViewAllPosts/Posts.slice"
import { PATH } from "src/constants/path"
import { formatDate } from "src/helpers/date"
import { useAppDispatch } from "src/store/hooks"
import { DealsItem } from "./LatestDealsItem.styles"

const LatestDealsItem = ({ title, createdAt, postId, image }) => {
  const dispatch = useAppDispatch()

  const creatDate = formatDate(createdAt)

  const handleItemPost = (_id: string) => {
    dispatch(itemPostThunk(_id))
    dispatch(clearState())
  }
  return (
    <Col xs={6} className="mb-3 p-0">
      <DealsItem>
        <Link
          to={`${PATH.ITEM_POST}/${postId}`}
          className="deals-item-image wrapper-image"
          onClick={() => handleItemPost(postId)}
        >
          <img src={image} alt="img" />
        </Link>
        <div className="deals-item-body">
          <h5 className="deals-item-title wrapper-title">
            <Link
              to={`${PATH.ITEM_POST}/${postId}`}
              onClick={() => handleItemPost(postId)}
            >
              {title}
            </Link>
          </h5>
          <time dateTime={createdAt} className="deals-item-time wrapper-time">
            {creatDate}
          </time>
        </div>
      </DealsItem>
    </Col>
  )
}

export default LatestDealsItem
