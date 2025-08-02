<script lang="ts">
    let { id } = $props();
    let messages: Messages = $state([])
    let input = $state('');
    let loading = $state(false);

    async function sendMessage() {
        if (!input.trim()) return;
        messages = [...messages, { role: 'user', content: input }];
        input = '';
        loading = true;

        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({messages, id})
        });

        if (response.ok) {
            const data = await response.json();
            messages = [...messages, { role: 'assistant', content: data.reply }];
        } else {
            messages = [...messages, { role: 'assistant', content: 'Error: Failed to get response.' }];
        }
        loading = false;
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<style>
    .chat-area {
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 1rem;
        background: #fafafa;
        min-height: 400px;
        display: flex;
        flex-direction: column;
    }
    .messages {
        flex: 1;
        overflow-y: auto;
        margin-bottom: 1rem;
    }
    .message {
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border-radius: 6px;
        max-width: 80%;
        word-break: break-word;
    }
    .user {
        align-self: flex-end;
        background: #d1e7dd;
    }
    .assistant {
        align-self: flex-start;
        background: #f8d7da;
    }
    .input-area {
        display: flex;
        gap: 0.5rem;
    }
    textarea {
        flex: 1;
        resize: none;
        border-radius: 6px;
        border: 1px solid #ccc;
        padding: 0.5rem;
    }
    button {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        background: #007bff;
        color: white;
        cursor: pointer;
    }
    button:disabled {
        background: #aaa;
        cursor: not-allowed;
    }
</style>

<div class="chat-area">
    <div class="messages">
        {#each messages as msg}
            <div class="message {msg.role}">
                <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
            </div>
        {/each}
        {#if loading}
            <div class="message assistant"><em>Assistant is typing...</em></div>
        {/if}
    </div>
    <form class="input-area" onsubmit={sendMessage}>
        <textarea
            bind:value={input}
            rows="2"
            placeholder="Type your message..."
            onkeydown={handleKeydown}
            disabled={loading}
        ></textarea>
        <button type="submit" disabled={loading || !input.trim()}>Send</button>
    </form>
</div>