import React, { createContext, useReducer, ReactNode } from 'react';
import * as actionType from '../store/actions';
import { CONFIG } from '../config/constant';

interface StateType {
  layout: string;
  collapseMenu: boolean;
  layoutType: string;
  isOpen: string[];
  isTrigger: string[];
  headerFixedLayout: boolean;
}

interface ActionType {
  type: string;
  layout?: string;
  menu?: { type: string; id: string };
  layoutType?: string;
}

const initialState: StateType = {
  layout: CONFIG.layout,
  collapseMenu: CONFIG.collapseMenu,
  layoutType: CONFIG.layoutType,
  isOpen: [],
  isTrigger: [],
  headerFixedLayout: false,
};

const ConfigContext = createContext<{ state: StateType; dispatch: React.Dispatch<ActionType> }>({
  state: initialState,
  dispatch: () => {},
});
const { Provider } = ConfigContext;

interface ConfigProviderProps {
  children: ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer((state: StateType, action: ActionType) => {
    let open = [...state.isOpen];
    let trigger = [...state.isTrigger];

    switch (action.type) {
      case actionType.CHANGE_LAYOUT:
        return {
          ...state,
          layout: action.layout!,
        };
      case actionType.COLLAPSE_MENU:
        return {
          ...state,
          collapseMenu: !state.collapseMenu,
        };
      case actionType.COLLAPSE_TOGGLE:
        const menuId = action.menu?.id ?? '';
        if (action.menu?.type === 'sub' && menuId) {
          const triggerIndex = trigger.indexOf(menuId);
          if (triggerIndex > -1) {
            open = open.filter((item) => item !== menuId);
            trigger = trigger.filter((item) => item !== menuId);
          } else {
            open.push(menuId);
            trigger.push(menuId);
          }
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger,
        };
      case actionType.LAYOUT_TYPE:
        return {
          ...state,
          layoutType: action.layoutType!,
        };
      case actionType.NAV_COLLAPSE_LEAVE:
        const menuIdNavLeave = action.menu?.id ?? '';
        if (action.menu?.type === 'sub' && action.menu?.id) {
          const triggerIndex = trigger.indexOf(action.menu.id);
          if (triggerIndex > -1) {
            open = open.filter((item) => item !== menuIdNavLeave);
            trigger = trigger.filter((item) => item !== menuIdNavLeave);
          }
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger,
        };
      case actionType.NAV_CONTENT_LEAVE:
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger,
        };
      case actionType.RESET:
        return {
          ...initialState,
          layout: CONFIG.layout,
          collapseMenu: CONFIG.collapseMenu,
          layoutType: CONFIG.layoutType,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { ConfigContext, ConfigProvider };
