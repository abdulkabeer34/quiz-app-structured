import { useQuery, useMutation } from '@tanstack/react-query';
import { getLogins } from '../../Apis';
import { SignupAuth } from '../../auth/signup-auth';
import { LoginAuth } from '../../auth/login-auth';

export const useLogin = (onSuccess) => {


  const loginData = useQuery({
    queryKey: ['loginData'],
    queryFn: getLogins,
    onSuccess:()=>onSuccess && onSuccess,
  });

  const singupMuation = useMutation({ queryKey: ['logindata'], queryFn: SignupAuth });
  const loginMutation = useMutation({ queryKey: ['logindata'], queryFn: LoginAuth });

  return { loginData, singupMuation, loginMutation};
};
