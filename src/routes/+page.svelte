<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let text = '';
    let key = 0;
    let textArray = [
        'The threshold crunches under your boots as you enter.'.split(''),
        'A man, tall—perhaps 180cm—is down, dressed in clothes that once bespoke wealth, now marred by the still-fresh, crimson sheen of blood.'.split(''),
        'The room holds four other souls:'.split(''),
        'a small boy, silent, clutching his doll like a talisman.'.split(''),
        'A woman, mid-thirties, weeps openly, her grief a raw wound.'.split(''),
        'Another woman watches them, her expression unreadable, while a younger man stands rooted to the spot, his face pressed against the wall.'.split('')
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
                    } else {
                        goto('/room');
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

<svelte:window on:keydown|preventDefault={onKeyDown} />

<button class="skip-btn" style="top: auto; bottom: 2rem; right: 2rem;" on:click={() => goto('/room')}>SKIP</button>

<style>
    .skip-btn {
        opacity: 0.5;
        transition: opacity 0.2s;
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: transparent;
        color: white;
        border: 2px solid white;
        border-radius: 6px;
        padding: 0.5rem 1.5rem;
        font-size: 1.1rem;
        font-family: inherit;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        z-index: 10;
    }
    .skip-btn:hover, .skip-btn:focus {
        background: white;
        color: #222;
        outline: none;
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
</style>