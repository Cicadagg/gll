import React, { useEffect} from "react";
import { TierList } from "../components/tier-list/TierList";
import { useNavigate, useParams } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { Filters } from "../components/filters/Filters";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { useTranslation } from "react-i18next";
import { H1Component } from "../components/h1-component/H1Component";
import { SEOHelmet } from "./SEOHelmet";
import { TierListDisclaimer } from "../components/tier-list-disclaimer/TierListDisclaimer";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент

const getQuaryByParam = (param:string) => {
    if(param === "identities") return ["identities","statuses"];
    return ["ego","statuses"];
}
export const TierListPage:React.FC = () => {
    const {i18n} = useTranslation();
    const params = useParams();
    const type = params['type'] || "redirect";
    const navigate = useNavigate();
    useEffect(()=>{
        if( !(["identities","ego"].includes(type)))  navigate(`/${i18n.language}/tierlist/identities`);
    },[])
    const queryKeys = getQuaryByParam(type);
    const {t} = useTranslation();
    return <CommonPageLayout>
         <Analytics />
            <LoadingPageWrapper queryKeys={queryKeys}>
                <SEOHelmet titleText={t("TierListPage.title") + " | Great Limbus Library"} descriptionText=""/>
                <H1Component header={t("TierListPage.header")}/>
                <TierListNav/>
                <TierListDisclaimer/>
                <Filters/>
                <TierList/>
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
