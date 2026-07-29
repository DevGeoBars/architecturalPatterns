import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './index.scss';



export interface SidebarItem {
  id: string;
  title: string;
  icon?: string;
  onClick?: () => void;
  position?: 'top' | 'bottom';
  separator?: boolean;
}

interface SidebarSimpleProps {
  items: SidebarItem[];
  defaultExpanded?: boolean;
  minWidth?: number;
  maxWidth?: number;
  logoSrc?: string;
  title?: string;
}

export interface SidebarSimpleInstance {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar = forwardRef<SidebarSimpleInstance, SidebarSimpleProps>(
  ({ items, defaultExpanded = false, title, minWidth = 60, maxWidth = 240, logoSrc }, ref) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [activeId, setActiveId] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      setExpanded,
    }));

    const toggle = () => setExpanded(prev => !prev);

    const handleItemClick = (item: SidebarItem) => {
      setActiveId(item.id);
      item.onClick?.();
    };

    return (
      <nav
        className="sidebar"
        style={{
          width: expanded ? maxWidth : minWidth,
        }}
      >
        <div className="sidebar__toggle" onClick={toggle}>
          {!expanded ? (
            <img src={logoSrc} alt="toggle" className="sidebar__logo" />
          ) : (
            <span className="sidebar__burger">☰</span>
          )}
          {title && expanded && (
            <div className="sidebar__title">
              {title}
            </div>
          )}
        </div>

        <ul className="sidebar__list">
          {items.map(item => (
            <li key={item.id}>
              <button
                className={`sidebar__item ${activeId === item.id ? 'sidebar__item--active' : ''}`}
                onClick={() => handleItemClick(item)}
                title={!expanded ? item.title : undefined}
              >
                <i className={item.icon}/>
                {expanded && <span className="sidebar__label">{item.title}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);
