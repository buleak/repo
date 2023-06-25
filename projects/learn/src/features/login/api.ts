import { axios } from "@/apis/fetch";
import { LoginPayload } from "@/stores/slice_common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints(builder) {
    return {
      login: builder.query<any, LoginPayload>({
        query({ user_name, pass_word }) {
          return `login?user_name=${user_name}&pass_word=${pass_word}`;
        },
      }),
    };
  },
});

export const { useLoginQuery } = loginApi;

export const loginApp = ({ user_name, pass_word }: LoginPayload) =>
  axios(`login_account`, {
    method: "POST",
    body: {
      user_name,
      pass_word,
    },
  }).then((res) => {
    console.log("res ==>", res);
  });

export const loginByGithub = () => {
  axios(`auth/discord`).then((res) => {
    console.log("res", res);
  });
};
