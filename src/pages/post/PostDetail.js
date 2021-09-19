import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "redux/modules/post";
import PostInfo from "components/post/PostInfo";
import CommentWrite from "components/comment/CommentWrite";
import { Permit, Text } from "components/common";

function PostDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  const is_me = post?.user_info?.user_id === user_info?.uid;

  useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, [post, id, dispatch]);

  return (
    <Wrapper>
      <Text margin="16px" size="16px" bold>
        상세 페이지
      </Text>
      <PostDetailWrapper width="980px">
        {post && <PostInfo {...post} is_me={is_me} type="detail" />}
        <Permit>
          <CommentWrite post_id={id} />
        </Permit>
      </PostDetailWrapper>
    </Wrapper>
  );
}

export default PostDetail;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  min-height: calc(100vh - 64px - 80px);
  background-color: #fafafa;
`;

const PostDetailWrapper = styled.div`
  width: ${({ width }) => width};
  padding: 16px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  background-color: #fff;

  @media (max-width: 768px) {
    width: ${({ width }) => (width ? "100%" : "360px")};
  }
`;
