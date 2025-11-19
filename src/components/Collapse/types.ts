import { InjectionKey, Ref } from "vue"

export type NameType = string | number

export interface CollapseProps {
  modelValue?: NameType[]
  accordion?: boolean
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType): void
}


export interface CollapseItemProps {
  /**
   * @description 折叠面板的标题
   */
  title?: string
  /**
   * @description 唯一标志符
   */
  name: NameType
  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleCollapseItemClick: (name: NameType) => void;
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')