import logo from "../../img/sibdev-logo.svg";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import "./Loginpage.css";

function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function Autorisation() {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/185.244.172.108:8080/auth/login",
        {
          login: login,
          password: password,
        }
      )
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => alert("Неверные данные!"));
  }

  function quit() {
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={quit}>Выйтит</button>
        готово
      </div>
    );
  } else {
    return (
      <div className="login">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={Autorisation}
          className="login__form"
        >
          <img src={logo} alt="лого" className="login__logo"></img>
          <h2>Вход</h2>
          <Form.Item
            label="Логин"
            name="username"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Поле не может быть пустым!",
              },
            ]}
          >
            <Input onChange={handleLoginChange} value={login} />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Поле не может быть пустым!",
              },
            ]}
          >
            <Input.Password onChange={handlePasswordChange} value={password} />
          </Form.Item>
          <Form.Item>
            <Button
              className="login__button"
              type="primary"
              htmlType="submit"
              size="large"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginPage;