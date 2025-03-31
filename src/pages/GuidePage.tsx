import React from "react";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { GuidePageFull } from "../components/guides/guides-full-info/GuidePageFull";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const GuidePage: React.FC = () => {

    return (
        <CommonPageLayout>
             <Analytics />
<FloatingGif />
            <LoadingPageWrapper queryKeys={["guides", "tags", "ego","statuses","md-gifts", "identities"]}>
                <GuidePageFull />
            </LoadingPageWrapper>
        </CommonPageLayout>
    );
}
