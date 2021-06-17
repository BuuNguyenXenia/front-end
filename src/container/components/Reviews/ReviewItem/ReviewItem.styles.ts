import styled from "styled-components"

export const ItemReview = styled.div`
  min-height: calc(100% / 3 - 24px);
  .card-review-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    border: 1px solid var(--border-color);
    background-color: var(--post-card-bg);
  }
  .card-review-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .card-item {
    padding: 8px;
    margin: 0px;
  }
  .card-image {
    display: block;
    border-radius: 12px;
    img {
      width: 100%;
      padding: 4px 5px;
      border-radius: 15px;
    }
    :hover {
      opacity: 0.8;
    }
  }
  .card-body {
    padding: 0;
    margin-left: 10px;
    margin-top: 5px;
    small {
      color: var(--meta-color);
    }
  }
  .card-title {
    font-size: 15px;
    /* display: block; */
    font-weight: 700;
    line-height: 1.3em;
    a {
      color: var(--post-title-color);
      :hover {
        text-decoration: none;
        color: var(--main-color);
      }
    }
  }
`
