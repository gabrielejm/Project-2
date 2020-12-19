$(document).ready(()=>{
    const addRating = $(".rating")
    const addHoursPlayed = $(".hours")
    const addType = $(".type")
    const updateGame = $(".status")
    const designatedList = $("")
    let gamesList = $(".table-body")
    const pickListBtn = $(".drop")
    const user = localStorage.getItem("user")
    
    renderList = () => {
        $.get(`/api/user_data/${user}`)
        .then(data => {
            renderTable(data)
        })
    }
    
    const renderSpecified = () => {
        console.log("changed")
        let currentStatus = pickListBtn.val()
        gamesList.empty()
        if (currentStatus === "All"){
            renderList()
        } else{
            $.get(`/api/user_data/${user}/${currentStatus}`)
            .then(data => {
                renderTable(data)
            })
        }
    }
    
    const renderTable = (data) =>{
        for (let i = 0; i < data.length; i++){
            //Appending Row variables
            let newRow = $("<tr>")
            let title = $("<td>")
            let status = $("<td>")
            let type = $("<td>")
            let hours = $("<td>")
            let ratings = $("<td>")
            let buttons = $("<td>")
            //Sub Row Variables
            let statusDropDown = $("<select>").attr("class", `status`).attr('id',`${data[i].id}`)
            let playing =$("<option>").text("Currently Playing")
            let completed =$("<option>").text("Completed")
            let wantToPlay =$("<option>").text("Want to Play")
            

            let typeDropDown = $("<select>").attr("class", `type`).attr('id',`${data[i].id}`)
            let singlePlayer =$("<option>").text("Single Player")
            let multiPlayer= $("<option>").text("Multiplayer")


            let ratingInput = $("<input>").attr("id",`rating-${data[i].id}`).css({'width' : '25px'})
            let hoursInput = $("<input>").attr("id",`hours-${data[i].id}`).css({'width' : '25px'})
            let deleteBtn = $("<button>").text("Delete").attr("class",`Delete`).attr('id',`${data[i].id}`)
            let updateBtn = $("<button>").text("Update").attr("class",`Update`).attr('id', `${data[i].id}`)

            //Add title
            title.text(data[i].title)

            //Add status
            if (data[i].status === "Currently Playing"){
                statusDropDown.append(playing)
                statusDropDown.append(completed)
                statusDropDown.append(wantToPlay)
            } else if (data[i].status === "Completed"){
                statusDropDown.append(completed)
                statusDropDown.append(playing)
                statusDropDown.append(wantToPlay)
            } else{
                statusDropDown.append(wantToPlay)
                statusDropDown.append(completed)
                statusDropDown.append(playing)
            }
            status.append(statusDropDown)

            //Add type
            if (data[i].type === "Multiplayer"){
                typeDropDown.append(multiPlayer)
                typeDropDown.append(singlePlayer)
            } else {
                typeDropDown.append(singlePlayer)
                typeDropDown.append(multiPlayer)
            }
            type.append(typeDropDown)
            
            //Add Hours Played
            hoursInput.val(data[i].hoursPlayed)
            hours.append(hoursInput)
            hours.append(" hours")

            //Add User Rating
            ratingInput.val(data[i].rating)
            ratings.append(ratingInput)
            ratings.append("/5")

            //Add Buttons to Row
            buttons.append(updateBtn)
            buttons.append(deleteBtn)

            //Appends Game Data to Row
            newRow.append(title)
            newRow.append(status)
            newRow.append(type)
            newRow.append(hours)
            newRow.append(ratings)
            newRow.append(buttons)

            //Appends Row to Page
            gamesList.append(newRow)
        }
    }
    
    pickListBtn.on("change", () => renderSpecified())
    addHoursPlayed.on("change", () => console.log("hours changed"))
    addRating.on("change", () => console.log("rate changed"))
    addType.on("change", () => console.log("type changed"))
    updateGame.on("change", () => console.log("game changed"))

    renderList() 
})