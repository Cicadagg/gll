import React from "react";
import { useTranslation } from "react-i18next";
import { CommonPageLayout } from "./CommonPageLayout";
import { SEOHelmet } from "./SEOHelmet";
import { GraditudeInfo } from "../components/graditute-info/GraditudeInfo";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const GraditudePage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout >
         <Analytics />
<FloatingGif />
            <SEOHelmet titleText={t("GraditudePage.title") + " | Great Limbus Library"} descriptionText=""/>
            <GraditudeInfo/>
    </CommonPageLayout>
}
