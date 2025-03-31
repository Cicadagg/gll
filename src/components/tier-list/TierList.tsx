import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEntity } from "../item-entity/ItemEntity";
import { TierBar } from "./tier-bar/TierBar";
import { StatusesInterface } from "../../store/reducers/statuses-reducer";
import "./TierList.css"

type TRatings = {
    [key:string]:{
        data:React.ReactElement[],
        description:string
    }
}

export const TierList:React.FC = () => {
    const ids = useQueryClient().getQueryData("identities") as IdentityInterface[]|null;
    const ego = useQueryClient().getQueryData("ego") as EGOInterface[]|null;
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const {t,i18n} = useTranslation();
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);
    const params = useParams();
    const type = params["type"] || "";
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    
    // State for the disappearing button and panel
    const [hoverCount, setHoverCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [panelVisible, setPanelVisible] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        searchChangeTargetRefAction(dispatch,containerRef)
    },[])

    const handleButtonHover = (e: React.MouseEvent) => {
        e.preventDefault();
        if (hoverCount >= 3) return; // После 3 ховеров (4 раза) больше не двигаем

        const newCount = hoverCount + 1;
        setHoverCount(newCount);

        // Calculate new position to move away from cursor
        const button = buttonRef.current;
        if (button) {
            const buttonRect = button.getBoundingClientRect();
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;
            
            // Calculate vector from cursor to button center
            const dx = buttonCenterX - e.clientX;
            const dy = buttonCenterY - e.clientY;
            
            // Normalize and scale the vector
            const distance = Math.sqrt(dx * dx + dy * dy);
            const moveDistance = 100; // pixels to move
            const moveX = (dx / distance) * moveDistance;
            const moveY = (dy / distance) * moveDistance;
            
            setButtonPosition(prev => ({
                x: prev.x + moveX,
                y: prev.y + moveY
            }));
        }
    };

    const handleButtonClick = () => {
        if (hoverCount < 3) return; // Не реагируем на клики пока не навели 4 раза

        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount === 1) {
            setPanelVisible(false);
        } else if (newCount === 5) {
            setPanelVisible(false);
            setClickCount(0);
            setHoverCount(0);
            setButtonPosition({ x: 0, y: 0 });
        } else if (newCount > 1) {
            setPanelVisible(true);
        }
    };

    const resetButton = () => {
        setClickCount(0);
        setHoverCount(0);
        setButtonPosition({ x: 0, y: 0 });
        setPanelVisible(true);
    };

    const getPanelText = () => {
        switch (clickCount) {
            case 0:
                return i18n.language === 'ru' 
                    ? { title: "Сорри, че-то я засолил", subtitle: "P.S. K1inch" }
                    : { title: "Not today, baby", subtitle: "P.S. K1inch" };
            case 2:
                return i18n.language === 'ru'
                    ? { title: "Ты думал я уберус?", subtitle: "" }
                    : { title: "You think you can remove me?", subtitle: "" };
            case 3:
                return i18n.language === 'ru'
                    ? { title: "Но нет! На самом дели я Дио!", subtitle: "" }
                    : { title: "But no! I'm actually Dio!", subtitle: "" };
            case 4:
                return i18n.language === 'ru'
                    ? { title: "Ладно я не уберусь, но вот пароль от Турнира: 123456", subtitle: "" }
                    : { title: "Okay, I won't leave, but here's the password for the Tournament: 123456", subtitle: "" };
            default:
                return { title: "", subtitle: "" };
        }
    };

    const tierListClass = () =>{
        switch (type){
            case "identities":
                return "tier-list--ego-ids";
            case "ego":
                return "tier-list--ego-ids";
        }
        return "";
    }

    const tierListName = (tierListParam:string|null) =>{
        switch (tierListParam){
            case "identities":
                return t("TierList.name.identities");
            case "ego":
                return t("TierList.name.ego");
        }
        return "";
    }
    const getAllDataCount = (data:TRatings) =>{
        return Object.values(data).reduce((acc,item)=>{ acc+= item.data.length ; return acc} , 0);
    }

    const setupEGO = (ratings: TRatings) => {
        console.log('Начало сортировки EGO');
        
        ego?.forEach((item: EGOInterface, index) => {
            if (isFilterMatching(filterState, searchState, item, i18n.language, statuses)) {
                ratings[item.egoTier].data.push(<ItemEntity key={index} entity={item} />);
            }
        });
    
        console.log('Элементы до сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as EGOInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity || 'Нет данных'})`);
            });
        });
    
        Object.keys(ratings).forEach(key => {
            ratings[key].data.sort((a, b) => {
                const itemA = (a.props.entity as EGOInterface);
                const itemB = (b.props.entity as EGOInterface);

                const egoRarityOrder: { [key: string]: number } = {
                    ALEPH: 1,
                    WAW: 2,
                    HE: 3,
                    TETH: 4,
                    ZAYIN: 5,
                };
                
                const orderA = egoRarityOrder[itemA.rarity] || Infinity;
                const orderB = egoRarityOrder[itemB.rarity] || Infinity;
                
                return orderA - orderB;
            });
        });
    
        console.log('Элементы после сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as EGOInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity || 'Нет данных'})`);
            });
        });
    
        return ratings;
    }
    
    const setupIds = (ratings: TRatings) => {
        console.log('Начало сортировки Ids');
        
        ids?.forEach((item: IdentityInterface, index) => {
            if (isFilterMatching(filterState, searchState, item, i18n.language, statuses)) {
                ratings[item.idTier].data.push(<ItemEntity key={index} entity={item} />);
            }
        });
    
        console.log('Элементы до сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as IdentityInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity})`);
            });
        });
    
        Object.keys(ratings).forEach(key => {
            ratings[key].data.sort((a, b) => {
                const itemA = (a.props.entity as IdentityInterface);
                const itemB = (b.props.entity as IdentityInterface);
                
                const countA = itemA.rarity.split('O').length - 1;
                const countB = itemB.rarity.split('O').length - 1;
                
                return countB - countA;
            });
        });
        
    
        console.log('Элементы после сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as IdentityInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity})`);
            });
        });
    
        return ratings;
    }
    
    const setupItems = (params:string) =>{
        const ratings:TRatings = {
            "SSS":{
                data:[],
                description: t(`TierList.description.${params}.SSS`)
            },
            "SS":{
                data:[],
                description: t(`TierList.description.${params}.SS`)
            },
            "S":{
                data:[],
                description: t(`TierList.description.${params}.S`)
            },
            "A":{
                data:[],
                description:t(`TierList.description.${params}.A`)
            },
            "B":{
                data:[],
                description: t(`TierList.description.${params}.B`)
            },
            "C":{
                data:[],
                description: t(`TierList.description.${params}.C`)
            },
            "Test":{
                data:[],
                description: t(`TierList.description.${params}.Test`)
            },
        };
        if(params === "ego") return setupEGO(ratings);
        return setupIds(ratings);
    }
    const setupTierlist = () => {
        if (type === "identities") return [{
            tierListParam: "identities",
            ratings: setupItems(type),
        }];
        return [{
            tierListParam: "ego",
            ratings: setupItems(type),
        }];
    }
    
    const { title, subtitle } = getPanelText();
    
    return (
        <div style={{ position: 'relative' }}>
            <button
                ref={buttonRef}
                onMouseEnter={handleButtonHover}
                onClick={handleButtonClick}
                style={{
                    position: 'fixed',
                    top: `calc(50% + ${buttonPosition.y}px)`,
                    left: `calc(50% + ${buttonPosition.x}px)`,
                    transform: 'translate(-50%, -50%)',
                    padding: '10px 20px',
                    fontSize: '1.2rem',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: hoverCount >= 3 ? 'pointer' : 'none',
                    zIndex: 10000,
                    transition: 'transform 0.2s ease-out',
                }}
            >
                {i18n.language === 'ru' ? 'Убрать' : 'Kill'}
            </button>
            
            {panelVisible && clickCount !== 1 && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    maxWidth: '1800px',
                    minWidth: '1300px',
                    height: '600px',
                    backgroundColor: 'white',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                    fontSize: '2rem',
                    textAlign: 'center',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                    pointerEvents: 'none'
                }}>
                    {title && <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{title}</h1>}
                    {subtitle && <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>{subtitle}</p>}
                </div>
            )}
            
            <section ref={containerRef} className="tier-list-container" style={{ 
                filter: panelVisible && clickCount !== 1 ? 'blur(5px)' : 'none', 
                pointerEvents: panelVisible && clickCount !== 1 ? 'none' : 'auto',
                userSelect: panelVisible && clickCount !== 1 ? 'none' : 'auto'
            }}>
                {setupTierlist().map(({tierListParam,ratings} ,index)=>{
                    return (
                        <section key={index} className={["tier-list" , tierListClass()].join(" ")}>
                            <h2 className="tier-list-name">{tierListName(tierListParam) + ` (${getAllDataCount(ratings)})`}</h2>
                            {!getAllDataCount(ratings) && <p className="tier-list-text-empty">{t("Filters.empty")}  </p>}
                                {Object.entries(ratings).map((entry)=>{
                                    const [ratingKey , ratingValue] = entry;
                                    const {data,description} = ratingValue;
                                    if (data.length === 0) return null;
                                    return(
                                        <TierBar count={data.length} rating={ratingKey} description={description} key={ratingKey}>
                                            <React.Fragment>{data}</React.Fragment>
                                        </TierBar>
                                    )
                                })}
                        </section>
                    )
                })}
            </section>
        </div>
    )
}