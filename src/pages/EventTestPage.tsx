import React from "react";
import { TestComponentMDOption } from "../components/test-component-event/TestComponent";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент
import FloatingGif from '../components/FloatingGif';

export const EventTestPage:React.FC = () => {
    return <CommonPageLayout>
         <Analytics />
<FloatingGif />
    <LoadingPageWrapper queryKeys={["md-events","md-gifts","statuses"]}>
        <TestComponentMDOption/>
    </LoadingPageWrapper>
</CommonPageLayout> 
}
