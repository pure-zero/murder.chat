<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
	import ChatArea from '../../components/ChatArea.svelte';
    const chatbots = [
        {
            id: 'child',
            name: 'The Child',
            img: '/images/child.png',
            description: 'Doll in hand',
            messages: []
        },
        {
            id: 'wife',
            name: 'The Weeping Woman',
            img: '/images/wife.png',
            description: 'Seems to be the wife',
            messages: []
        },
        {
            id: 'woman',
            name: 'Silent Woman',
            img: '/images/woman.png',
            description: 'Unreadable',
            messages: []
        },
        {
            id: 'man',
            name: 'Man',
            img: '/images/irene.png',
            description: 'Incoonspicuous, but...',
            messages: []
        }
    ];

    let selectedBot: typeof chatbots[0] | null = null;
    let showElement = false;
    
    function selectBot(bot: typeof chatbots[0]) {
        selectedBot = bot;
    }

    onMount(() => {
        showElement = true;
    });
</script>

<style>
    .chatbot-list {
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin-top: 2rem;
    }
    .chatbot {
        cursor: pointer;
        text-align: center;
        border: 2px solid transparent;
        border-radius: 1rem;
        padding: 1rem;
        transition: border-color 0.2s;
    }
    .chatbot.selected {
        border-color: #0070f3;
        background: #f0f8ff;
    }
    .chatbot img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 0.5rem;
        border: 2px solid #ccc;
    }
    .chat-area {
        margin-top: 2rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        padding: 1rem;
        border: 1px solid #eee;
        border-radius: 1rem;
        background: #fafbfc;
    }
</style>

<h1>Select a Chatbot to Chat With</h1>
{#if showElement}
    <div transition:fade={{ duration: 1000, delay: 500 }} class="chatbot-list">
        {#each chatbots as bot}
            <button
                type="button"
                class="chatbot {selectedBot && selectedBot.id === bot.id ? 'selected' : ''}"
                on:click={() => selectBot(bot)}
                aria-label={`Chat with ${bot.name}`}
            >
                <img src={bot.img} alt={bot.name} />
                <div><strong>{bot.name}</strong></div>
                <div>{bot.description}</div>
            </button>
        {/each}
    </div>
{/if}

{#each chatbots as bot}
    <div class="chat-area" transition:fade hidden={!selectedBot || selectedBot.id !== bot.id}>
        <h2>Chatting with {bot.name}</h2>
        <ChatArea/>
    </div>
{/each}