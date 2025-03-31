import React from "react";
import { useTranslation } from "react-i18next";
import { H1Component } from "../components/h1-component/H1Component";
import { StatusesTable } from "../components/statuses-table/StatusesTable";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const StatusesPage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout >
         <Analytics />
<FloatingGif />
        <LoadingPageWrapper queryKeys={["statuses"]}>
            <SEOHelmet titleText={t("StatusesPage.title") + " | Great Limbus Library"} descriptionText=""/>
            <H1Component header={t("StatusesPage.header")}/>
            <StatusesTable/>
        </LoadingPageWrapper>
    </CommonPageLayout> 
}
