import { useQuery, useMutation } from "@tanstack/react-query";
import { getLogins } from "../../Apis";
import { SignupAuth } from "../../auth/SignupAuth";
import { LoginAuth } from "../../auth/LoginAuth";

export const useLoginQuery = (onSuccess) => {


  const loginData = useQuery({
    queryKey: ["loginData"],
    queryFn: getLogins,
    onSuccess:()=>onSuccess && onSuccess,
  });

  const singupMuation = useMutation({ queryKey: ["logindata"], queryFn: SignupAuth });
  const loginMutation = useMutation({ queryKey: ["logindata"], queryFn: LoginAuth });

  return { loginData, singupMuation, loginMutation};
};
