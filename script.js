const container = document.querySelector('.container')
const clockContainer = container.querySelector('.clock-container')
const clockDisplay = clockContainer.querySelector('.clock')
const clockHoursDisplay = clockDisplay.querySelector('.clock-hours')
const clockMinutesDisplay = clockDisplay.querySelector('.clock-minutes')
const clockSecondsDisplay = clockDisplay.querySelector('.clock-seconds')
const digitalDisplay = clockContainer.querySelector('.digital-display')
const digitalHoursDisplay = digitalDisplay.querySelector('.digital-hours')
const digitalMinutesDisplay = digitalDisplay.querySelector('.digital-minutes')
const digitalSecondsDisplay = digitalDisplay.querySelector('.digital-seconds')
const modeSelected = clockContainer.querySelector('.selected-mode')
let  hours, minutes, seconds, milliseconds
const options = Array.from(clockContainer.querySelectorAll('.option'))
let optionSelected 
const alarmSet = container.querySelector('.alarm-set')
const inputSection = alarmSet.querySelector('.inputs-section')
const inputs = Array.from(inputSection.querySelectorAll('input'))
let hourAlarm, minuteAlarm, secondAlarm
let clockInterval, timerInterval, alarmInterval, chronoInterval
const init = () =>
{
    const date = new Date()
    hours = date.getHours()
    minutes = date.getMinutes()
    seconds = date.getSeconds()
    clockHoursDisplay.style.transform = `translateX(96px) rotateZ(${hours/12 * 360}deg)`
    clockMinutesDisplay.style.transform = `translateX(96px) rotateZ(${((minutes + seconds/60)/60)* 360}deg)`
    clockSecondsDisplay.style.transform = `translateX(98px) rotateZ(${seconds/60 * 360}deg)`
    digitalHoursDisplay.textContent = hours
    digitalMinutesDisplay.textContent = minutes
    digitalSecondsDisplay.textContent = seconds
}

init()

const clockFunction = () =>
{
    container.style.animationName = 'none'
    alarmSet.style.display = 'none'
    modeSelected.textContent = 'Clock'
    clearInterval(timerInterval)
    clearInterval(clockInterval)
    clearInterval(chronoInterval)
    clockInterval = setInterval(() => 
    {
        const date = new Date()
        hours = date.getHours()
        minutes = date.getMinutes()
        seconds = date.getSeconds()
        clockHoursDisplay.style.transform = `translateX(96px) rotateZ(${(hours/12 )* 360}deg)`
        clockMinutesDisplay.style.transform = `translateX(96px) rotateZ(${((minutes + seconds/60)/60)* 360}deg)`
        clockSecondsDisplay.style.transform = `translateX(98px) rotateZ(${(seconds/60 )* 360}deg)`
        digitalHoursDisplay.textContent = hours
        digitalMinutesDisplay.textContent = minutes
        digitalSecondsDisplay.textContent = seconds
        if(hourAlarm == hours && minutes == minuteAlarm && seconds == secondAlarm)
        {
            container.style.animationName = 'ring-animation'
        }
    }, 1000);
}

clockFunction()


for(const option of options)
{
    option.addEventListener('click', (event) =>
    {
        if(optionSelected)
            optionSelected.style.background = '#333333'
        optionSelected = option
        optionSelected.style.background = '#444444'

        if(optionSelected.classList.contains('timer-option'))
        {
            timerFunction()
        }
        if(optionSelected.classList.contains('clock-option'))
        {
            clockFunction()
        }

        if(optionSelected.classList.contains('alarm-option'))
        {
            alarmFunction()
        }

        if(optionSelected.classList.contains('chrono-option'))
        {
            chronoFunction()
        }

    })
}


let timerHours = 0 
let timerMinutes = 5
let timerSeconds = 0


const timerFunction = () =>
{
    container.style.animationName = 'none'
    alarmSet.style.display = 'none'
    timerHours = 0 
    timerMinutes = 5
    timerSeconds = 0
    clearInterval(timerInterval)
    clearInterval(clockInterval)
    clearInterval(alarmInterval)
    clearInterval(chronoInterval)
    modeSelected.textContent = 'Timer of 5 minutes'
    timerInterval = setInterval(() => 
    {
        if(timerSeconds - 1 < 0)
        {
            timerSeconds = 59
            if(timerMinutes - 1 < 0)
            {
                clearInterval(timerInterval)
                timerHours = 0 
                timerMinutes = 0
                timerSeconds = 0
                container.style.animationName = 'ring-animation'
            }
            if(timerMinutes - 1 >= 0)
            {
                timerMinutes = timerMinutes - 1
            }
        }
        else
        {
            timerSeconds = timerSeconds - 1
        }
        digitalHoursDisplay.textContent = timerHours
        digitalMinutesDisplay.textContent = timerMinutes
        digitalSecondsDisplay.textContent = timerSeconds
        clockHoursDisplay.style.transform = `translateX(96px) rotateZ(${timerHours/12 * 360}deg)`
        clockMinutesDisplay.style.transform = `translateX(96px) rotateZ(${((5 - timerMinutes - timerSeconds/60)/5)* 360}deg)`
        clockSecondsDisplay.style.transform = `translateX(98px) rotateZ(${(60 - timerSeconds)/60 * 360}deg)`
    }, 1000);
}

const alarmFunction = () =>
{
    container.style.animationName = 'none'
    alarmSet.style.display = 'flex'
    for(const input of inputs)
    {
        input.addEventListener('input', (event) =>
        {
            container.style.animationName = 'none'
            if(input.classList.contains('hour-input'))
            {
                hourAlarm = input.value
                if(input.value > 24)
                {
                    input.value = 24
                }
                if(input.value < 0)
                {
                    input.value = 0
                }
            }
            if(input.classList.contains('minutes-input'))
            {
                minuteAlarm = input.value
                if(input.value > 60)
                {
                    input.value = 60
                }
                if(input.value < 0)
                {
                    input.value = 0
                }
            }
            if(input.classList.contains('seconds-input'))
            {
                secondAlarm = input.value
                if(input.value > 60)
                {
                    input.value = 60
                }
                if(input.value < 0)
                {
                    input.value = 0
                }
            }
        })
    }
}