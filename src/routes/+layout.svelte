<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<div class="rain-panel">
    {#each {length: 50} as _, i}
        <svg class="rain__drop" preserveAspectRatio="xMinYMin" viewBox="0 0 5 50" style="--x: {Math.random() * 100}; --y: {Math.random() * 100}; --o: {Math.random()}; --a: {Math.random()}; --d: {Math.random()}; --s: {Math.random()}">
            <path stroke="none" d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"></path>
        </svg>       
    {/each}
</div>

<style>
    *
    *:before
    *:after {
        box-sizing: border-box;
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