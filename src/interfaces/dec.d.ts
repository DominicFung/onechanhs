import Square from "@square/web-sdk"

declare global {
  interface Window { Square: Square }
}

// Force TS to treate file as module
export {}