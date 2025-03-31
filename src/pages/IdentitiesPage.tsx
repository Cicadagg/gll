import React from "react";
import { useTranslation } from "react-i18next";
import { Filters } from "../components/filters/Filters";
import { H1Component } from "../components/h1-component/H1Component";
import { ListIds } from "../components/list-ids/ListIds";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const IdentitiesPage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout>
         <Analytics />
<FloatingGif />
            <LoadingPageWrapper queryKeys={["identities","statuses"]}>
                <SEOHelmet titleText={t("IdentitiesPage.title") + " | Great Limbus Library"} descriptionText=""/>
                <H1Component header={t("IdentitiesPage.header")}/>
                <Filters />
                <ListIds />
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
