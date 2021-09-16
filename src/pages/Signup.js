import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { StyledInput, StyledButton } from "components/common/Styled";
import { Grid, Text } from "components/common";

function Signup() {
  const dispatch = useDispatch();
  const signup_error = useSelector((state) => state.user.signup_error);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const passwordRef = useRef();
  passwordRef.current = watch("password");

  const onSubmit = (data) => {
    const { email, nickname, password } = data;
    dispatch(userActions.signupFB(email, password, nickname));
  };

  return (
    <Wrapper>
      <SignUpWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text size="26px" bold center margin="16px 0px">
            회원가입
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
                이메일 값을 입력해주세요.
              </Text>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <Text margin="0px" error>
                이메일 형식을 확인해주세요.
              </Text>
            )}
          </Grid>

          <Grid padding="8px 0px">
            <StyledInput
              name="nickname"
              placeholder="닉네임"
              error={errors.nickname}
              {...register("nickname", { required: true, maxLength: 10 })}
            />

            {errors.nickname && errors.nickname.type === "required" && (
              <Text margin="0px" error>
                닉네임 값을 입력해주세요.
              </Text>
            )}

            {errors.nickname && errors.nickname.type === "maxLength" && (
              <Text margin="0px" error>
                닉네임은 최대 10자 까지만 입력 가능합니다.
              </Text>
            )}
          </Grid>

          <Grid padding="8px 0px">
            <StyledInput
              name="password"
              type="password"
              autoComplete="off"
              placeholder="패스워드"
              error={errors.password}
              {...register("password", { required: true, minLength: 6 })}
            />

            {errors.password && errors.password.type === "required" && (
              <Text margin="0px" error>
                패스워드 값을 입력해주세요.
              </Text>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <Text margin="0px" error>
                패스워드는 최소 6글자 이상 입력해주세요.
              </Text>
            )}
          </Grid>

          <Grid padding="8px 0px 24px 0px">
            <StyledInput
              name="password_confirm"
              type="password"
              autoComplete="off"
              placeholder="패스워드 확인"
              error={errors.password_confirm}
              {...register("password_confirm", {
                required: true,
                minLength: 6,
                validate: (value) => value === passwordRef.current,
              })}
            />

            {errors.password_confirm && errors.password_confirm.type === "required" && (
              <Text margin="0px" error>
                패스워드 확인 값을 입력해주세요.
              </Text>
            )}

            {errors.password_confirm && errors.password_confirm.type === "minLength" && (
              <Text margin="0px" error>
                패스워드 확인 값은 최소 6글자 이상 입력해주세요.
              </Text>
            )}

            {errors.password_confirm && errors.password_confirm.type === "validate" && (
              <Text margin="0px" error>
                입력하신 패스워드와 일치하지 않습니다.
              </Text>
            )}
          </Grid>

          {signup_error && (
            <Text margin="0px" error>
              이미 회원가입된 이메일 입니다.
            </Text>
          )}

          <StyledButton type="submit" width="100%" padding="12px">
            회원가입
          </StyledButton>
        </form>
      </SignUpWrapper>

      <Text color="#bf1650" margin="32px 0px" bold>
        <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>
          이미 계정이 있으신가요? <span style={{ textDecoration: "underline" }}>로그인</span>
        </Link>
      </Text>
    </Wrapper>
  );
}

export default Signup;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  min-height: calc(100vh - 64px - 80px);
  background-color: #fafafa;
`;

const SignUpWrapper = styled.div`
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
