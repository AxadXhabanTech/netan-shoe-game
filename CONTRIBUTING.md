# 🤝 Contributing to Sole Justice

Thank you for your interest in contributing to "Sole Justice" - the open source 3D political protest game! This document provides guidelines and information for contributors.

## 🚀 How to Participate

### **Step-by-Step Participation Process:**

1. **Fork the Repository**
   - Go to the main repository on GitHub
   - Click the "Fork" button to create your own copy
   - This allows you to work independently

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/netan-shoe-game.git
   cd netan-shoe-game
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Implement your feature or fix
   - Follow coding standards
   - Test your changes thoroughly

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Provide detailed description of your changes

7. **Wait for Review**
   - Maintainers will review your PR
   - Address any feedback or requested changes
   - Your PR will be approved or rejected

8. **Merged and Released**
   - **If approved**: Your changes are merged into the main repository
   - **New themed version**: Game is updated with your contributions
   - **Credit given**: You're acknowledged in release notes

### **Participation Flowchart:**
```
Fork Repository → Clone Fork → Create Branch → Make Changes → 
Push to Fork → Create PR → Review Process → Approved? → 
YES: Merge & Release New Version | NO: Address Feedback
```

### **Important Notes:**
- **All contributions go through Pull Requests** - no direct pushes to main
- **Your changes will be reviewed** before merging
- **Approved PRs create new game versions** with your features
- **You maintain ownership** of your fork and can continue developing
- **Each approved PR** contributes to the next themed release

## 🌍 Our Mission

We're building a digital form of peaceful protest through gaming, inspired by the legendary Bush shoe-throwing incident. Every contribution helps amplify the call for justice and gives voice to the voiceless.

## 🚀 How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title** describing the issue
- **Detailed description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **System information** (OS, browser, device)
- **Screenshots or videos** if applicable

### 💡 Suggesting Features

We welcome feature suggestions! When proposing new features:

- **Explain the problem** you're trying to solve
- **Describe your proposed solution**
- **Consider the impact** on the game's mission
- **Think about accessibility** and global reach

### 🔧 Code Contributions

#### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Basic knowledge of React and Three.js

#### Development Setup

**Option 1: Fork the Repository (Recommended for Contributors)**
1. **Fork the repository** on GitHub
   - Go to https://github.com/yourusername/netan-shoe-game
   - Click the "Fork" button in the top right
   - This creates your own copy of the repository

2. **Clone your forked repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/netan-shoe-game.git
   cd netan-shoe-game
   ```

3. **Add the original repository as upstream**
   ```bash
   git remote add upstream https://github.com/original-owner/netan-shoe-game.git
   ```

**Option 2: Direct Clone (For Core Maintainers)**
```bash
git clone https://github.com/yourusername/netan-shoe-game.git
cd netan-shoe-game
```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Keep your fork updated** (if using fork workflow)
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git push origin main
   ```

#### Coding Standards

- **Follow React best practices**
- **Use functional components** with hooks
- **Maintain consistent naming conventions**
- **Add comments** for complex logic
- **Write clean, readable code**
- **Test your changes** thoroughly

#### Commit Guidelines

Use conventional commit messages:

```
feat: add new enemy type
fix: resolve projectile collision bug
docs: update README with new features
style: improve UI button styling
refactor: optimize game physics engine
test: add unit tests for scoring system
```

#### Pull Request Process

1. **Ensure your code works** and doesn't break existing features
2. **Update documentation** if needed
3. **Add tests** for new functionality
4. **Create a descriptive PR title**
5. **Provide detailed description** of your changes
6. **Link related issues** if applicable
7. **Request reviews** from maintainers

#### Contribution Workflow

**For Contributors (Fork Workflow):**
1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** for your changes
4. **Make your changes** and commit them
5. **Push to your fork**
6. **Create a Pull Request** from your fork to the main repository
7. **Wait for review and approval**
8. **Your changes will be merged** into the main repository

**For Core Maintainers:**
1. **Clone the repository** directly
2. **Create a feature branch** for your changes
3. **Make your changes** and commit them
4. **Push directly** to the main repository
5. **Create a Pull Request** for review
6. **Merge after approval**

#### Release Process

When Pull Requests are approved and merged:
- **Changes are integrated** into the main codebase
- **New themed versions** of the game are released
- **Contributors are credited** in release notes
- **Game updates** are deployed to production

### 🎨 Design Contributions

We welcome design contributions:

- **3D Models**: Submit optimized models for weapons, enemies, environments
- **Textures**: Create high-quality textures and materials
- **UI/UX**: Design improvements for menus, HUD, and interfaces
- **Animations**: Create smooth animations and transitions
- **Sound Effects**: Submit game audio and music

### 🌐 Internationalization

Help make the game accessible globally:

- **Translate text** to different languages
- **Adapt cultural references** appropriately
- **Consider regional sensitivities**
- **Test on different devices** and browsers

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Game.js         # Main game logic
│   ├── UI.js           # User interface
│   ├── Menu.js         # Main menu
│   ├── PlayerWeapon.js # Player weapon
│   ├── Enemy.js        # Enemy AI
│   └── Projectile.js   # Projectile physics
├── App.js              # Main application
└── App.css             # Global styles
```

## 🎯 Development Priorities

### High Priority
- **Bug fixes** and performance improvements
- **Accessibility** enhancements
- **Mobile optimization**
- **Cross-browser compatibility**

### Medium Priority
- **New game mechanics**
- **Visual improvements**
- **Sound effects and music**
- **Multiplayer features**

### Low Priority
- **Advanced graphics effects**
- **Social features**
- **Analytics and tracking**

## 🤝 Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Welcome newcomers** and help them learn
- **Provide constructive feedback**
- **Respect different perspectives**
- **Focus on the mission** of digital justice

### Communication

- **Use clear, respectful language**
- **Ask questions** when unsure
- **Share knowledge** and help others
- **Celebrate contributions** and achievements

## 📋 Issue Labels

We use the following labels to organize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Improvements to docs
- `design` - UI/UX improvements
- `performance` - Performance improvements
- `internationalization` - Translation/localization

## 🏆 Recognition

Contributors will be recognized in:

- **README acknowledgments**
- **Contributors list**
- **Release notes**
- **Community highlights**

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Discord**: For real-time chat (coming soon)
- **Email**: For private matters

## 🙏 Thank You

Every contribution, no matter how small, helps advance our mission of digital justice. Thank you for being part of this movement!

---

**Together, we code for justice. Together, we make our voices heard.**
