import { type Dispatch, type FC, type SetStateAction } from "react";

import { classNames } from "../../../lib/classNames";

import './index.scss'


type NavBarItemProps = {
    item: BarItemType;
    activeToolId: string;
    setActiveToolId: Dispatch<SetStateAction<string>>;
}

export type BarItemType = {
    id: string;
    title: string;
    icon?: string;
    onClick?: () => void;
    position?: 'top' | 'bottom';
    separator?: boolean;
}

export const BarItem: FC<NavBarItemProps> = ({
    item,
    activeToolId,
    setActiveToolId
}) => {
    return <div
        key={item.id}
        className={classNames(
            'bar-item',
            {
                'bar-item--active': activeToolId === item.id,
                'bar-item--separator': item.separator
            }
        )}
        onClick={() => {
            setActiveToolId(item.id);
            item?.onClick?.();
        }}
    >
        <div className="bar-item__indicator">
            <img
                className="indicator__icon"
                alt=""
            />
        </div>
        <div
            className="bar-item__info"
            title={item.title}
        >
            <i className={`${item.icon} info__icon`} style={{fontSize: '1rem'}}></i>
        </div>
    </div>
}
