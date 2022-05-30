import React, {useState, useEffect, Dispatch, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.01
export const useAnimatedScale = () => {
    const [scale, setScale]  = useState(0)
    const [dir, setDir] = useState(1)
    const [animated, setAnimated]  = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1 || prev < 0) {
                            setAnimated(false)
                            clearInterval(interval)
                            setScale((1 + dir) / 2)
                            setDir(dir * -1)
                        }
                        return prev + scGap * dir 
                    })
                }, delay)
            }           
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    }, [])
    return {
        w, 
        h
    }
}

export const useStyle = (w : number, h : number, scale : number) => {
    const background : string  = 'green'
    const color : string = "white"
    const position : 'absolute' | 'relative' | 'fixed' = 'absolute'
    const size = Math.min(w, h) / 5
    return {
        blockStyle() : CSSProperties {
            const top = `0px`
            const width = `${size}px`
            const height = `${size}px`
            const left = `${(w - size) * scale}px`
            return {
                position,
                top,
                left, 
                width, 
                height 
            }
        },
        textStyle() : CSSProperties {
            return {
                color, 
                fontSize: `24px`
            }
        },

        textParentStyle() : CSSProperties {
            return {
                display: 'flex',
                justifyContent: 'space-between',
                width: `${size}px`,
                height: `${size}px`
            }
        }
    }
}