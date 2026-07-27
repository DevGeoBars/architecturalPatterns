import { type FC, useEffect } from 'react';

import './LoginPage.scss';
import { Button } from "@primereact/ui/button";

type LoginPageProps = {};

export const LoginPage: FC<LoginPageProps> = () => {
  useEffect(() => {
    fetch('/api/users/current')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }, []);
    return (
        <div className="login-page-container">
            LoginPage page
          <Button>Verify</Button>
        </div>
    );
};
