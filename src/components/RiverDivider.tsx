interface RiverDividerProps {
  fromColor: string
  toColor: string
  flip?: boolean
}

export function RiverDivider({ fromColor, toColor, flip = false }: RiverDividerProps) {
  return (
    <div
      className="river-divider"
      style={{
        background: toColor,
        lineHeight: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '80px', transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <path
          d={
            flip
              ? 'M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,0 L0,0 Z'
              : 'M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 C1320,22 1380,55 1440,40 L1440,0 L0,0 Z'
          }
          fill={fromColor}
        />
      </svg>
    </div>
  )
}
