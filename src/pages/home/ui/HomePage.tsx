import {type FC} from 'react';

import './HomePage.scss';
import { ClaimsPage } from "@/pages/claims";
import { IssuesPage } from "@/pages/issues";

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

    return isSellerPartner ? <ClaimsPage /> : <IssuesPage />; // !!!TODO наршуает правила импортов

};