import React from "react";
import styled from "styled-components";
import PostHeader, { PostHeaderWrapper } from "components/post/PostHeader";
import PostFooter, { PostFooterWrapper } from "components/post/PostFooter";

function Post(props) {
  return (
    <Wrapper onClick={props._onClick}>
      <PostHeader
        type="page"
        user_info={props.user_info}
        insert_dt={props.insert_dt}
        is_me={props.is_me}
        id={props.id}
      />
      <PostImage src={props.image_url} alt={props.contents} />
      <PostFooter contents={props.contents} comment_cnt={props.comment_cnt} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:hover {
    opacity: 0.9;
  }

  &:hover ${PostHeaderWrapper} {
    opacity: 1;
  }

  &:hover ${PostFooterWrapper} {
    opacity: 1;
  }
`;

const PostImage = styled.img`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default React.memo(Post);
