import { Button, Card, Col, Dropdown, Modal, Row } from "react-bootstrap"
import { formatDate } from "src/helpers/date"
import { handleShowContent } from "src/helpers/string"
import { PostItemPage } from "./PostItem.styles"
import { useState } from "react"
import PostsApi from "src/apis/posts.api"
import { dataMyPost } from "../MyPost.slice"
import { useAppDispatch } from "src/store/hooks"
import { Link } from "react-router-dom"
import { PATH } from "src/constants/path"
import { itemPostThunk } from "src/components/ViewAllPosts/Posts.slice"

const PostItem = ({ title, image, createdAt, body, postId }) => {
  const content = handleShowContent(body, 150)
  const creatDate = formatDate(createdAt)
  const dispatch = useAppDispatch()

  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDeletePost = async (id: string) => {
    try {
      const response = await PostsApi.deletePost(id)
      if (response.status === 200) {
        console.log(response)
        dispatch(dataMyPost())
        setShow(false)
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleEdit = postId => {
    dispatch(itemPostThunk(postId))
  }
  return (
    <PostItemPage className="row m-0">
      <Col xs={12} className="p-0">
        <Card className="card-lastsNews-item">
          <Row className="lastsNews-item">
            <Col lg={3} md={4} sm={5} className=" card-lastsNews-image px-2">
              <Card.Img src={image} />
            </Col>
            <Col lg={9} md={8} sm={7} className="p-0">
              <Card.Body className="card-lastsNews-body">
                <Card.Title className="card-lastsNews-title mb-1">
                  {title}
                </Card.Title>
                <Card.Text as="div" className="card-lastsNews-text">
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </Card.Text>
                <span className="card-lastsNews-author">
                  by <span>Team DUT</span> • {creatDate}
                </span>
              </Card.Body>
            </Col>
          </Row>

          <Dropdown className="ml-3">
            <Dropdown.Toggle as="div" id="dropdown-p">
              <i className="fas fa-ellipsis-h"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-user_menu p-0">
              <Link
                to={`${PATH.MANAGE_POST}${PATH.EDIT_POST}/${postId}`}
                onClick={() => handleEdit(postId)}
              >
                <Dropdown.Item as="span" className="link link-plain py-2 px-3">
                  <i className="far fa-edit pr-3"></i>
                  Edit Post
                </Dropdown.Item>{" "}
              </Link>

              <Dropdown.Item
                href=""
                className="link link-plain py-2 px-3"
                onClick={() => handleShow()}
              >
                <i className="fas fa-times pr-3"></i>
                Remove Post
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeletePost(postId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </PostItemPage>
  )
}

export default PostItem
