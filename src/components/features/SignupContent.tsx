import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import FieldForm from "@/components/ui/FieldForm";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

const SignupContent = () => {
  const naviget = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = () => {
    AuthService.signup(inputValue.email, inputValue.password) //
      .then((response) => {
        if (response) naviget("/");
      });
  };

  return (
    <ContentLayoutA>
      <ContentTitle title="회원가입" />
      <FieldFormBlock className="w-2/4">
        <FieldForm>
          <InputField
            label="이름"
            name="name"
            type="text"
            setOnChange={(e) => {
              setInputValue({ ...inputValue, name: e.target.value });
            }}
          />
          <InputField
            label="이메일"
            name="email"
            type="email"
            setOnChange={(e) => {
              setInputValue({ ...inputValue, email: e.target.value });
            }}
          />
          <InputField
            label="비밀번호"
            name="password"
            type="password"
            setOnChange={(e) => {
              setInputValue({ ...inputValue, password: e.target.value });
            }}
          />
        </FieldForm>
        <Button title="회원가입" variant="contain" size="full" position="bottom" onClick={handleSignup} />
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default SignupContent;
