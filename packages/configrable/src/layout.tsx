import Base from './base'
import { LayoutPropType } from '@hanav/components'
import { BaseConfiguarableProps } from './base'
import { HLayout } from '@hanav/components'
import { createVNode, defineComponent, reactive, render } from 'vue'

export type ConfiguarableLayoutProps = BaseConfiguarableProps & LayoutPropType

export class Layout extends Base {
  private props: ConfiguarableLayoutProps
  constructor(props: ConfiguarableLayoutProps) {
    super('Layout')
    this.props = props
    this.mount()
  }
  public mount = () => {
    const el = document.querySelector(this.props.container)
    const _this = this
    if (el) {
      const vnode = createVNode(
        defineComponent({
          components: {
            HLayout,
          },
          setup() {
            return () => {
              const props = reactive(_this.props)
              return (
                <HLayout {...props}/>
              )
            }
          },
        })
      )
      render(vnode, el, false)
    }
  }
}