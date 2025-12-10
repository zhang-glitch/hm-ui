import type { VNode } from 'vue'
import type { ToolTipProps } from '../ToolTip/types'

export interface DropdownProps extends ToolTipProps {
  menuOptions: MenuOption[];
  hideToClick?: boolean; // 点击菜单项后隐藏
}
export interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void;
  (e: 'select', value: MenuOption): void;
}

export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}


