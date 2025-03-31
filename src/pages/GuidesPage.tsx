import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { H1Component } from "../components/h1-component/H1Component";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";
import { ListGuides } from "../components/list-guides/ListGuides";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const GuidesPage:React.FC = () => {
    const {t} = useTranslation();
    const [totalCount, setTotalCount] = useState(0);

    return (
        <CommonPageLayout>
             <Analytics />
<FloatingGif />
            <LoadingPageWrapper queryKeys={["guides", "tags"]}>
                <SEOHelmet titleText={t("GuidesPage.title") + " | Great Limbus Library"} descriptionText=""/>
                <H1Component header={`${t("GuidesPage.header")}(${totalCount})`}/>
                <ListGuides onChangeCount={setTotalCount}/>
            </LoadingPageWrapper>
        </CommonPageLayout>
    )
}
