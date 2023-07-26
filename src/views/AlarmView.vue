<template>
  <Navbar/>
    <div class="digital-clock">
        <!-- <i class="uil uil-ellipsis-v dot-menu-btn" id="active-menu"></i>
        <ul class="dot-menu" id="active-menu">
        <li class="menu-item" id="active-menu">
            <span class="clock-format-text" id="active-menu">24-hour format</span>
            <div class="format-switch-btn" data-format="12" id="active-menu"></div>
        </li>
        </ul> -->
        <div class="time">
            <span class="hours">{{displayHours}}</span>
            <span class="dots">:</span>
            <span class="minutes">{{displayMinutes}}</span>
            <div class="right-side">
                <span class="period">{{displayPeriod}}</span>
                <span class="seconds">{{displaySeconds}}</span>
            </div>
        </div>
        <form>
          <div class="form">
            <div class="nes-field">
               <input id="inputan" type="text" placeholder="Nama ..." name="nama" v-model="nama" class="m" required/>
            </div>
            <div class="nes-field">
               <input id="inputan" type="number" placeholder="Hour ..." name="hour" v-model="hour" class="h" max="23" min="00" required/>
            </div>

          </div>
          <div class="form" >
            <div class="nes-field">
               <input id="inputan" type="number" placeholder="Minute ..." name="minute" v-model="minute" class="m" max="59" min="00" required/>
            </div>
            <div>
                <select class="s" name="job" @change="onChange($event)"  id="inputan">
                    <option value="" disabled selected hidden>Select Song</option>
                    <option value="0">Domknowz - Chill</option>
                    <option value="1">Domknowz - Free</option>
                    <option value="2">Domknowz - Home</option>
                    <option value="3">Domknowz - Sad</option>
                    <option value="4">Domknowz - Slow</option>
                </select>
            </div>
          </div>
          <div class="form" style="display:flex; justify-content:center">
            <div class="day" >
              <div style="margin-bottom:10px">
                <label style="color:black;">Pilih Hari</label><br>
              </div>
              <input v-model="day" value="senin" type="checkbox" id="checkbox">
              <label for="checkbox"> senin </label>
              <input v-model="day" value="selasa" type="checkbox" id="checkbox">
              <label for="checkbox"> selasa </label>
              <input v-model="day" value="rabu" type="checkbox" id="checkbox">
              <label for="checkbox"> rabu </label>
              <input v-model="day" value="kamis" type="checkbox" id="checkbox">
              <label for="checkbox"> kamis </label>
              <input v-model="day" value="jumat" type="checkbox" id="checkbox">
              <label for="checkbox"> jumat </label><br>
              <input v-model="day" value="sabtu" type="checkbox" id="checkbox">
              <label for="checkbox"> sabtu </label>
              <input v-model="day" value="minggu" type="checkbox" id="checkbox">
              <label for="checkbox"> minggu </label>

            </div>
          </div>
        <button  type="text" @click.prevent="addAlarm" id="button" class="set">Set Alarm</button>
        </form>
        <div v-if="this.alarms.length > 0 ">

          <h3>Alarm List</h3>
          <div style="display:flex; justify-content:center">
            <select v-model="hari" id="inputan">
              <option disabled hidden value="">Please select one</option>
              <option value="semua">Semua</option>
              <option value="senin">Senin</option>
              <option value="selasa">Selasa</option>
              <option value="rabu">Rabu</option>
              <option value="kamis">Kamis</option>
              <option value="jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
              <option value="minggu">Minggu</option>
            </select>
          </div>
          <ul>
            <li v-for="(alarm, index) in displayAlarms" :key="alarm.id">
              <div class="box">
                <div style="display:flex;">
                  <div style=" margin-top:7px" class="toggle" @click="iSActive(alarm)" :class="{active : alarm.active}" id="active-menu"></div>
                  <div style="margin-top:2px; margin-left:10px" class="listBox">
                    <span class="seconds">{{alarm.hour}}</span>
                    <span class="seconds"> : </span>
                    <span class="seconds">{{alarm.minute}}</span>
                    <span class="seconds" style="margin-left:10px">{{alarm.nama}}</span>
                    <i class="uil uil-times-circle"></i>
                  </div>
                </div>

                <div style="display:flex;">
                  <button id="snooze" class="btn" @click="snoozeAlarm(alarm)" :disabled="!alarm.snoze ? '' : disabled">
                    <div class="snooze">
                      <i class="uil uil-bed"></i>
                    </div> 
                  </button>
                  <button class="btn">
                    <div class="edit-box" style="margin-left:5px">
                      <i class="uil uil-edit"></i>
                    </div> 
                  </button>
                  <button class="btn" @click="deleteAlarm(index)">
                    <div class="del-box" style="margin-left:5px">
                      <i class="uil uil-times-circle"></i>
                    </div>
                  </button>
              </div>
            </div>
            </li>
          </ul>
          <button  type="text" style="margin-top:15px" @click.prevent="clearAlarm"  id="button" class="set">Clear Alarm</button>

        </div> 
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
      var audio = new Audio(require('@/assets/ringtone.mp3'))
      var song = [
            {id:1, audio: new Audio(require('@/assets/' +"chill"+ ".mp3"))},
            {id:2, audio: new Audio(require('@/assets/' +"free"+ ".mp3"))},
            {id:3, audio: new Audio(require('@/assets/' +"home"+ ".mp3"))},
            {id:4, audio: new Audio(require('@/assets/' +"sad"+ ".mp3"))},
            {id:5, audio: new Audio(require('@/assets/' +"slow"+ ".mp3"))},
      ]
        return{
            onChange(e){
                console.log(e.target.value);
                this.audio = song[e.target.value].audio
            },
            alarms:[],
            displayHours: 0,
            displayMinutes: 0,
            displaySeconds: 0,
            displayPeriod: 0,
            isActive:false,
            minute:'',
            nama:'',
            hour:'',
            day:[],
            hari:""
        }
    },
    computed:{
      displayAlarms(){
        if(this.hari == "semua"){
          return this.alarms
        }
        return this.alarms.filter(alarm => {return alarm.day.includes(this.hari)});
      }
    },
    methods:{

        addAlarm(){
          if(this.hour >= 0 && this.hour < 24 && this.minute >=0 && this.minute < 60 && this.hour && this.minute){
            this.alarms.push({
              minute:this.minute,
              hour:this.hour,
              audio:this.audio,
              day:this.day,
              nama:this.nama,
              active : true,
              snoze:false
            })
          }
          this.hour = "";
          this.nama = "";
          this.minute = "";
          document.querySelector(".s").value = ""
          this.day = [];
          console.log(this.alarms);
        },
        iSActive(alarm){
          alarm.active = !alarm.active

          if(alarm.active == false){
              alarm.audio.pause();
              alarm.audio.currentTime = 0;
          }
        },
        deleteAlarm(index){
          this.alarms.map((alarm, idx) => {
            if(idx == index){
              alarm.audio.pause();
            }
          })
          this.alarms.splice(index, 1)
        },
        snoozeAlarm(alarm){
          alarm.minute = alarm.minute + 5;
          alarm.snoze = false;
          alarm.audio.pause();
          alarm.audio.currentTime = 0;
          console.log(alarm.minute);
        },
        clearAlarm(){
          this.alarms = [];
        },
        clock(){

            const timer = setInterval(()=>{
                var today = new Date();
                var hours = today.getHours();
                var minutes = today.getMinutes();
                var seconds = today.getSeconds();

                let period = "AM";
                this.displayHours = hours < 10 ? this.displayHours = "0"+ hours  : this.displayHours = hours;
                this.displayPeriod = hours >= 12 ? this.displayPeriod = "PM" : this.displayPeriod= period;
                this.displayMinutes = minutes < 10 ? this.displayMinutes = "0" + minutes: this.displayMinutes = minutes;
                this.displaySeconds = seconds < 10 ? this.displaySeconds = "0" + seconds: this.displaySeconds = seconds;

                this.alarms.map((alarm, index) =>{
                  if(alarm.hour === hours && alarm.minute === minutes && alarm.active == true){
                      alarm.audio.play();   
                      alarm.audio.loop = true;   
                      alarm.snoze = true;
                  }
                })

                console.log();
           }, 1000)
        }
    },
    mounted(){
      this.clock();

    }
}
</script>
<style>

.btn{
  outline:none;
  background: none;
  border: none;
}
.btn:hover{
  color: white;
}
.set{
    margin: 20px;
}
.day{
  background: white;
  font-size: 14px;
  color: #929292;
  font-weight: bold;
  padding: 8px;
  margin: 4px ;
  width: 200px;
  border: 4px solid transparent;
  outline: none;
  border-radius: 7px;

}
.snooze{
  
  background-color: #ffb960;
  padding-top: 3px;
  border-radius: 6px;
  height: 30px;
  width: 30px;
}
.box{
  margin-top: 10px;
  background-color: white;
  padding: 5px;
  width: 350px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
.del-box{

  background-color: #ff5e9a;
  padding-top: 3px;
  border-radius: 6px;
  height: 30px;
  width: 30px;
}
.del-box:hover{
  background-color: red;
}
.edit-box{
  background-color: #2f93f1;
  padding-top: 3px;
  border-radius: 6px;
  height: 30px;
  width: 30px;
}
.edit-box:hover{
  background-color: blue;
}
.toggle {
  width: 35px;
  height: 15px;
  background: #485470;
  border-radius: 75px;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1),
    inset -2px -2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle:before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  background: #ff5e9a;
  border-radius: 50%;
  box-shadow: 0 5px 25px #ff5e9a;
  transform: translateX(-10px);
  transition: 0.3s ease;
  transition-property: background, transform;
}

.toggle.active:before {
  background: #0bff8d;
  box-shadow: 0 5px 25px #0bff8d;
  transform: translateX(10px);
}

</style>

