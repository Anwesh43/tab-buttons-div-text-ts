import React, {useState, useEffect, Dispatch} from 'react'

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