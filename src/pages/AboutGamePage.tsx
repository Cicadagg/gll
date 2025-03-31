import React from "react";
import { useTranslation } from "react-i18next";
import { AboutGameInfo } from "../components/about-game-info/AboutGameInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { SEOHelmet } from "./SEOHelmet";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const AboutGamePage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout>
             <Analytics />
            <FloatingGif />
            <SEOHelmet titleText={t("AboutGamePage.title") + " | Great Limbus Library"} descriptionText=""/>
            <AboutGameInfo/>
    </CommonPageLayout> 
}
