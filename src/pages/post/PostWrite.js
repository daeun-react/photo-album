import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spin, Input, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { history } from "redux/configureStore";
import { actionCreators as PostActions } from "redux/modules/post";
import { actionCreators as ImageActions } from "redux/modules/image";
import { ROUTES } from "utils/constants";
import Upload from "components/post/Upload";
import { StyledButton } from "components/common/Styled";
import { Spinner, Text } from "components/common";

function PostWrite(props) {
  const { LOGIN } = ROUTES;
  const { TextArea } = Input;

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const { list, is_uploading } = useSelector((state) => state.post);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const _post = is_edit ? list.find((p) => p.id === post_id) : null;
  const [contents, setContents] = useState(_post ? _post?.contents : "");

  const historyChange = (url) => {
    history.push(url);
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "입력을 확인해주세요.",
      description: "게시글 내용을 작성해주세요",
    });
  };

  const addPost = () => {
    if (!contents) {
      return openNotificationWithIcon("error");
    }
    dispatch(PostActions.addPostFB(contents));
  };

  const editPost = () => {
    if (!contents) {
      return openNotificationWithIcon("error");
    }
    dispatch(PostActions.editPostFB(post_id, { contents: contents }));
  };

  useEffect(() => {
    if (is_edit && !_post) {
      history.goBack();
    }
    if (is_edit) {
      dispatch(ImageActions.setPreview(_post.image_url));
    }
  }, [_post, dispatch, is_edit]);

  if (!is_login) {
    return (
      <Wrapper>
        <PostWriteWrapper>
          <Text size="32px" bold margin="16px 0px">
            앗!잠깐!
          </Text>
          <Text size="16px" margin="16px 0px">
            로그인 후에만 글을 쓸 수 있어요
          </Text>
          <StyledButton width="100%" padding="12px" onClick={() => historyChange(LOGIN)}>
            로그인 하러가기
          </StyledButton>
        </PostWriteWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Text margin="16px" size="16px" bold>
        {is_edit ? "게시글 수정" : "게시글 작성"}
      </Text>

      <Spin indicator={<Spinner />} spinning={is_uploading} size="large">
        <PostWriteWrapper width="768px">
          <Upload />
          <PreviewWrapper>
            <Text size="16px" bold>
              미리보기
            </Text>
            <PreviewImage src={preview ? preview : "http://via.placeholder.com/400x300"} />
          </PreviewWrapper>

          <TextArea
            value={contents}
            onChange={changeContents}
            placeholder="내용을 입력해주세요"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />

          {is_edit ? (
            <StyledButton width="100%" margin="12px 0px" padding="12px" onClick={editPost}>
              게시글 수정
            </StyledButton>
          ) : (
            <StyledButton width="100%" margin="12px 0px" padding="12px" onClick={addPost}>
              게시글 작성
            </StyledButton>
          )}
        </PostWriteWrapper>
      </Spin>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  min-height: calc(100vh - 64px - 80px);
  background-color: #fafafa;
`;

const PostWriteWrapper = styled.div`
  width: ${({ width }) => width};
  padding: 16px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  background-color: #fff;

  @media (max-width: 768px) {
    width: ${(props) => (props.width ? "100%" : "360px")};
  }
`;

const PreviewWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
`;

const PreviewImage = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default PostWrite;
