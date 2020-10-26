import { Rect, Svg } from '@svgdotjs/svg.js'
import { swap } from '~/assets/ts/sorts/sorts-helpers'

export enum SortColors {
  Base = '#ffffff',
  Selected = '#ff0000',
  Marker = '#00FF00',
}

export interface ViewObjectParams {
  ctx: Svg
  weight: any
}

export abstract class ViewObject {
  protected readonly ctx: Svg
  protected weight: any
  private $color: SortColors
  protected selected?: SortColors
  private selectCounter: number
  protected marker?: SortColors
  protected added: boolean = false

  protected constructor(params: ViewObjectParams) {
    this.ctx = params.ctx
    this.weight = params.weight
    this.$color = SortColors.Base
    this.selectCounter = 0
  }

  select(color: SortColors = SortColors.Selected) {
    this.selectCounter++
    this.selected = color
    this.setColor(this.getColor())
  }

  unselect(delay: number) {
    const _id = this.selectCounter
    return asyncDelay(() => {
      if (_id === this.selectCounter) {
        this.selected = undefined
        this.setColor(this.getColor())
      }
    }, delay)
  }

  mark(color: SortColors = SortColors.Marker) {
    this.marker = color
    this.setColor(this.getColor())
  }

  unmark() {
    this.marker = undefined
    this.setColor(this.getColor())
  }

  getColor() {
    if (this.marker) {
      return this.marker
    }
    if (this.selected) {
      return this.selected
    }
    return this.$color
  }

  abstract setColor(color: SortColors): void
  abstract draw(color?: SortColors): void
  abstract compareTo(vObj: ViewObject): number
  abstract swapTo(vObj: ViewObject): void
}

export interface ViewRectPrams extends ViewObjectParams {
  x: number
  y: number
  w: number
  h: number
  weight: number
}

export class ViewRect extends ViewObject {
  rect: Rect

  constructor(params: ViewRectPrams) {
    super(params)
    this.rect = new Rect()
      .attr('shape-rendering', 'optimizeSpeed')
      .size(params.w, params.h)
      .move(params.x, params.y)
      .fill(this.getColor())
  }

  draw(): void {
    if (!this.added) {
      this.ctx.add(this.rect)
    }
  }

  compareTo(vObj: ViewRect): number {
    if (this.weight > vObj.weight) {
      return 1
    }
    if (this.weight < vObj.weight) {
      return -1
    }
    return 0
  }

  swapTo(vObj: ViewRect): void {
    const x = this.rect.x()
    this.rect.x(vObj.rect.x())
    vObj.rect.x(x)
  }

  setColor(color: SortColors): void {
    if (color !== this.rect.fill()) {
      this.rect.fill(color)
    }
  }
}

export class ViewArray {
  private readonly ctx: Svg
  private width!: number
  private height!: number

  private array!: number[]
  private maxValue!: number
  private wRatio!: number
  private hRatio!: number

  viewObjects!: ViewCollection

  constructor(ctx: Svg) {
    this.ctx = ctx
  }

  setArray(array: number[]) {
    this.array = array
    this.maxValue = Math.max(...array)
    this.updateSizes()
    return this
  }

  updateSizes() {
    this.width = this.ctx.node.clientWidth
    this.height = this.ctx.node.clientHeight
    this.wRatio = this.width / this.array.length
    this.hRatio = this.height / this.maxValue
    this.updateViewObjects()
    return this
  }

  updateViewObjects() {
    const viewObjects = new ViewCollection()
    this.array.forEach((v, i) => {
      const w = this.wRatio
      const h = this.hRatio * v
      viewObjects.push(
        new ViewRect({
          ctx: this.ctx,
          weight: v,
          x: i * w,
          y: this.height - h,
          w,
          h,
        })
      )
    })
    this.viewObjects = viewObjects
    return this
  }

  draw() {
    this.viewObjects.forEach((vObj) => {
      vObj.draw()
    })
    return this
  }
}

export class ViewCollection extends Array<ViewObject> {
  mark(...indexes: number[]) {
    const items: ViewObject[] = []
    indexes.forEach((i) => {
      this[i].mark()
      items.push(this[i])
    })
    return () => {
      items.forEach((i) => i.unmark())
    }
  }

  unmark(...indexes: number[]) {
    indexes.forEach((i) => {
      this[i].unmark()
    })
  }

  select(indexes: number[], objects: ViewObject[] = []) {
    indexes.forEach((i) => {
      this[i].select()
    })
    objects.forEach((obj) => {
      obj.select()
    })
  }

  async unselect(delay: number, indexes: number[], objects: ViewObject[] = []) {
    const promisses: Promise<void>[] = []
    indexes.forEach((i) => {
      promisses.push(this[i].unselect(delay))
    })
    objects.forEach((obj) => {
      promisses.push(obj.unselect(delay))
    })
    await Promise.all(promisses)
  }

  async compareIndexes(i: number, j: number, delay: number) {
    this.select([i, j])
    await asyncDelay(() => {}, delay)
    this.unselect(50, [i, j])
    return this[i].compareTo(this[j])
  }

  async compareMixed(i: number, obj: ViewObject, delay: number) {
    this.select([i], [obj])
    await asyncDelay(() => {}, delay)
    this.unselect(50, [i], [obj])
    return this[i].compareTo(obj)
  }

  async swap(i: number, j: number, delay: number) {
    this.select([i, j])
    await asyncDelay(() => this[i].swapTo(this[j]), Math.max(delay / 3, 1))
    await asyncDelay(() => swap(this, i, j), Math.max(delay / 3, 1))
    this.unselect(50, [i, j])
  }
}

export interface ISortParams {
  delay: number
  array: ViewCollection
}

export abstract class Sort {
  delay: number
  A: ViewCollection

  constructor(options: ISortParams) {
    this.delay = options.delay
    this.A = options.array
  }

  public abstract start(): Promise<void>
}

export class BubbleSort extends Sort {
  protected async sort(): Promise<void> {
    const { A } = this
    const len = A.length
    for (let i = 0; i < len; i += 1) {
      for (let j = 0; j < len - 1; j += 1) {
        if ((await A.compareIndexes(j, j + 1, this.delay)) === 1) {
          await A.swap(j, j + 1, this.delay)
        }
      }
    }
  }

  public async start() {
    await this.sort()
  }
}

export class QuickSort extends Sort {
  protected async sort(A: ViewCollection, lo = 0, hi = A.length - 1) {
    const { delay } = this
    const p = A[Math.floor((lo + hi) / 2)]
    p.mark()
    let i = lo
    let j = hi
    while (i <= j) {
      while ((await A.compareMixed(i, p, this.delay)) === -1) {
        i++
      }
      while ((await A.compareMixed(j, p, this.delay)) === 1) {
        j--
      }
      if (i <= j) {
        await A.swap(i, j, delay)
        i++
        j--
      }
    }
    p.unmark()
    if (lo < j) {
      await this.sort(A, lo, j)
    }
    if (i < hi) {
      await this.sort(A, i, hi)
    }
  }

  public async start() {
    await this.sort(this.A)
  }
}

export const asyncDelay = <T>(cb: () => T, delay: number): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb())
    }, delay)
  })
}

export class ShellSort extends Sort {
  protected async sort(): Promise<void> {
    const { A } = this
    for (
      let step = Math.floor(A.length / 2);
      step > 0;
      step = Math.floor(step / 2)
    ) {
      for (let i = step; i < A.length; i += 1) {
        for (let j = i; j >= step; j -= step) {
          if ((await A.compareIndexes(j, j - step, this.delay)) !== 1) {
            await A.swap(j, j - step, this.delay)
          } else {
            break
          }
        }
      }
    }
  }

  public async start() {
    await this.sort()
  }
}
