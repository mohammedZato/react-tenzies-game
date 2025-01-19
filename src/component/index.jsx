import React from "react"

export default function DieElt(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#a3e635" : "#6b7280"
    }
    return (
        <div onClick={() => props.holdDice(props.id)} style={styles} class=" flex justify-center items-center font-bold text-3xl border bg-gray-300 w-16 h-16 rounded-xl cursor-pointer">
            <h2>{props.value}</h2>
        </div>
    )
}