import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type FormData = {
  username: string;
  password: string;
};

const UserLogin = () => {
  const { handleSubmit, register } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      navigate("/");
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="아이디" {...register("username")} />
      <input type="text" placeholder="비밀번호" {...register("password")} />
      <input type="submit" />
    </form>
  );
};

export { UserLogin };
