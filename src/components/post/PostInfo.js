import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { history } from "redux/configureStore";
import { actionCreators as modalActions } from "redux/modules/modal";
import { ROUTES } from "utils/constants";
import PostHeader from "components/post/PostHeader";
import { StyledButton } from "components/common/Styled";
import CommentList from "components/comment/CommentList";

function PostInfo({ image_url, user_info, insert_dt, is_me, id, type }) {
  const { POST } = ROUTES;
  const dispatch = useDispatch();

  const MoveToPostPage = () => {
    history.push(`${POST}/${id}`);
    dispatch(modalActions.closeModal(false));
  };

  return (
    <Wrapper>
      <PostImage image_url={image_url} />
      <PostInfoWrapper>
        <PostHeader
          type="modal"
          user_info={user_info}
          insert_dt={insert_dt}
          is_me={is_me}
          id={id}
        />
        <CommentWrapper>
          <CommentList post_id={id} type="modal" />
        </CommentWrapper>

        {type === "modal" && (
          <StyledButton width="90%" padding="12px" margin="12px" onClick={MoveToPostPage}>
            게시글로 이동
          </StyledButton>
        )}
      </PostInfoWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const PostImage = styled.div`
  background: url("${({ image_url }) => image_url}");
  background-size: cover;
`;

const PostInfoWrapper = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center", "column")};
  background-color: #fff;
`;

const CommentWrapper = styled.div`
  width: 100%;
  height: calc(50vh - 100px);
`;
export default PostInfo;
