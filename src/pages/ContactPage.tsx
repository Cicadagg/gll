import React from "react";
import { useTranslation } from "react-i18next";
import { ContactInfo } from "../components/contact-info/ContactInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { SEOHelmet } from "./SEOHelmet";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const ContactPage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout >
         <Analytics />
        <FloatingGif />
            <SEOHelmet titleText={t("ContactPage.title") + " | Great Limbus Library"} descriptionText=""/>
            <ContactInfo/>
    </CommonPageLayout>
}
