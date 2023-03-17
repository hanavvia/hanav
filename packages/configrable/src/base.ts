import { NOOP } from "@vue/shared"
export default abstract class Base {
    constructor(name: string) {

    }
    public abstract mount: (container: string) => void
}

export interface BaseConfiguarableProps {
    container: string
    onRendered?: typeof NOOP
}