'use client'
import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import Matter, {
  Bodies,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js"

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100
    return containerSize * percentage
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2
}

type GravityProps = {
  children: ReactNode
  debug?: boolean
  gravity?: { x: number; y: number }
  resetOnResize?: boolean
  grabCursor?: boolean
  addTopWall?: boolean
  autoStart?: boolean
  className?: string
  style?: React.CSSProperties
}

type MatterBodyProps = {
  children: ReactNode
  matterBodyOptions?: Matter.IBodyDefinition
  isDraggable?: boolean
  bodyType?: "rectangle" | "circle"
  x?: number | string
  y?: number | string
  angle?: number
  className?: string
  style?: React.CSSProperties
}

export type GravityRef = {
  start: () => void
  stop: () => void
  reset: () => void
}

type PhysicsBody = {
  element: HTMLElement
  body: Matter.Body
  props: MatterBodyProps
}

const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void
  unregisterElement: (id: string) => void
} | null>(null)

export const MatterBody = ({
  children,
  className,
  style,
  matterBodyOptions = {
    friction: 0.1,
    restitution: 0.1,
    density: 0.001,
    isStatic: false,
  },
  bodyType = "rectangle",
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(GravityContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    context.registerElement(idRef.current, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      isDraggable,
      x,
      y,
      angle,
      ...props,
    })
    return () => context.unregisterElement(idRef.current)
  }, [])

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        position: 'absolute',
        pointerEvents: isDraggable ? 'none' : 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = true,
      autoStart = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvas = useRef<HTMLDivElement>(null)
    const engine = useRef(Engine.create())
    const render = useRef<Render>()
    const runner = useRef<Runner>()
    const bodiesMap = useRef(new Map<string, PhysicsBody>())
    const frameId = useRef<number>()
    const mouseConstraintRef = useRef<Matter.MouseConstraint>()
    const mouseDown = useRef(false)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
    const isRunning = useRef(false)

    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!canvas.current) return
        const width = element.offsetWidth
        const height = element.offsetHeight
        const canvasRect = canvas.current.getBoundingClientRect()
        const angleRad = ((props.angle || 0) * Math.PI) / 180
        const x = calculatePosition(props.x, canvasRect.width, width)
        const y = calculatePosition(props.y, canvasRect.height, height)

        let body: Matter.Body
        if (props.bodyType === "circle") {
          const radius = Math.max(width, height) / 2
          body = Bodies.circle(x, y, radius, {
            ...props.matterBodyOptions,
            angle: angleRad,
            render: { fillStyle: "#00000000", strokeStyle: "#00000000", lineWidth: 0 },
          })
        } else {
          body = Bodies.rectangle(x, y, width, height, {
            ...props.matterBodyOptions,
            angle: angleRad,
            render: { fillStyle: "#00000000", strokeStyle: "#00000000", lineWidth: 0 },
          })
        }

        World.add(engine.current.world, [body])
        bodiesMap.current.set(id, { element, body, props })
      },
      [debug]
    )

    const unregisterElement = useCallback((id: string) => {
      const item = bodiesMap.current.get(id)
      if (item) {
        World.remove(engine.current.world, item.body)
        bodiesMap.current.delete(id)
      }
    }, [])

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position
        const rotation = body.angle * (180 / Math.PI)
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${
          y - element.offsetHeight / 2
        }px) rotate(${rotation}deg)`
      })
      frameId.current = requestAnimationFrame(updateElements)
    }, [])

    const startEngine = useCallback(() => {
      if (runner.current) {
        runner.current.enabled = true
        Runner.run(runner.current, engine.current)
      }
      if (render.current) Render.run(render.current)
      frameId.current = requestAnimationFrame(updateElements)
      isRunning.current = true
    }, [updateElements])

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return
      if (runner.current) Runner.stop(runner.current)
      if (render.current) Render.stop(render.current)
      if (frameId.current) cancelAnimationFrame(frameId.current)
      isRunning.current = false
    }, [])

    const clearRenderer = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current)
      if (mouseConstraintRef.current) World.remove(engine.current.world, mouseConstraintRef.current)
      if (render.current) {
        Mouse.clearSourceEvents(render.current.mouse)
        Render.stop(render.current)
        render.current.canvas.remove()
      }
      if (runner.current) Runner.stop(runner.current)
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
      bodiesMap.current.clear()
    }, [])

    const initializeRenderer = useCallback(() => {
      if (!canvas.current) return
      const height = canvas.current.offsetHeight
      const width = canvas.current.offsetWidth

      engine.current.gravity.x = gravity.x
      engine.current.gravity.y = gravity.y

      render.current = Render.create({
        element: canvas.current,
        engine: engine.current,
        options: {
          width,
          height,
          wireframes: false,
          background: "#00000000",
        },
      })

      const mouse = Mouse.create(render.current.canvas)
      mouseConstraintRef.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: debug } },
      })

      const walls = [
        Bodies.rectangle(width / 2, height + 10, width, 20, {
          isStatic: true, friction: 1, render: { visible: debug } as any,
        }),
        Bodies.rectangle(width + 10, height / 2, 20, height, {
          isStatic: true, friction: 1, render: { visible: debug } as any,
        }),
        Bodies.rectangle(-10, height / 2, 20, height, {
          isStatic: true, friction: 1, render: { visible: debug } as any,
        }),
      ]

      if (addTopWall) {
        walls.push(Bodies.rectangle(width / 2, -10, width, 20, {
          isStatic: true, friction: 1, render: { visible: debug } as any,
        }))
      }

      if (grabCursor) {
        const touchingMouse = () =>
          Query.point(
            engine.current.world.bodies,
            mouseConstraintRef.current?.mouse.position || { x: 0, y: 0 }
          ).length > 0

        Events.on(engine.current, "beforeUpdate", () => {
          if (canvas.current) {
            canvas.current.style.cursor =
              mouseDown.current && touchingMouse()
                ? "grabbing"
                : touchingMouse()
                ? "grab"
                : "default"
          }
        })

        canvas.current.addEventListener("mousedown", () => { mouseDown.current = true })
        canvas.current.addEventListener("mouseup", () => { mouseDown.current = false })
      }

      World.add(engine.current.world, [mouseConstraintRef.current, ...walls])
      render.current.mouse = mouse
      runner.current = Runner.create()
      Render.run(render.current)
      updateElements()
      runner.current.enabled = false

      if (autoStart) {
        runner.current.enabled = true
        startEngine()
      }
    }, [updateElements, debug, autoStart, gravity, addTopWall, grabCursor, startEngine])

    const reset = useCallback(() => {
      stopEngine()
      clearRenderer()
      initializeRenderer()
    }, [stopEngine, clearRenderer, initializeRenderer])

    useImperativeHandle(ref, () => ({ start: startEngine, stop: stopEngine, reset }), [
      startEngine, stopEngine, reset,
    ])

    useEffect(() => {
      if (!resetOnResize) return
      let timer: ReturnType<typeof setTimeout>
      const handleResize = () => {
        clearTimeout(timer)
        timer = setTimeout(reset, 500)
      }
      window.addEventListener("resize", handleResize)
      return () => { window.removeEventListener("resize", handleResize); clearTimeout(timer) }
    }, [reset, resetOnResize])

    useEffect(() => {
      initializeRenderer()
      return clearRenderer
    }, [])

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={canvas}
          className={className}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', ...style }}
          {...props}
        >
          {children}
        </div>
      </GravityContext.Provider>
    )
  }
)

Gravity.displayName = "Gravity"
