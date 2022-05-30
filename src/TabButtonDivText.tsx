import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'

interface TBDTProps {
    onClick : Function, 
    w : number, 
    h : number, 
    scale : number 
}
const TabButtonDivText = (props : TBDTProps) => {
    const {w, h, scale, onClick} = props
    const {blockStyle, textStyle, textParentStyle} = useStyle(w, h, scale) 
    return (
        <div>
            <button onClick = {() => onClick()}>Block 1</button>
            <button onClick = {() => onClick()}>Block 2</button>
            <div key = {'block1'} style = {blockStyle()}>
            </div>
            <div key = {'block2'} style = {textParentStyle()}>
                <div key = 'smallblock1' style = {textStyle()}>Hello Block 1 </div>
                <div key = 'smallblock1' style = {textStyle()}>Hello Block 2</div>
            </div>
        </div>
    )
}

export default withContext(TabButtonDivText)