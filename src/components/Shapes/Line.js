import React from 'react';
import ToolTip from './ToolTip';
//import { G, Line as Line1 } from 'react-native-svg';
import { Svg } from 'expo';
const { G, Line:Line1 } = Svg;

export default class Line extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mouseOverMe:false
        }
    }
    mouseEntered(){
        this.setState({mouseOverMe:true});
    }
    mouseOut(){
        this.setState({mouseOverMe:false});
    }

    renderShape(){
        let {style, x1, y1, x2, y2} = this.props.attributes;            
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <G> 
                    <Line1 strokeWidth={style.strokeWidth} stroke={style.stroke} x1={x1} y1={y1} x2={x2} y2={y2}/>                    
                    <ToolTip name={name} x={x2} y={y2}/>
                </G>
            );
        }                         
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'10', strokeLinecap:'round'};
            return (
                <G> 
                    {this.state.mouseOverMe && <Line1 fill="none" strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeLinecap={'round'} strokeOpacity={0.5} x1={x1} y1={y1} x2={x2} y2={y2}/>}
                    <Line1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} x1={x1} y1={y1} x2={x2} y2={y2}/>
                    <Line1 onPressIn={()=>{this.mouseEntered();}} onPressOut={()=>{this.mouseOut(); this.props.removeDrawing(drawingId);}}
                        fill="none" strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeOpacity={0} x1={x1} y1={y1} x2={x2} y2={y2}/>
                </G>
            );
        }
        return(<Line1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    render(){
        return this.renderShape();
    }
} 