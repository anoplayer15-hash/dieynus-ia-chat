# Dieynus IA - Chat avec DeepSeek R1

Une application web moderne pour converser avec l'IA DeepSeek R1, nommée **Dieynus IA**. Interface inspirée de ChatGPT avec un design élégant et responsive.

## 🌟 Fonctionnalités

- **Interface ChatGPT-like** - Design moderne et intuitif
- **Intégration DeepSeek R1** - Powered by DeepSeek R1 AI
- **Responsive** - Fonctionne sur desktop et mobile
- **Temps réel** - Conversations fluides avec indicateurs de chargement
- **Historique** - Maintien du contexte de conversation
- **Sécurisé** - Variables d'environnement pour les clés API

## 🚀 Installation et Démarrage Local

### Prérequis
- Node.js (version 18 ou supérieure)
- Clé API DeepSeek (obtenir sur [DeepSeek Platform](https://platform.deepseek.com))

### Installation
```bash
# Installer les dépendances
npm install

# Configurer la clé API
# Éditez le fichier .env et remplacez YOUR_DEEPSEEK_API_KEY_HERE par votre vraie clé API

# Démarrer le serveur
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📦 Déploiement sur Render

### Option 1: Déploiement automatique depuis GitHub

1. **Pousser le code sur GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - Dieynus IA Chat"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/dieynus-ia-chat.git
git push -u origin main
```

2. **Connecter à Render:**
   - Allez sur [render.com](https://render.com)
   - Cliquez sur "New" → "Web Service"
   - Connectez votre repository GitHub
   - Configurez:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment:** `Node`

3. **Configurer les variables d'environnement:**
   - Dans Render Dashboard → Environment
   - Ajoutez: `DEEPSEEK_API_KEY` = votre clé API DeepSeek

### Option 2: Déploiement direct

1. **Créer un nouveau Web Service sur Render**
2. **Télécharger les fichiers** directement ou connecter via Git
3. **Configuration:**
```
Build Command: npm install
Start Command: npm start
Environment: Node
```

### Variables d'environnement requises sur Render:
```
DEEPSEEK_API_KEY=votre_cle_api_deepseek_ici
NODE_ENV=production
```

## 📁 Structure du Projet

```
dieynus-ia-chat/
├── server.js              # Serveur Express.js
├── dieynus-package.json    # Dépendances Node.js
├── dieynus-index.html      # Interface utilisateur
├── dieynus-styles.css      # Styles CSS
├── dieynus-script.js       # JavaScript frontend
├── .env                    # Variables d'environnement
└── dieynus-README.md       # Documentation
```

## 🔧 Configuration

### Obtenir une clé API DeepSeek:
1. Allez sur [platform.deepseek.com](https://platform.deepseek.com)
2. Créez un compte
3. Générez une clé API
4. Ajoutez-la dans votre fichier `.env` ou dans les variables d'environnement Render

### Personnalisation:
- **Nom de l'IA:** Modifiez "Dieynus IA" dans `dieynus-index.html`
- **Couleurs:** Changez les gradients dans `dieynus-styles.css`
- **Comportement:** Modifiez le prompt système dans `server.js`

## 🛠️ Développement

```bash
# Mode développement avec auto-reload
npm run dev

# Tester l'API
curl http://localhost:3000/api/health
```

## 📱 Fonctionnalités de l'Interface

- **Chat en temps réel** - Messages instantanés
- **Auto-resize** - Le champ de saisie s'adapte au contenu
- **Indicateurs visuels** - Loading spinners et animations
- **Responsive design** - Optimisé mobile et desktop
- **Formatage intelligent** - Support du markdown et code
- **Historique persistant** - Maintien du contexte de conversation

## 🔒 Sécurité

- Variables d'environnement pour les clés API
- Validation des entrées utilisateur
- Protection CORS configurée
- Gestion d'erreurs robuste

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez que votre clé API DeepSeek est valide
2. Consultez les logs dans la console de votre navigateur
3. Vérifiez les variables d'environnement sur Render

## 🎨 Capture d'écran

L'interface ressemble à ChatGPT avec:
- Header violet avec logo robot
- Messages en bulles arrondies
- Zone de saisie moderne
- Animations fluides
- Design responsive

---

**Dieynus IA** - Votre assistant IA intelligent propulsé par DeepSeek R1 🤖