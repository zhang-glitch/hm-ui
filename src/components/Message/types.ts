import { VNode } from "vue"

export interface MessageProps {
  message: string | VNode;
  type?: 'success' | 'info' | 'warning' | 'danger';
  duration?: number;
  offset?: number;
  showClose?: boolean;
  showIcon?: boolean;
  id?: string;
  // onVnodeMounted?: (vnode: VNode) => void
  onDestory: () => void
}

export interface MessageExposes {
  close: () => void
}

export type CreateMessageProps = Omit<MessageProps, 'id' | "onDestory">