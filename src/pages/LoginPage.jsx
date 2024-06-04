import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { postLogin } from '../apis/Join';
import { useNavigate } from 'react-router-dom';
import { media } from '../styles/media';

const Container = styled.div`
  color: white;
  width: 100%;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
`;

const Part = styled.div`
  ${media.desktop`
  width: 465px;`}
  ${media.tablet`
  width: 400px;`}
  ${media.phone`
  width: 335px;`}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 95%;
  height: 35px;
  font-size: 13px;
  border: transparent;
  border-radius: 18px;
  padding-left: 15px;
  &:focus {
    outline: none;
  }
`;

const Btn = styled.input`
  width: 100%;
  height: 45px;
  border: transparent;
  border-radius: 22px;
  background-color: ${props => (props.$isValid ? '#e5b409' : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
`;

const ShowMsg = styled.div`
  width: 90%;
  font-size: 12px;
  color: ${props => (props.$isError ? 'green' : 'red')};
`;

const InputBox = ({ placeholder, type, value, setValue }) => {
  const inputChange = e => {
    setValue(e.target.value);
  };
  return <Input placeholder={placeholder} value={value} onChange={inputChange} type={type} />;
};

export default function LoginPage() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const [isId, setIsId] = useState(false);
  const [isPwd, setIsPwd] = useState(false);

  const [idMsg, setIdMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');

  const isValidId = id => {
    const re = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (id !== '') {
      if (re.test(id)) {
        setIdMsg('올바른 아이디 형식입니다!');
        setIsId(true);
      } else {
        setIdMsg('올바른 아이디 형식이 아닙니다!');
        setIsId(false);
        setIsValid(false);
      }
    } else {
      setIdMsg('아이디를 입력해주세요!');
      setIsId(false);
      setIsValid(false);
    }
  };

  const isValidPwd = pwd => {
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{4,12}$/;
    if (pwd !== '') {
      if (re.test(pwd)) {
        setPwdMsg('올바른 비밀번호입니다!');
        setIsPwd(true);
      } else {
        setPwdMsg('올바른 비밀번호가 아닙니다!');
        setIsPwd(false);
        setIsValid(false);
      }
    } else {
      setPwdMsg('비밀번호를 입력해주세요!');
      setIsPwd(false);
      setIsValid(false);
    }
  };

  useEffect(() => {
    isValidId(id);
    isValidPwd(pwd);
  }, [id, pwd]);

  useEffect(() => {
    if (isId && isPwd) {
      setIsValid(true);
    }
  }, [isId, isPwd]);

  const formData = {
    username: id,
    password: pwd,
  };

  const navigate = useNavigate();

  const postLoginQuery = useMutation(postLogin, {
    onSuccess: data => {
      console.log(data);
      window.localStorage.setItem('token', JSON.stringify(data.token));
      navigate('/');
      alert('로그인 성공!');
      window.location.reload();
    },
    onError: error => {
      console.error('Login failed:', error);
    }
  });

  const onClickBtn = e => {
    e.preventDefault();
    postLoginQuery.mutate({ formData: formData });
  };

  return (
    <Container>
      <Title>로그인 페이지</Title>
      <Part>
        <InputBox placeholder="아이디" value={id} setValue={setId} type="text" />
        <ShowMsg $isError={isId}>{idMsg}</ShowMsg>
      </Part>
      <Part>
        <InputBox placeholder="비밀번호" value={pwd} setValue={setPwd} type="password" />
        <ShowMsg $isError={isPwd}>{pwdMsg}</ShowMsg>
      </Part>
      {loginSuccessMsg && <ShowMsg $isError={true}>{loginSuccessMsg}</ShowMsg>}
      <Btn type="submit" onClick={onClickBtn} value={'제출하기'} $isValid={isValid} />
    </Container>
  );
}

