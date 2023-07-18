


export const formatDate = (date)=>{
    const hours = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()
    return `${hours < 10 ? '0' + hours: hours} : ${minutes < 10 ? '0' + minutes : minutes }`
}

export const downloadMedia = (e, originalImage)=>{
    console.log(originalImage)
    e.preventDefault()
  
    try{
        fetch(originalImage)
        .then(resp=> resp.blob())
        .then(blob=>{
            console.log(blob)
            const url = window.URL.createObjectURL(blob)
            console.log(url)
            const a = document.createElement('a')
            console.log(a)
            a.style.display = 'none'
            a.href = url
            const nameSplit = originalImage.split('/')
            const duplicateName = nameSplit.pop()
            a.download = "" + duplicateName + ""
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        }).catch(error=> console.log("Error while downloading imagess", error))
    }
    catch(error){
        console.log("Error while downloading image", error.message)
    }
}