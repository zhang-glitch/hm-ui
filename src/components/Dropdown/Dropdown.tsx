import { computed, defineComponent, Fragment, ref } from 'vue'
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'
import ToolTip from '../ToolTip/ToolTip.vue'
export default defineComponent({
  name: 'HmDropdown',
  props: {
    effect: {
      type: String as PropType<'dark' | 'light'>,
      default: 'light'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideToClick: {
      type: Boolean,
      default: true
    },
    isManual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<InstanceType<typeof ToolTip>>(null)
    const itemClick = (e: MenuOption) => {
      if (e.disabled) {
        return
      }
      emit('select', e)
      if (props.hideToClick) {
        tooltipRef.value?.hide()
      }
    }
    const visibleChange = (e: boolean) => {
      emit('visible-change', e)
    }
    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided ? <li role="separator" class="divided-placeholder" /> : ''}
            <li
              class={{
                'hm-dropdown__item': true,
                'is-disabled': item.disabled,
                'is-divided': item.divided
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })
    return () => (
      <div class="hm-dropdown">
        {/* tsx中不能使用v-bind={props}结构props传递 */}
        <ToolTip
          effect={props.effect}
          trigger={props.trigger}
          placement={props.placement}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          popperOptions={props.popperOptions}
          menuOptions={props.menuOptions}
          hideToClick={props.hideToClick}
          isManual={props.isManual}
          ref={tooltipRef}
          onVisibleChange={visibleChange}
        >
          {{
            default: () => slots.default?.(),
            content: () => <ul class="hm-dropdown__menu">{options.value}</ul>
          }}
        </ToolTip>
      </div>
    )
  }
})
