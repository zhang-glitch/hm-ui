import { InjectionKey, Ref } from "vue"

export type NameType = string | number

type ExpandIconPosition = 'left' | 'right'

export interface CollapseProps {
  modelValue?: NameType[]
  accordion?: boolean
  expandIconPosition?: ExpandIconPosition
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType): void
}


export interface CollapseItemProps {
  title?: string
  name: NameType
  disabled?: boolean;
  icon?: string;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleCollapseItemClick: (name: NameType) => void;
  expandIconPosition: ExpandIconPosition
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')