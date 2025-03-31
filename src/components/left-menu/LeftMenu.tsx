import React, { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link,useLocation } from "react-router-dom";
import { locales } from "../../constants/locales";
import { mobileLayoutFrom } from "../../constants/mobileLayoutFrom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { LanguageSelect } from "../language-select/LanguageSelect";
import { ContactSVG } from "../svg/ContactSVG";
import { EGOSVG } from "../svg/EGOSVG";
import { GLLSVG } from "../svg/GLLSVG";
import { GraditudeSVG } from "../svg/GraditudeSVG"; 
import { TurnamentSVG } from "../svg/TurnamentSVG"; 
import { DiscordSVGforLeftMenu } from "../svg/DiscordSVGforLeftMenu";
import { IdentitiesSVG } from "../svg/IdentitiesSVG";
import { InfoSvg } from "../svg/InfoSVG";
import { StatusesPageSVG } from "../svg/StatusesPageSVG";
import { TeamBuilderSVG } from "../svg/TeamBuilderSVG";
import { TierListSVG } from "../svg/TierListSVG";
import { MirrorDungeonSVG } from "../svg/MirrorDungeonSVG";
import "./LeftMenu.css"
import { GuidesSVG } from "../svg/GuidesSVG";

export const LeftMenu:React.FC = () => {
    const location = useLocation();
    const {t,i18n} = useTranslation();
    const isMenuExpanded = useTypedSelector(store => store.leftMenuReducer);
    const isCurrentLocation = (route:string)=>{
        try{
            const splited = location.pathname.split("/");
            return splited[2].includes(route) && (splited.length === 3 || ["tierlist","mirror-dungeon"].includes(route));
        } catch (err){
            
        }
        return false
    }
    const navLang = locales.some(l => l.locale === i18n.language) ? i18n.language : "en";
    const links = [
        {to:`/${navLang}/graditude`,route:`graditude`,name:t('LeftMenu.graditude'),SVG:GraditudeSVG},
        {to:`/${navLang}/turnament`,route:`turnament`,name:t('LeftMenu.turnament'),SVG:TurnamentSVG},
        {to:`/${navLang}/tierlist/identities`,route:`tierlist`,name:t('LeftMenu.tierlist'),SVG:TierListSVG},
        {to:`/${navLang}/teambuilder`,route:`teambuilder`,name:t('LeftMenu.teambuilder'),SVG:TeamBuilderSVG},
        {to:`/${navLang}/identities`,route:`identities`,name:t('LeftMenu.identities'),SVG:IdentitiesSVG},
        {to:`/${navLang}/ego`,route:`ego`,name:t('LeftMenu.ego'),SVG:EGOSVG},
        {to:`/${navLang}/guides`,route:`guides`,name:t('LeftMenu.guides'),SVG:GuidesSVG},
        {to:`/${navLang}/mirror-dungeon/events`,route:`mirror-dungeon`,name:t('LeftMenu.mirror_dungeon'),SVG:MirrorDungeonSVG},
        {to:`/${navLang}/statuses`,route:`statuses`,name:t('LeftMenu.statuses'),SVG:StatusesPageSVG},
        {to:`/${navLang}/aboutgame`,route:`aboutgame`,name:t('LeftMenu.aboutgame'),SVG:InfoSvg},
        {to:`/${navLang}/contact`,route:`contact`,name:t('LeftMenu.contact'),SVG:ContactSVG},
        {to:`https://discord.gg/BGpmmqknWE`,route:`discord`,name:t('LeftMenu.discord'),SVG:DiscordSVGforLeftMenu}
    ];
    
    const [hasRendered, setHasRendered] = useState(false);

    useLayoutEffect(() => {
        setHasRendered(true); 
    }, []);

    const ref = useRef<HTMLDivElement>(null);
    
    return (
        <div ref={ref} 
            className={`left-menu ${hasRendered ? '' : 'first-render'} ${isMenuExpanded ? "left-menu--minimized" : "left-menu--maximized"} `}
            style={
                {
                    transform: (isMenuExpanded && window.innerWidth <= mobileLayoutFrom) ? `translateX(-100%)`: `translateX(0)`
                }
            }
        >
            <nav>
                <ul>
                <li><Link to={`/${navLang}/`}><GLLSVG/> <span>GREAT <span>BIMBUS</span> LIBRARY</span></Link></li>
                    {
                        links.map(({route,name,to,SVG}) =>{
                            const isCurrentRouteLocation = isCurrentLocation(route);
                             return(
                                <li key={route}>
                                    <Link 
                                    onClick={(e) => {
                                        if (isCurrentRouteLocation ) e.preventDefault(); 
                                    }}
                                    className={(isCurrentRouteLocation ? "left-menu-route--active":"")} 
                                    to={to}>
                                        <SVG active={isCurrentRouteLocation}/>
                                        {name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <LanguageSelect/>

        </div>

    )
}
