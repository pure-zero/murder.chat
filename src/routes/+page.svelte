<script lang="ts">
    import { onMount } from 'svelte';

    let text = '';
    let key = 0;
    let textArray = [
        'You walk into the room.  Male on the floor, 180cm ...maybe, dressed well, blood ... still fresh.'.split(''),
        'Four civllians litter the room, a small boy holding a doll, a sobbing mid 30s women, another women watching he and a younger man facing the wall'.split('')
    ];

    let i = 0;
    let textComplete = false;

    onMount(() => {
        populateText();
    });

    function populateText(){
        const interval = setInterval(() => {
            if (i < textArray[key].length) {
                text += textArray[key][i];
                i++;
            } else {
                textComplete = true;
                clearInterval(interval);
            }
        }, 100);
    }

    function onKeyDown(e:KeyboardEvent) {
        switch(e.key) {
            case " " :
                if (textComplete) {
                    if(key < textArray.length-1) {
                        key++;
                        text = "";
                        i = 0;
                        textComplete = false;
                        populateText();
                    }
                } else {
                    text = textArray[key].join("");
                    i = text.length;
                    textComplete = true;
                }

        }
    }
</script>

<div class="typewrite" style="color:white">
    {text}
</div>
<div class="rain-panel">
    {#each {length: 50} as _, i}
        <svg class="rain__drop" preserveAspectRatio="xMinYMin" viewBox="0 0 5 50" style="--x: {Math.random() * 100}; --y: {Math.random() * 100}; --o: {Math.random()}; --a: {Math.random()}; --d: {Math.random()}; --s: {Math.random()}">
            <path stroke="none" d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"></path>
        </svg>       
    {/each}
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<style>
    *
    *:before
    *:after {
        box-sizing: border-box;
    }

    /* The typing effect */
    @keyframes typing {
    from { width: 0 }
    to { width: 100% }
    }

    /* The typewriter cursor effect */
    @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: orange }
    }

    .typewrite {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 20%;
    }

    .rain-panel {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .rain__drop {
        animation-delay: calc(var(--d) * 1s);
        animation-duration: calc(var(--a) * 1s);
        animation-iteration-count: infinite;
        animation-name: drop;
        animation-timing-function: linear;
        height: 30px;
        left: calc(var(--x) * 1%);
        position: absolute;
        top: calc((var(--y) + 50) * -1px);
    }

    path {
        fill: #a1c6cc;
        opacity: var(--o);
        transform: scaleY(calc(var(--s) * 1.5));
    }

    @keyframes drop {
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(100vh);
        }
    }
</style>