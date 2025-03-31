import React from "react";
import { useTranslation } from "react-i18next";
import { H1Component } from "../components/h1-component/H1Component";
import { TbSins } from "../components/tb-sins/TbSins";
import { TbSlots } from "../components/tb-slots/TbSlots";
import { TbTags } from "../components/tb-tags/TbTags";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const TeamBuilderPage:React.FC = () => {
    const {t} = useTranslation();
    return  <CommonPageLayout >
         <Analytics />
<FloatingGif />
        <LoadingPageWrapper queryKeys={["ego","identities","statuses"]}>
                <SEOHelmet titleText={t("TeamBuilderPage.title") + " | Great Limbus Library"} descriptionText=""/>
                <H1Component header={t("TeamBuilderPage.header")}/>
                <TbSlots/>
                <TbSins/>
                <TbTags/>
        </LoadingPageWrapper>
    </CommonPageLayout> 
}
