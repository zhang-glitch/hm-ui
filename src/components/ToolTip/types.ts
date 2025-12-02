import { Options, Placement } from "@popperjs/core";

export interface ToolTipProps {
  effect?: "dark" | "light";
  trigger?: "hover" | "click";
  content?: string;
  placement?: Placement;
  isManual?: boolean;
  popperOptions?: Partial<Options>;
  openDelay?: number;
  closeDelay?: number;
}

export interface ToolTipEmits {
  (e: "visible-change", value: boolean): void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}