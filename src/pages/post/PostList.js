import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "redux/modules/post";
import Post from "components/post/Post";
import Blackout from "components/modal/Blackout";
import Modal from "components/modal/Modal";
import InfinityScroll from "components/common/InfinityScroll";

function PostList() {
  const dispatch = useDispatch();
  const { list: post_list, paging, is_loading } = useSelector((state) => state.post);
  const user_info = useSelector((state) => state.user.user);

  const [isVisible, setIsVisible] = useState(false);
  const [showPost, setShowPost] = useState(null);

  const onSetIsVisible = (active) => {
    setIsVisible(active);
  };

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, [dispatch, post_list.length]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible]);

  return (
    <Wrapper>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}>
        <PostListWrapper>
          {post_list.map((p) => {
            return (
              <li key={p.id}>
                <Post
                  {...p}
                  is_me={p.user_info.user_id === user_info?.uid}
                  _onClick={() => {
                    onSetIsVisible(true);
                    setShowPost({ ...p });
                  }}
                />
              </li>
            );
          })}
        </PostListWrapper>
      </InfinityScroll>
      <Blackout isVisible={isVisible} onSetIsVisible={onSetIsVisible} />
      {showPost && <Modal isVisible={isVisible} onSetIsVisible={onSetIsVisible} Post={showPost} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  min-height: calc(100vh - 64px - 80px);
  background-color: #fafafa;
`;

const PostListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;

  li {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default PostList;
