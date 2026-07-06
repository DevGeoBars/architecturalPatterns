import { type FC } from 'react';
import { Navigate } from 'react-router-dom';

import { APP_ROUTES } from "@/shared/routes";

import './HomePage.scss';


type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  const authStore = {
    User: {
      Role: 'Представитель партнера',
      ClaimsActivity: 'Seller'
    }
  };

  const isSellerPartner =
    authStore.User?.Role === 'Представитель партнера' &&
    authStore.User?.ClaimsActivity === 'Seller';

  return <Navigate
    to={isSellerPartner ? APP_ROUTES.CLAIMS : APP_ROUTES.ISSUES}
    replace
  />;

};