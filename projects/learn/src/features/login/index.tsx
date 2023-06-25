import { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "@/stores";
import { Logo } from "@/components/Icons";
import { loginApp, loginByGithub } from "./api";

enum LoginType {
  Account,
  Github,
  WeChat,
  Email,
  FeiShu,
}

const Login = () => {
  const [user_name, setUserName] = useState("");
  const [pass_word, serPassWord] = useState("");
  const [loginType, setLoginType] = useState<LoginType>(LoginType.Account);
  const dispatch = useDispatch();

  const changeLoginType = () => {
    setLoginType((type) => (type + 1 > 4 ? 0 : type + 1));
  };

  const oauthGithub = () => {
    loginByGithub();
  }

  const handleChange = (
    e: FormEvent<HTMLInputElement>,
    key: "user_name" | "pass_word"
  ) => {
    console.log("value ==>", key);
    let value = e.currentTarget.value;
    value = value?.trim();
    switch (key) {
      case "user_name":
        setUserName(e.currentTarget.value);
        break;
      case "pass_word":
        serPassWord(e.currentTarget.value);
        break;
      default:
        console.log(`未知key:${key}`);
        break;
    }
  };

  const handleLogIn = () => {
    if (user_name && pass_word) {
      loginApp({ user_name, pass_word });
      // dispatch(login({ user_name, pass_word }));
    }
  };

  return (
    <div className="flex justify-between items-center flex-col w-xs h-sm shadow-2xl shadow-coolGray p-5 m-50">
      <div onClick={changeLoginType}>
        <Logo />
      </div>
      <header className="text-blue my-5 text-3xl text-center">MPS</header>
      {(function () {
        switch (loginType) {
          case LoginType.Account:
            return (
              <form>
                <label
                  className="flex justify-between items-center p1 m2 b-b-1 b-b-black-2"
                  hover="b-b-gray"
                >
                  <svg className="i-carbon-user text-blue mr-2" />
                  <input
                    className="flex-auto"
                    type="text"
                    placeholder="请输入账号"
                    value={user_name}
                    onInput={(e) => handleChange(e, "user_name")}
                  />
                </label>
                <label
                  className="flex justify-between items-center p1 m2 b-b-1 b-b-black-2"
                  hover="b-b-gray"
                >
                  <svg className="i-carbon-password text-blue mr-2" />
                  <input
                    className="flex-auto"
                    type="password"
                    placeholder="请输入密码"
                    value={pass_word}
                    onInput={(e) => handleChange(e, "pass_word")}
                  />
                </label>
                <button
                  className="bg-blue! text-blue-2 font-bold w-100% p-1 "
                  hover="bg-blue-2! text-white b-blue-2"
                  onClick={handleLogIn}
                  type="button"
                >
                  登录
                </button>
              </form>
            );
          case LoginType.Github:
            return <div onClick={oauthGithub}><Logo style="w-12" /></div>
          default:
            break;
        }
      })()}
    </div>
  );
};
export default Login;
