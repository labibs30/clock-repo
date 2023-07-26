<template>
    <nav>
        <ul>
            <li><a href="/">clock</a></li>
            <li><a href="/timer">Timer</a></li>
            <li><a href="/alarm">Alarm</a></li>
            <li><a href="/pomodoro">Pomodoro</a></li>
        </ul>
    </nav>
</template>

<script>

export default {
    name:'Navbar',

}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
}
body{
    width: 100%;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: 'Roboto', sans-serif;
    background: #08070B;
}
 ul{
    list-style: none;
}

ul li{
    display: inline-block;
    margin: 10px 0;
}

ul li a{

    text-decoration: none;
    text-transform: uppercase;
    font-size: 18px;
    color: #fff;
    /* margin: 0 10px;  */
    padding: 10px ;
    position: relative;
}

ul li a::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: #24ff6d;
    z-index: -1;
    box-shadow: 0 0 10px #24ff6d,
                0 0 20px #24ff6d,
                0 0 40px #24ff6d,
                0 0 80px #24ff6d,
                0 0 100px #24ff6d;
    transition: 0.25s;
}
ul li a:hover::before{
    width: 100%;
}
</style>