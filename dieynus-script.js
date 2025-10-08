// Variables globales
let conversation = [];
let isLoading = false;

// Éléments DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messagesContainer');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    messageInput.focus();
    updateSendButton();
    
    // Auto-resize du textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        updateSendButton();
    });
});

// Gestion des touches
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        if (event.shiftKey) {
            // Shift+Enter = nouvelle ligne
            return;
        } else {
            // Enter seul = envoyer le message
            event.preventDefault();
            sendMessage();
        }
    }
}

// Mise à jour de l'état du bouton d'envoi
function updateSendButton() {
    const hasText = messageInput.value.trim().length > 0;
    sendButton.disabled = !hasText || isLoading;
}

// Fonction pour envoyer un message
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message || isLoading) return;
    
    // Ajouter le message de l'utilisateur à l'interface
    addMessage(message, 'user');
    
    // Ajouter le message à la conversation
    conversation.push({
        role: 'user',
        content: message
    });
    
    // Vider et réinitialiser l'input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    updateSendButton();
    
    // Afficher le loading
    showLoading();
    
    try {
        // Appel à l'API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                conversation: conversation.slice(0, -1) // Exclure le dernier message qu'on vient d'ajouter
            })
        });
        
        const data = await response.json();
        
        // Cacher le loading
        hideLoading();
        
        if (data.response) {
            // Ajouter la réponse de l'IA
            addMessage(data.response, 'ai');
            
            // Ajouter la réponse à la conversation
            conversation.push({
                role: 'assistant',
                content: data.response
            });
            
            // Afficher un avertissement si l'API n'est pas disponible
            if (!data.success) {
                console.warn('API non disponible:', data.error);
            }
        } else {
            throw new Error('Pas de réponse reçue');
        }
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        hideLoading();
        addMessage('Désolé, je rencontre des difficultés techniques. Veuillez réessayer.', 'ai', true);
    }
}

// Fonction pour ajouter un message à l'interface
function addMessage(content, sender, isError = false) {
    // Supprimer le message de bienvenue s'il existe encore
    const welcomeMessage = messagesContainer.querySelector('.welcome-message');
    if (welcomeMessage && conversation.length > 0) {
        welcomeMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    let avatarHtml = '';
    if (sender === 'user') {
        avatarHtml = '<div class="user-avatar"><i class="fas fa-user"></i></div>';
    } else {
        avatarHtml = '<div class="ai-message-avatar"><i class="fas fa-robot"></i></div>';
    }
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-bubble">${escapeHtml(content)}</div>
            ${avatarHtml}
        `;
    } else {
        messageDiv.innerHTML = `
            ${avatarHtml}
            <div class="message-bubble ${isError ? 'error' : ''}">${formatAIResponse(content)}</div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Fonction pour formatter la réponse de l'IA
function formatAIResponse(content) {
    // Remplacer les retours à la ligne par des <br>
    let formatted = escapeHtml(content).replace(/\n/g, '<br>');
    
    // Formatter le code inline
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Formatter les blocs de code
    formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Formatter les liens
    formatted = formatted.replace(/https?:\/\/[^\s<>]+/g, '<a href="$&" target="_blank" rel="noopener">$&</a>');
    
    return formatted;
}

// Fonction pour échapper le HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Fonction pour faire défiler vers le bas
function scrollToBottom() {
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// Fonctions de loading
function showLoading() {
    isLoading = true;
    loadingOverlay.classList.add('show');
    updateSendButton();
}

function hideLoading() {
    isLoading = false;
    loadingOverlay.classList.remove('show');
    updateSendButton();
}

// Fonction pour effacer le chat
function clearChat() {
    if (confirm('Êtes-vous sûr de vouloir effacer toute la conversation ?')) {
        conversation = [];
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="ai-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <h2>Bienvenue sur Dieynus IA ! 👋</h2>
                    <p>Je suis votre assistant IA intelligent basé sur DeepSeek R1. Je peux vous aider avec :</p>
                    <ul>
                        <li>🖥️ Programmation et développement</li>
                        <li>📚 Questions générales et apprentissage</li>
                        <li>🧮 Mathématiques et calculs</li>
                        <li>🎨 Créativité et écriture</li>
                        <li>🔬 Sciences et recherche</li>
                        <li>💡 Conseils et solutions</li>
                    </ul>
                    <p>Posez-moi n'importe quelle question pour commencer !</p>
                </div>
            </div>
        `;
        messageInput.focus();
    }
}

// Gestion des erreurs globales
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
});

// Vérification périodique de la connexion
setInterval(async () => {
    try {
        const response = await fetch('/api/health');
        if (!response.ok) {
            console.warn('Serveur non disponible');
        }
    } catch (error) {
        console.warn('Vérification de santé échouée:', error);
    }
}, 60000); // Vérification toutes les minutes