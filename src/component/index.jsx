import React from "react"

export default function DieElt(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#a3e635" : "#6b7280"
    }
    return (
        <div onClick={() => props.holdDice(props.id)} style={styles} class="flex justify-center items-center font-bold text-3xl text-black border size-[52px] rounded-md cursor-pointer sm:size-16">
            <h2>{props.value}</h2>
        </div>
    )
}