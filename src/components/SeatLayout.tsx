import { useState } from "react"
import Swal from "sweetalert2";

interface BookedSeat{
    row: number,
    col: number,
    type: string
}

export function SeatLayout(){
    const [bookedSeat,setBookedSeat] = useState<BookedSeat[]>([])
    const [finalSeat,setFinalSeat] = useState<BookedSeat[]>([])
    const [vipSeats, setVipSeats] = useState(Array.from({length: 5},()=>{
        return Array(5).fill("#b4f8c8")
    }))
    const [generalSeats,setGeneralSeats] = useState(Array.from({length: 6}, ()=>{
        return Array(6).fill("#b4f8c8")
    }))
    const [economySeats,setEconomySeats] = useState(Array.from({length: 8},()=>{
        return Array(8).fill("#b4f8c8")
    }))

    const handleSeat = (rowIndex: number,colIndex: number, seatType: string) =>{
        const isAlreadyBooked = finalSeat.some(seat => seat.row === rowIndex && seat.col === colIndex && seat.type === seatType)

        if(isAlreadyBooked){
            return Swal.fire({
                title: "Error",
                text: "This seat is already booked",
                icon: "error"
            });
        }
        
        if(bookedSeat.length>=5){
            return Swal.fire({
            title: "Error",
            text: "You can only book 5 seats at once",
            icon: "error"
            });
        }
        let updateBookedSeat = [...bookedSeat]
        let updateFinalSeat = [...finalSeat]
        if(seatType === "VIP"){
            const updatedVipSeats = [...vipSeats]
            updatedVipSeats[rowIndex][colIndex] = updatedVipSeats[rowIndex][colIndex] === "#b4f8c8" ? "#F51720" : "#b4f8c8";
            updateBookedSeat.push({row: rowIndex,col: colIndex,type: seatType})
            updateFinalSeat.push({row: rowIndex,col: colIndex,type: seatType})
            setVipSeats(updatedVipSeats)
        }
        else if(seatType === "GENERAL"){
            const updateGeneralSeats = [...generalSeats]
            updateGeneralSeats[rowIndex][colIndex] = updateGeneralSeats[rowIndex][colIndex] === "#b4f8c8" ? "#F51720" : "#b4f8c8";
            updateBookedSeat.push({row: rowIndex,col: colIndex,type: seatType})
            updateFinalSeat.push({row: rowIndex,col: colIndex,type: seatType})
            setGeneralSeats(updateGeneralSeats)
        }
        else{
            const updateEconomySeats = [...economySeats] 
            updateEconomySeats[rowIndex][colIndex] = updateEconomySeats[rowIndex][colIndex] === "#b4f8c8" ? "#F51720" : "#b4f8c8";
            updateBookedSeat.push({row: rowIndex,col: colIndex,type: seatType})
            updateFinalSeat.push({row: rowIndex,col: colIndex,type: seatType})
            setEconomySeats(updateEconomySeats)
        }
        setBookedSeat(updateBookedSeat)
        setFinalSeat(updateFinalSeat)
    }

    const handleBooking = () => {
        const finalBookedSeat = [...bookedSeat]
        if(finalBookedSeat.length === 0){
            return Swal.fire({
                title: "Error",
                text: "You have selected 0 seats",
                icon: "error"
                });
        }
        const bookedSeatText = finalBookedSeat.map((value,index)=>`Seat -> ${index + 1} Row -> ${value.row} Column -> ${value.col} Seat Type -> ${value.type}`).join('<br>')
        Swal.fire({
            title: "Your Seats are booked",
            html: bookedSeatText,
            icon: "success"
          });
        setBookedSeat([])
    }
    
    return(
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="text-xl mb-4">
                VIP SEATS
            </div>
            <div className="grid gap-5" style={{gridTemplateColumns: `repeat(5,50px)`}}>
                {vipSeats.map((row,rowIndex) => {
                    return row.map((color,colIndex)=>{
                        return (
                            <div className="border flex justify-center h-14 w-14 cursor-pointer" style={{backgroundColor: color}} key={`${rowIndex}_${colIndex}`} onClick={()=>handleSeat(rowIndex,colIndex,"VIP")}>
                            </div>
                        )
                    })
                })}
            </div>
            <div className="text-xl mb-4 mt-10">
                GENERAL SEATS
            </div>
            <div className="grid gap-5" style={{gridTemplateColumns: `repeat(6,60px)`}}>
                {generalSeats.map((row,rowIndex) => {
                    return row.map((color,colIndex)=>{
                        return (
                            <div className="border flex justify-center h-14 w-14 bg-[#b4f8c8] cursor-pointer" style={{backgroundColor: color}} key={`${rowIndex}_${colIndex}`} onClick={()=>handleSeat(rowIndex,colIndex,"GENERAL")}>
                            </div>
                        )
                    })
                })}
            </div>
            <div className="text-xl mb-4 mt-10">
                ECONOMY SEATS
            </div>
            <div className="grid gap-5" style={{gridTemplateColumns: `repeat(8,60px)`}}>
                {economySeats.map((row,rowIndex) => {
                    return row.map((color,colIndex)=>{
                        return (
                            <div className="border flex justify-center h-14 w-14 bg-[#b4f8c8] cursor-pointer" key={`${rowIndex}_${colIndex}`} style={{backgroundColor: color}} onClick={()=>handleSeat(rowIndex,colIndex,"ECONOMY")}>
                            </div>
                        )
                    })
                })}
            </div>
            <div className="text-xl text-white mt-4 h-10">
                <button className="border rounded-xl bg-black h-10 w-28" onClick={handleBooking}>Book Now</button>
            </div>
        </div>
    )
}