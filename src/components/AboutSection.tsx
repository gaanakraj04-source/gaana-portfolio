'use client'
import { useEffect, useRef } from 'react'
import {
  Clock, PerspectiveCamera, Scene, WebGLRenderer, SRGBColorSpace, MathUtils,
  Vector2, Vector3, MeshPhysicalMaterial, Color, Object3D, InstancedMesh,
  PMREMGenerator, SphereGeometry, AmbientLight, PointLight, ACESFilmicToneMapping,
  Raycaster, Plane,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// ── Three.js scene manager ──
class ThreeScene {
  canvas: HTMLCanvasElement
  camera: PerspectiveCamera
  scene: Scene
  renderer: WebGLRenderer
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0 }
  onBeforeRender: (s: { elapsed: number; delta: number }) => void = () => {}
  onAfterResize: (s: typeof this.size) => void = () => {}
  #clock = new Clock()
  #rafId = 0
  #elapsed = 0
  #delta = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.camera = new PerspectiveCamera(50, 1, 0.1, 100)
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
    this.renderer.outputColorSpace = SRGBColorSpace
    this.renderer.toneMapping = ACESFilmicToneMapping
    this.canvas.style.display = 'block'
    this.resize()

    const ro = new ResizeObserver(() => setTimeout(() => this.resize(), 100))
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const io = new IntersectionObserver(([e]) => {
      e.isIntersecting ? this.#start() : this.#stop()
    })
    io.observe(canvas)
  }

  resize() {
    const p = this.canvas.parentElement
    if (!p) return
    const w = p.offsetWidth, h = p.offsetHeight
    this.size.width = w; this.size.height = h; this.size.ratio = w / h
    this.camera.aspect = this.size.ratio; this.camera.updateProjectionMatrix()
    const fov = (this.camera.fov * Math.PI) / 180
    this.size.wHeight = 2 * Math.tan(fov / 2) * this.camera.position.z
    this.size.wWidth = this.size.wHeight * this.size.ratio
    this.renderer.setSize(w, h); this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.onAfterResize(this.size)
  }

  #start() {
    this.#clock.start()
    const loop = () => {
      this.#rafId = requestAnimationFrame(loop)
      this.#delta = this.#clock.getDelta()
      this.#elapsed += this.#delta
      this.onBeforeRender({ elapsed: this.#elapsed, delta: this.#delta })
      this.renderer.render(this.scene, this.camera)
    }
    loop()
  }

  #stop() { cancelAnimationFrame(this.#rafId); this.#clock.stop() }

  dispose() {
    this.#stop()
    this.scene.clear()
    this.renderer.dispose()
  }
}

// ── Physics engine ──
class Physics {
  config: Record<string, number>
  pos: Float32Array
  vel: Float32Array
  sizes: Float32Array
  center = new Vector3()

  constructor(cfg: Record<string, number>) {
    this.config = cfg
    this.pos = new Float32Array(3 * cfg.count)
    this.vel = new Float32Array(3 * cfg.count)
    this.sizes = new Float32Array(cfg.count)
    this.#init()
    this.#setSizes()
  }

  #init() {
    const { count, maxX, maxY, maxZ } = this.config
    this.center.toArray(this.pos, 0)
    for (let i = 1; i < count; i++) {
      const b = 3 * i
      this.pos[b] = MathUtils.randFloatSpread(2 * maxX)
      this.pos[b + 1] = MathUtils.randFloatSpread(2 * maxY)
      this.pos[b + 2] = MathUtils.randFloatSpread(2 * maxZ)
    }
  }

  #setSizes() {
    const { count, minSize, maxSize, size0 } = this.config
    this.sizes[0] = size0
    for (let i = 1; i < count; i++)
      this.sizes[i] = MathUtils.randFloat(minSize, maxSize)
  }

  update(delta: number) {
    const { config, pos, vel, sizes, center } = this
    // Control sphere0 follows cursor
    const c0 = new Vector3().fromArray(pos, 0).lerp(center, 0.1)
    c0.toArray(pos, 0)
    new Vector3(0, 0, 0).toArray(vel, 0)

    for (let i = 1; i < config.count; i++) {
      const b = 3 * i
      const p = new Vector3().fromArray(pos, b)
      const v = new Vector3().fromArray(vel, b)
      v.y -= delta * config.gravity * sizes[i]
      v.multiplyScalar(config.friction)
      v.clampLength(0, config.maxVelocity)
      p.add(v)

      // Simple collision
      for (let j = i + 1; j < config.count; j++) {
        const ob = 3 * j
        const op = new Vector3().fromArray(pos, ob)
        const diff = new Vector3().subVectors(op, p)
        const dist = diff.length()
        const sum = sizes[i] + sizes[j]
        if (dist < sum) {
          const ov = (sum - dist) * 0.5
          diff.normalize()
          p.addScaledVector(diff, -ov); op.addScaledVector(diff, ov)
          op.toArray(pos, ob)
        }
      }

      if (Math.abs(p.x) + sizes[i] > config.maxX) { p.x = Math.sign(p.x) * (config.maxX - sizes[i]); v.x *= -config.wallBounce }
      if (p.y - sizes[i] < -config.maxY) { p.y = -config.maxY + sizes[i]; v.y *= -config.wallBounce }
      if (Math.abs(p.z) + sizes[i] > config.maxZ) { p.z = Math.sign(p.z) * (config.maxZ - sizes[i]); v.z *= -config.wallBounce }
      p.toArray(pos, b); v.toArray(vel, b)
    }
  }
}

// ── Instanced spheres ──
const _obj = new Object3D()
class Spheres extends InstancedMesh {
  physics: Physics
  light: PointLight

  constructor(renderer: WebGLRenderer, cfg: Record<string, number>, colors: string[]) {
    const pmrem = new PMREMGenerator(renderer)
    const env = pmrem.fromScene(new RoomEnvironment(renderer)).texture
    pmrem.dispose()
    const geo = new SphereGeometry(1, 20, 20)
    const mat = new MeshPhysicalMaterial({
      envMap: env,
      metalness: 0.5,
      roughness: 0.3,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    })
    super(geo, mat, cfg.count)
    this.physics = new Physics(cfg)
    this.add(new AmbientLight(0xffffff, 1.5))
    this.light = new PointLight(0xffffff, 3, 100, 1)
    this.add(this.light)
    const colorObjs = colors.map(c => new Color(c))
    for (let i = 0; i < this.count; i++) this.setColorAt(i, colorObjs[i % colorObjs.length])
    if (this.instanceColor) this.instanceColor.needsUpdate = true
  }

  tick(delta: number) {
    this.physics.update(delta)
    for (let i = 0; i < this.count; i++) {
      _obj.position.fromArray(this.physics.pos, 3 * i)
      _obj.scale.setScalar(this.physics.sizes[i])
      _obj.updateMatrix()
      this.setMatrixAt(i, _obj.matrix)
    }
    this.instanceMatrix.needsUpdate = true
    this.light.position.fromArray(this.physics.pos, 0)
  }
}

const NAVY_PALETTE = ['#0D2240', '#1A3A5C', '#2E5F8A', '#5B8FA8', '#163552', '#0a1929']

export function AboutSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const pointer = useRef(new Vector2())

  // Scroll fade-up observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Three.js gravity spheres
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const three = new ThreeScene(canvas)
    three.camera.position.set(0, 0, 20)

    const cfg = {
      count: 80, minSize: 0.2, maxSize: 0.7, size0: 0.9,
      gravity: 0.35, friction: 0.995, wallBounce: 0.2, maxVelocity: 0.1,
      maxX: 10, maxY: 10, maxZ: 6,
    }

    const spheres = new Spheres(three.renderer, cfg, NAVY_PALETTE)
    three.scene.add(spheres)

    const raycaster = new Raycaster()
    const plane = new Plane(new Vector3(0, 0, 1), 0)
    const ip = new Vector3()

    const onPointer = (e: PointerEvent) => {
      pointer.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
    }
    window.addEventListener('pointermove', onPointer)

    three.onBeforeRender = ({ delta }) => {
      raycaster.setFromCamera(pointer.current, three.camera)
      if (raycaster.ray.intersectPlane(plane, ip)) spheres.physics.center.copy(ip)
      spheres.tick(delta)
    }

    three.onAfterResize = (size) => {
      spheres.physics.config.maxX = size.wWidth / 2
      spheres.physics.config.maxY = size.wHeight / 2
      spheres.physics.config.maxZ = size.wWidth / 4
    }

    return () => {
      window.removeEventListener('pointermove', onPointer)
      three.dispose()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Three.js gravity spheres — full section canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* Floating swimmer image */}
      <div
        className="float-img"
        style={{
          right: '5%',
          top: '12%',
          width: '180px',
          opacity: 0.12,
          transform: 'rotate(8deg)',
        }}
      >
        <img src="/images/swimmer.jpeg" alt="" style={{ width: '100%', filter: 'saturate(0.4)' }} />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          padding: '7rem 3rem 5rem',
          alignItems: 'start',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Left */}
        <div style={{ position: 'sticky', top: '6rem' }}>
          <p className="fade-up section-label" style={{ marginBottom: '1rem' }}>About</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: "'Abril Fatface', serif",
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              lineHeight: 1.05,
              color: 'var(--navy)',
              marginBottom: '2.5rem',
              transitionDelay: '0.1s',
            }}
          >
            Who is<br />
            <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'var(--navy-light)' }}>
              Gaana?
            </em>
          </h2>

          {/* Portrait placeholder */}
          <div
            style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'var(--navy)',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated ripple rings */}
            {[60, 140, 240, 360].map((size, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: `${size}px`, height: `${size}px`,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transform: 'translate(-50%, -50%)',
                  animation: `ripple 6s ease-out ${i * 1.5}s infinite`,
                }}
              />
            ))}
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
              portrait coming soon
            </span>
          </div>
        </div>

        {/* Right */}
        <div style={{ paddingTop: '1rem' }}>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.9,
              color: 'var(--navy-mid)',
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}
          >
            I&apos;m a <strong style={{ fontWeight: 500, color: 'var(--navy)' }}>Creative &amp; UI/UX Designer</strong> based in Birmingham, UK — drawn to the space where thoughtful design meets human feeling. My work is shaped by the belief that the best interfaces don&apos;t interrupt; they carry you forward, like a river finding its course.
          </p>

          <blockquote
            className="fade-up"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '1.35rem',
              lineHeight: 1.5,
              color: 'var(--navy)',
              borderLeft: '2px solid var(--navy-light)',
              paddingLeft: '1.5rem',
              margin: '2rem 0',
              transitionDelay: '0.1s',
            }}
          >
            "I didn&apos;t plan to become a designer — I fell into it the way you fall into a current."
          </blockquote>

          <p
            className="fade-up"
            style={{
              fontSize: '1rem',
              lineHeight: 1.9,
              color: 'var(--navy-mid)',
              marginBottom: '1.5rem',
              fontWeight: 300,
              transitionDelay: '0.15s',
            }}
          >
            My journey into design began with curiosity — a restlessness with things that didn&apos;t feel quite right. I found that UI/UX gave language to that feeling. Today I work across brand, digital, and communication design, with a deep interest in design that tells stories.
          </p>

          <p
            className="fade-up"
            style={{
              fontSize: '1rem',
              lineHeight: 1.9,
              color: 'var(--navy-mid)',
              marginBottom: '2.5rem',
              fontWeight: 300,
              transitionDelay: '0.2s',
            }}
          >
            Outside of screens, you&apos;ll find me <strong style={{ fontWeight: 500, color: 'var(--navy)' }}>painting, watching fish move through water,</strong> pressing flowers, and searching for the next view that makes me catch my breath.
          </p>

          {/* Interests */}
          <p className="fade-up section-label" style={{ marginBottom: '1rem', transitionDelay: '0.25s' }}>Interests</p>
          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.6rem',
              transitionDelay: '0.3s',
            }}
          >
            {['Painting', 'Nature', 'Typography', 'Illustration', 'Film', 'Journaling', 'Swimming', 'Botanics'].map(interest => (
              <div
                key={interest}
                style={{
                  background: 'var(--navy)',
                  color: 'var(--offwhite)',
                  padding: '0.6rem 0.9rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  borderRadius: '2px',
                  fontFamily: "'DM Sans', sans-serif",
                  opacity: 0.82,
                }}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.6); }
        }
      `}</style>
    </section>
  )
}
