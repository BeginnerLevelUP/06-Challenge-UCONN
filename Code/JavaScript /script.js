

async function weather(){
    const APIkey='17177cbd46b16334c70811527b0a120f'
    const lat='18.1096';
    const lon='-77.2975';
    const Url=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
    try{
        let response=await fetch(Url)
        response=await response.json()
        console.log(response)
    }
    catch(error){
        console.log(error)
    }
}
weather()


