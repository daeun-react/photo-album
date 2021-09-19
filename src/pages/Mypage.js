import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Empty, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as postActions } from "redux/modules/post";
import { ROUTES } from "utils/constants";
import Post from "components/post/Post";
import { Text, InfinityScroll, Spinner } from "components/common";
import { StyledButton } from "components/common/Styled";

function Mypage() {
  const { POST } = ROUTES;
  const profileRef = useRef();
  const dispatch = useDispatch();

  const { my_post_list: post_list, mypage_paging, is_loading } = useSelector((state) => state.post);
  const user = useSelector((state) => state.user.user);
  const is_uploading = useSelector((state) => state.user.uploading_proflie);

  const handleClickProfile = () => {
    profileRef.current.click();
  };

  const handleChangeProfile = () => {
    const image = profileRef.current.files[0];
    if (!image) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      dispatch(userActions.updateProfileFB(reader.result));
    };
  };

  const historyChange = (url) => {
    history.push(url);
  };

  const renderMyPosts = () => {
    return post_list.map((p) => (
      <li key={p.id}>
        <Post
          {...p}
          is_me={true}
          _onClick={() => {
            historyChange(`${POST}/${p.id}`);
          }}
        />
      </li>
    ));
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(postActions.getPostByIdFB(user.uid));
  }, [user, dispatch]);

  return (
    <Wrapper>
      <Text margin="16px" size="16px" bold>
        마이 페이지
      </Text>
      <Spin indicator={<Spinner />} spinning={is_uploading} size="large">
        <MyPageWrapper>
          <input
            type="file"
            ref={profileRef}
            onChange={handleChangeProfile}
            style={{ display: "none" }}
          />

          <UserSection>
            <UserImage src={user?.user_profile} alt={`${user?.user_name} profile`} />
            <UserInfo>
              <Text size="30px">{user?.user_name}</Text>
              <Text size="20px">{user?.id}</Text>
              <StyledButton onClick={handleClickProfile} padding="12px">
                프로필 사진 바꾸기
              </StyledButton>
            </UserInfo>
          </UserSection>

          <PostSection>
            {post_list.length > 0 ? (
              <InfinityScroll
                callNext={() => {
                  dispatch(postActions.getPostByIdFB(user.uid, mypage_paging.next));
                }}
                is_next={mypage_paging.next ? true : false}
                loading={is_loading}>
                <Text margin="8px auto" size="16px" bold>
                  내 작성글
                </Text>
                <MyPostCards>{renderMyPosts()}</MyPostCards>
              </InfinityScroll>
            ) : (
              <Empty description={"작성된 포스트가 없습니다"} />
            )}
          </PostSection>
        </MyPageWrapper>
      </Spin>
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  min-height: calc(100vh - 64px - 80px);
  background-color: #fafafa;
`;

const MyPageWrapper = styled.div`
  width: 980px;
  max-height: 100%;
  padding: 32px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  background-color: #fff;
`;

const UserSection = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  padding: 5px;
  border-radius: 100%;
  border: 1px solid #e0e0e0;
`;

const UserInfo = styled.div`
  margin: auto 20px;
  line-height: 2;
  height: 100%;
`;

const PostSection = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  min-height: 300px;
`;

const MyPostCards = styled.ul`
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
