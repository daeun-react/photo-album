import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "utils/constants";
import { actionCreators as userActions } from "redux/modules/user";
import { StyledInput, StyledButton } from "components/common/Styled";
import { Grid, Text } from "components/common";

function Login() {
  const { SIGNUP } = ROUTES;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const login_error = useSelector((state) => state.user.login_error);
  const onSubmit = (data) => {
    dispatch(userActions.loginFB(data.email, data.password));
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text size="26px" bold center margin="16px 0px">
            로그인
          </Text>

          <Grid padding="8px 0px">
            <StyledInput
              name="email"
              placeholder="이메일 주소"
              error={errors.email}
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === "required" && (
              <Text margin="0px" error>
                이메일을 입력해주세요.
              </Text>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <Text margin="0px" error>
                이메일 입력 형식을 확인해주세요.
              </Text>
            )}
          </Grid>

          <Grid padding="8px 0px 24px 0px">
            <StyledInput
              name="password"
              type="password"
              placeholder="패스워드"
              autoComplete="off"
              error={errors.password}
              {...register("password", { required: true, minLength: 6 })}
            />

            {errors.password && errors.password.type === "required" && (
              <Text margin="0px" error>
                패스워드를 입력해주세요.
              </Text>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <Text margin="0px" error>
                패스워드 값은 6글자 이상 입력해주세요.
              </Text>
            )}
          </Grid>

          {login_error && (
            <Text margin="0px" error>
              이메일 또는 패스워드를 다시 확인해주세요.
            </Text>
          )}

          <StyledButton type="submit" width="100%" padding="12px">
            로그인
          </StyledButton>
        </form>
      </LoginWrapper>

      <Text color="#333" margin="32px 0px" bold>
        <Link to={SIGNUP}>계정이 없으신가요? 회원가입</Link>
      </Text>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  min-height: calc(100vh - 64px - 80px);
  background-color: #fafafa;
`;

const LoginWrapper = styled.div`
  width: 360px;
  max-height: 100%;
  padding: 32px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  background-color: #fff;

  @media (max-width: 768px) {
    width: ${(props) => (props.width ? "100%" : "360px")};
  }
`;
