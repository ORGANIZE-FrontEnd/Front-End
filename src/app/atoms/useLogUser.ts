// src/hooks/useLogUser.ts
import { useAtom } from 'jotai';
import { userAtom } from '@/app/atoms/authAtom';
import { useEffect } from 'react';

const useLogUser = () => {
  const [user] = useAtom(userAtom);

  useEffect(() => {
    console.log('User data from Jotai:', user);
  }, [user]);
};

export default useLogUser;
