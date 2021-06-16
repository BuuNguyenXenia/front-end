import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { PATH } from "src/constants/path"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import ReviewItem from "./ReviewItem/ReviewItem"
import { getReviewsPosts, reviewsPostsSelector } from "./Reviews.slice"
import { ReviewsList } from "./Reviews.styles"
import ReviewTop from "./ReviewTop/ReviewTop"
import Loading from "../Loading/Loading"

export default function Reviews() {
  const dispatch = useAppDispatch()
  const reviewsPosts = useAppSelector(reviewsPostsSelector)
  const { current, isSuccess, isFetching } = reviewsPosts

  useEffect(() => {
    dispatch(getReviewsPosts())
  }, [])
  return (
    <ReviewsList>
      <div className="header-reviews">
        <h3 className="header-title">Reviews</h3>
        <Link to={PATH.ALL_POSTS} className="view-all">
          View all
        </Link>
      </div>
      <div className="view-list">
        <Row>
          <Col xl={6} lg={6} md={12} sm={12} className="mt-3">
            {isFetching && <Loading height={321.63} />}
            {isSuccess
              ? current
                  .slice(1, 2)
                  .map((el, i) => (
                    <ReviewTop {...el} key={"reviewsTop-item" + i} />
                  ))
              : null}
          </Col>
          <Col xl={6} lg={6} md={12} sm={12} className="mt-3">
            {isFetching && <Loading height={321.63} />}
            {isSuccess
              ? current
                  .slice(2, 5)
                  .map((el, i) => (
                    <ReviewItem {...el} key={"reviews-item" + i} />
                  ))
              : null}
          </Col>
        </Row>
      </div>
    </ReviewsList>
  )
}
