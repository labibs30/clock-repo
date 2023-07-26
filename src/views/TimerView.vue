<template>
  <Navbar/>
    <div class="digital-clocks">
        <div class="time">
            <span class="hour">{{displayDays}}</span>
            <span class="seconds">d</span> 
            <span class="dots">:</span>
            <span class="hour">{{displayHours}}</span>
            <span class="seconds">h</span> 
            <span class="dots">:</span>
            <span class="hour">{{displayMinutes}}</span>
            <span class="seconds">m</span> 
            <span class="dots">:</span>
            <span class="hour">{{displaySeconds}}</span>
            <span class="seconds">s</span> 

        </div>
        <h3>Setting Timer</h3>
        <form>
          <div class="form">
            <div class="nes-field">
               <input id="inputan"  type="number" placeholder="year ..." name="year" v-model="year" class="nes-input" min="2022" required>
            </div>
            <div class="nes-select job">
                <select name="job" v-model="month" id="inputan">
                    <option value="" disabled selected hidden>Select Month</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">Desember</option>
                </select>
            </div>
            <div class="nes-field">
               <input id="inputan" type="number" placeholder="Day ..." name="day" v-model="day" class="nes-input" max="31" min="00" required>
            </div>
          </div>
          <div class="form">
            <div class="nes-field">
               <input id="inputan" type="number" placeholder="Hour ..." name="hour" v-model="hour" class="nes-input" max="23" min="00" required>
            </div>
            <div class="nes-field">
               <input id="inputan" type="number" placeholder="Minute ..." name="minute" v-model="minute" class="nes-input" max="59" min="00" required>
            </div>
            <div class="nes-field">
               <input id="inputan"  type="number" placeholder="Second ..." name="second" v-model="second" class="nes-input" max="59" min="00" required>
            </div>
          </div>
        <button  type="text" @click="onClicked" id="button" class="nes-btn is-primary">Set Timer</button>
        </form>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"

export default {
    name:'AlarmView',
    components:{
        Navbar
    },
    data(){
      const today = new Date();
      const years = today.getFullYear();
      var audio = new Audio(require('@/assets/ringtone.mp3'))
        return{
            displayHours: 0,
            displayMinutes: 0,
            displaySeconds: 0,
            displayDays: 0,
            year:'',
            month:'',
            day:'',
            hour:'',
            minute:'',
            second:'',  
            minYear : years,
            audio:audio,
        }
    },
    computed:{
      _seconds : ()=>1000,
      _minutes(){
        return this._seconds * 60
      },
      _hours(){
        return this._minutes * 60
      },
      _days(){
        return this._hours * 24
      }
    },
    methods:{
        onClicked(){
          console.log(this.year, this.month, this.day, this.no);
          this.remainingTime();
          event.preventDefault();
        },
        remainingTime(){
            const timer = setInterval(()=>{
              const now = new Date();
                const end = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, 10);

                const distance = end.getTime() - now.getTime();
                if(distance < 0){
                  this.audio.play()
                  clearInterval(timer);
                  return;
                }
                const days = Math.floor(distance/this._days);
                const hours = Math.floor((distance % this._days)/this._hours);
                const minutes = Math.floor((distance % this._hours)/this._minutes);
                const seconds = Math.floor((distance % this._minutes)/this._seconds);

                this.displayMinutes = minutes < 10 ? "0"+minutes : minutes;
                this.displaySeconds = seconds < 10 ? "0"+seconds : seconds;
                this.displayHours = hours < 10 ? "0"+hours : hours;
                this.displayDays = days < 10 ? "0"+days : days;
            }, 1000)
            
        }
    },
    mounted(){
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2e2e44;
} */
.form{
  display: flex;

}
#button {
  margin-top: 4px;
  color: #db3eb1;
  border: 5px solid #fff;
  border-radius:5px;
  padding: 4px;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  font-weight: bold;
  filter: drop-shadow(0 0 15px #db3eb1) drop-shadow(0 0 50px #db3eb1) contrast(2) brightness(2);
  transition: .5s;
}

#button:hover {
  color: #fff;
  border: 5px solid #db3eb1;
  background-color: #db3eb1;
  filter: drop-shadow(0 0 20px #db3eb1) contrast(2) brightness(2);
}

#inputan{
  font-weight: bold;
  font-size: 18px;
  display: block;
  padding: 8px;
  margin: 4px ;
  width: 200px;
  border: 4px solid transparent;
  outline: none;
  border-radius: 7px;
  box-shadow: 0px 0px 25px 1px transparent;
  transition: box-shadow 0.4s linear,
              box-color 0.4s linear;
}
#inputan:focus{
  border-color: #0dded8;
  box-shadow: 0px 0px 20px 1px #0dded8;
}

.digital-clocks {
  position: relative;
  color: #fff;
  background: #2d2f41;
  width: 700px;
  padding: 20px 45px;
  box-shadow: 0 5px 25px rgba(14, 21, 37, 0.8);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.digital-clocks::before {
  content: "";
  position: absolute;
  background: linear-gradient(45deg, #24ff6d, #2f93f1, #ff5e9a);
  background-size: 200% 200%;
  top: -5px;
  left: -5px;
  bottom: -5px;
  right: -5px;
  z-index: -1;
  filter: blur(40px);
  animation: glowing 10s infinite;
}


@keyframes glowing {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
} */
/* .time {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.hour,
.dots {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  padding: 0 10px;
  line-height: 125px;
}

.hour{
  font-size: 5.5rem;
  width: 125px;
}
.dots {
  font-size: 5em;
  color: #929292;
}

.hour {
  background: -webkit-linear-gradient(90deg, #634dff, #5fd4ff);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}


.right-side {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 10px;
}

.seconds {
  font-size: 1.2em;
  font-weight: 500;
}
.seconds {
  transform: translateY(16px);
  background: -webkit-linear-gradient(90deg, #24ff6d, #2f93f1);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

</style>
  