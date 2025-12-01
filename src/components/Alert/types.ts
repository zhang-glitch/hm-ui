
export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
  title?: string;
  type?: AlertType;
  description?: string;
  closable?: boolean;
  center?: boolean;
  showIcon?: boolean;
  effect?: 'light' | 'dark'
  autoClose?: number
}


export interface AlertEmits {
  (e: 'close'): void
}