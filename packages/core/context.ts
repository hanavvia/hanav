import { Component } from 'vue'

export class Context {
  private components: Record<string, Component> = {}
  public getComponent = (name: string): Component | undefined => {
    return this.components[name]
  }
  public component = (name: string, comp: Component) => {
    this.components[name] = comp
  }
}


export const hanavContext = new Context();