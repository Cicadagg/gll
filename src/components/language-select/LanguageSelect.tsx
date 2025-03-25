import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { locales } from '../../constants/locales';
import useHover from '../../hooks/useHover';
import { GlobeSVG } from '../svg/GlobeSVG';
import { GoogleTranslateSVG } from '../svg/GoogleTranslate';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAnimations } from '../../store/slices/animationSlice';
import { RootState } from '../../store/store';
import "./LanguageSelect.css"

export const LanguageSelect:React.FC = () => {
    const [isShown, setIsShown] = useState(false);
    const ref = useRef(null);
    const isHovering = useHover(ref);
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const isAnimationsEnabled = useSelector((state: RootState) => state.animation.isAnimationsEnabled);
    const handleChangeLanguage = (locale:string) => {
        const isLocale = locales.some(l => l.locale === locale);
        if(!isLocale) locale = "en";
        i18n.changeLanguage(locale);
        navigate(`/${locale}${getPathnameWithoutLocale()}`)
    }
    const getPathnameWithoutLocale = () => {
        const {pathname} = location;
        let startIndex = 0; 
        let counBackslash = 0;
        for(let i = 0 ; i < pathname.length; i++){
            if(pathname[i] === "/") counBackslash++;
            if(counBackslash === 2){
                startIndex = i;
                break;
            }
        }
        return pathname.substring(startIndex);
    }

    useEffect(()=>{
        if(!isHovering && isShown) setIsShown(false);
    },[isHovering])

    useEffect(()=>{
        const locale = params["lang"];
        const storedLanguage = localStorage.getItem("i18nextLng") || "";
        const isStoredLnInLocale = locales.some(l=> l.locale === storedLanguage);
        const lang = isStoredLnInLocale ? storedLanguage : "en";

        if(!locale) { 
            i18n.changeLanguage(lang);
            navigate(`/${lang}/`);
        }else{
            const isStored = locales.some(l=> l.locale === locale);
            i18n.changeLanguage(isStored ? locale : "en");
        }
    },[location])

    return (
        <div className="language-controls">
            <div className={`dropdown ${isShown && "dropdown--show"}`} ref={ref} onClick={() => setIsShown(!isShown)}>
                <ul className={`LanguageSelect ${isShown && "LanguageSelect--show"}`}>
                    {
                        locales.map(
                            l => {
                                const {locale,name,isAutoTranslated} = l;
                                return  <li key={locale} onClick={() => handleChangeLanguage(locale)}>
                                    <button >
                                        {name} {isAutoTranslated && <GoogleTranslateSVG/>}
                                    </button>
                                </li>
                            }
                        )
                    }
                </ul>
                <span style={{display:"flex", alignItems:"center",gap:"9.6px"}}><GlobeSVG/>  {locales.find(l => l.locale === i18n.language)?.name} </span>
            </div>
        </div>
    );
};