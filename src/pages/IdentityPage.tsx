import React from "react";
import { EntityFullInfoIdentityMain } from "../components/entity-full-info/EntityFullInfoIdentityMain";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const IdentityPage:React.FC = () => {
   
    return <CommonPageLayout>
         <Analytics />
<FloatingGif />
            <LoadingPageWrapper queryKeys={["identities","statuses"]}>
                <EntityFullInfoIdentityMain />
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
