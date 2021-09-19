import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Skeleton } from "antd";
import PostHeader, { PostHeaderWrapper } from "components/post/PostHeader";
import PostFooter, { PostFooterWrapper } from "components/post/PostFooter";

function Post(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = props.image_url;
    image.onload = () => {
      setLoaded(true);
    };
  }, [props.image_url]);

  if (!loaded) return <Skeleton avatar paragraph={{ rows: 7 }} />;
  return (
    <Wrapper>
      <PostHeader
        type="page"
        user_info={props.user_info}
        insert_dt={props.insert_dt}
        is_me={props.is_me}
        id={props.id}
      />
      <PostImage
        src={props.image_url}
        alt={props.contents}
        loaded={loaded}
        onClick={props._onClick}
      />
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
  transition: all ease 1s 0s;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  width: 100%;
  height: 100%;
`;

export default React.memo(Post);
