import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { postJoin } from '../apis/join';
import { useNavigate, Link } from 'react-router-dom';

const Container = styled.div`
  color: white;
  width: 100vw;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
`;
const Title = styled.h1`
  color: white;
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 400px;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  ::placeholder {
    color: #aaa;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  height: 15px;  // To ensure space is reserved even if there's no error message
`;

const Button = styled.input`
  width: 400px;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TextBox = styled.div`
  display: flex;
  margin-top: 10px;
  color: white;
`;

const NavLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: white;
`;

const Text = styled.div`
  margin-right: 10px;
`;

const InputBox = ({ placeholder, type, value, setValue }) => {
  const inputChange = e => {
    setValue(e.target.value);
  };
  return <Input placeholder={placeholder} value={value} onChange={inputChange} type={type} />;
};

const ShowMsg = styled.div`
  width: 300px;
  font-size: 12px;
  color: ${props => (props.$isError ? 'green' : 'red')};
`;

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [pwd, setPwd] = useState('');
  const [rePwd, setRePwd] = useState('');

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isRePwd, setIsRePwd] = useState(false);

  const [nameMsg, setNameMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [ageMsg, setAgeMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [rePwdMsg, setRePwdMsg] = useState('');

  const [isValid, setIsValid] = useState(false);

  const isValidName = name => {
    if (name !== '') {
      if (name.trim() === '') {
        setNameMsg('이름을 입력해주세요!');
        setIsName(false);
        setIsValid(false);
      } else {
        setNameMsg('');
        setIsName(true);
      }
    }
  };


  const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email !== '') {
      if (re.test(email)) {
        setEmailMsg('올바른 이메일 형식입니다!');
        setIsEmail(true);
      } else {
        setEmailMsg('올바른 이메일 형식이 아닙니다!');
        setIsEmail(false);
        setIsValid(false);
      }
    }
  };

  const isValidAge = age => {
    const re = /^[1-9]\d*$/;
    if (age !== '') { // 입력된 값이 있는 경우에만 검증하도록 수정
      if (age >= 19 && re.test(age)) {
        setAgeMsg('올바른 나이 형식입니다!');
        setIsAge(true);
      } else {
        if (age < 0) {
          setAgeMsg('나이는 양수여야 합니다.');
        } else if (age % 1 !== 0 && !isNaN(age)) setAgeMsg('나이를 실수로 입력할 수 없습니다.');
        else if (age < 19) setAgeMsg('19세 이상이어야 합니다!');
        else setAgeMsg('나이는 숫자로 입력해주세요!');
        setIsAge(false);
        setIsValid(false);
      }
    } else { // 입력된 값이 없는 경우 에러 메시지를 빈 문자열로 설정
      setAgeMsg(''); 
      setIsAge(false); // 에러 메시지가 표시되지 않음을 나타내는 상태를 false로 설정
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
    }
  };

  const checkPwdMatch = (pwd, rePwd) => {
    if (rePwd !== '') {
      if (pwd !== rePwd || pwd.trim() === '') {
        setRePwdMsg('비밀번호가 일치하지 않습니다.');
        setIsRePwd(false);
        setIsValid(false);
      } else {
        setRePwdMsg('비밀번호가 일치합니다');
        setIsRePwd(true);
      }
    }
  };

  useEffect(() => {
    isValidName(name);
    isValidEmail(email);
    isValidAge(age);
    isValidPwd(pwd);
    checkPwdMatch(pwd, rePwd);
  }, [name, email, age, pwd, rePwd]);

  useEffect(() => {
    if (isName && isEmail && isAge && isPwd && isRePwd) {
      setIsValid(true);
    }
  }, [isName, isEmail, isAge, isPwd, isRePwd]);

  const formData = {
    name: name,
    email: email,
    age: age,
    password: pwd,
    passwordCheck: rePwd,
  };

  const navigate = useNavigate();

  const postJoinQuery = useMutation(postJoin, {
    onSuccess: data => {
      console.log(data);
      alert('회원가입 성공!');
      navigate('/login');
    },
    onError: error => {
      console.log(error);
      if (error.message === 'Request failed with status code 409') {
        alert('이미 존재하는 아이디입니다.');
      } else if (error.message === 'Request failed with status code 400') {
        alert('비밀번호가 일치하지 않습니다.');
      }
    },
  });

  const onClickBtn = e => {
    e.preventDefault();

    if (isValid) {
      console.log(formData);
      postJoinQuery.mutate(formData); // formData 객체 자체를 전달합니다.
    }
  };

  return (
    <Container>
      <Title>회원가입 페이지</Title>
      <Form>
        <Part>
          <InputBox placeholder="이름을 입력해주세요" value={name} setValue={setName} type="text" />
          <ShowMsg $isError={isName}>{nameMsg}</ShowMsg>
        </Part>
        <Part>
          <InputBox placeholder="이메일을 입력해주세요" value={email} setValue={setEmail} type="text" />
          <ShowMsg $isError={isEmail}>{emailMsg}</ShowMsg>
        </Part>
        <Part>
          <InputBox placeholder="나이를 입력해주세요" value={age} setValue={setAge} type="text" />
          <ShowMsg $isError={isAge}>{ageMsg}</ShowMsg>
        </Part>
        <Part>
          <InputBox placeholder="비밀번호를 입력해주세요" value={pwd} setValue={setPwd} type="password" />
          <ShowMsg $isError={isPwd}>{pwdMsg}</ShowMsg>
        </Part>
        <Part>
          <InputBox placeholder="비밀번호 확인" value={rePwd} setValue={setRePwd} type="password" />
          <ShowMsg $isError={isRePwd}>{rePwdMsg}</ShowMsg>
        </Part>
      </Form>
      <Button type="submit" onClick={onClickBtn} value="제출하기" $isValid={isValid} />
      <TextBox>
        <Text>이미 아이디가 있으신가요?</Text>
        <NavLink to="/login">로그인페이지로 이동하기</NavLink>
      </TextBox>
    </Container>
  );
}