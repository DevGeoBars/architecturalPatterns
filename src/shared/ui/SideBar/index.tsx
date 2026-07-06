import React, {
  forwardRef,
  memo,
  type PropsWithChildren,
  useImperativeHandle,
  useState,
} from 'react';

import { classNames } from '../../lib/classNames';
import { BarItem, type BarItemType } from "../BarItem";


import './index.scss';


type SideBarProps = PropsWithChildren<{
  options: {
    minSize?: number;
    maxSize?: number;
    logoSrc?: string;
    isWide?: boolean;
  };
  items: Array<BarItemType>;
  defaultItemId?: string;
  barContent?: React.FC;
}>;

export type SideBarInstance = {
  setIsWide: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export const SideBar = memo(forwardRef<SideBarInstance, SideBarProps>(
    ({
        options,
        items,
        defaultItemId,
        barContent: SideBarContent,
        children,
      },
      ref,
    ) => {
      const {
        minSize = 60,
        maxSize = 340,
        logoSrc,
        isWide = false,
      } = options;

      const [_isWide, setIsWide] =
        useState<boolean>(isWide);

      const [activeToolId, setActiveToolId] =
        useState(
          defaultItemId ?? items[0]?.id,
        );

      useImperativeHandle(ref, () => ({
        setIsWide,
      }));

      const topItems = items.filter(
        item =>
          !item.position ||
          item.position === 'top',
      );

      const bottomItems = items.filter(
        item => item.position === 'bottom',
      );

      return (
        <div className="sidebar-layout">
          <div className="sidebar-layout__sidebar">

            <div
              className="sidebar-layout__icons"
              style={{ width: minSize }}
            >
              {logoSrc && (
                <div className="sidebar__logo-wrapper">
                  <img
                    className="sidebar__logo"
                    src={logoSrc}
                    alt=""
                    onClick={() =>
                      setIsWide(prev => !prev)
                    }
                  />
                </div>
              )}

              <div className="sidebar__nav-items sidebar__nav-items--top">
                {topItems.map(item => (
                  <BarItem
                    key={item.id}
                    item={item}
                    activeToolId={
                      activeToolId
                    }
                    setActiveToolId={
                      setActiveToolId
                    }
                  />
                ))}
              </div>

              <div className="sidebar__nav-items sidebar__nav-items--bottom">
                {bottomItems.map(item => (
                  <BarItem
                    key={item.id}
                    item={item}
                    activeToolId={
                      activeToolId
                    }
                    setActiveToolId={
                      setActiveToolId
                    }
                  />
                ))}
              </div>
            </div>
            <div
              className={classNames(
                'sidebar-layout__panel',
                {
                  'sidebar-layout__panel--open': _isWide,
                },
              )}
              style={{
                width: _isWide ? maxSize - minSize : 0,
              }}
            >
              <div className="sidebar-layout__panel-content">
                {SideBarContent && <SideBarContent/>}
              </div>
            </div>
          </div>

          <div className="sidebar-layout__page">
            {children}
          </div>
        </div>
      );
    },
  ),
);