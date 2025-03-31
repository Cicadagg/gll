import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { LanguageDisclaimer } from "../language-disclaimer/LanguageDisclaimer";
import { EntitySection } from "./EntitySection/EntitySection";
import { EventsSection } from "./EventsSection/EventsSection";
import { NewsSection } from "./NewsSection/NewsSection";
import { Link } from "react-router-dom";
import "./MainInfo.css";
import { NavigationSection } from "./NavigationSection/NavigationSection";
import { OfficialLinksSection } from "./OfficialLinksSection/OfficialLinksSection";
import { ToDoSection } from "./ToDoSection/ToDoSection";

export const MainInfo: React.FC = () => {
    const { t, i18n } = useTranslation();

    const quickStartLinks = [
        {
            text: t("MainInfo.headerDescription3"),
            to: `https://discord.gg/BGpmmqknWE`
        }
    ];

    const quickStartLinks2 = [
        {
            text: t("MainInfo.headerDescription5"),
            to: `https://boosty.to/gll-fun`
        }
    ];

    const NavLink: React.FC<{ to: string, text: string }> = ({ to, text }) => {
        const containerRef = useRef(null);
        return (
            <span className="text-support-site">
                <Link to={to} ref={containerRef} className={"support-link"}>
                    {text}
                </Link>
            </span>
        );
    };

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    };

    const handleClearCache = () => {
        if (inputValue === 'Ritsy') {
            console.log('Кеш очищен');
            window.localStorage.clear();
            window.sessionStorage.clear();
            setIsPanelOpen(false);
            setInputValue('');
            addLog('Кеш успешно очищен.');
        } else {
            console.log('Неправильный текст');
            addLog('Неправильный текст.');
        }
    };

    const addLog = (message: string) => {
        setLogs([...logs, message]);
    };

    const Panel = () => {
        const handlePanelClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        };
    
        return (
            <div className="panel panel-container" onClick={handlePanelClick}>
                <div className="input-group">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Введите текст"
                        className="input-field"
                    />
                    <span className="hint-text">Введите секретный код, чтобы получить результат</span>
                </div>
                <button className="textclier button-clear-cache" onClick={handleClearCache}>Отправить</button>
                <div className="console-panel console-container">
                    <div className="console-header">Логи</div>
                    <div className="console-logs">
                        {logs.map((log, index) => (
                            <p key={index}>{log}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
    

    return (
        <section className="main-info">
            <header className="main-info-header-main">
                <h1 onClick={() => setIsPanelOpen(!isPanelOpen)}> Great <span>BIMBUS</span> Library </h1>
                <p className="main-info-header-description">
                    {t(`MainInfo.headerDescription1`)}<br /><br />
                    {t(`MainInfo.headerDescription2`)}
                    {quickStartLinks.map((link, index) => (
                        <NavLink key={index} to={link.to} text={link.text} />
                    ))}
                    {t(`MainInfo.headerDescription4`)}
                    {quickStartLinks2.map((link, index) => (
                        <NavLink key={index} to={link.to} text={link.text} />
                    ))}
                    {t(`MainInfo.headerDescription6`)}
                </p>
                <LanguageDisclaimer />
                {isPanelOpen && <Panel />}
                
            </header>
            
            <section className="main-info-left">
            <div className="reklamimgdiv"><a  href="https://boosty.to/gll-fun" target="_blank" rel="noopener noreferrer">
                    <img className="reklamimg"
                        src={i18n.language === 'ru' ? `/images/reklamaru.png` : `/images/reklamaen.png`} 
                        alt="Boosty Link"
                    />
                </a></div>
            
                <EntitySection />
                <NavigationSection />
                <ToDoSection />
                <OfficialLinksSection />
            </section>
            <section className="main-info-right">
                <NewsSection />
                <EventsSection />
            </section>
        </section>
    );
}
