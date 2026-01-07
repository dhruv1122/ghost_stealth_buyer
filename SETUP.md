# 👻 Ghost Stealth Buyer - Setup Instructions

A real-time Cardano DEX trading bot with advanced stealth features to execute invisible token purchases.

## 🚀 Quick Start

### 1. Clone or Download Project

Create a new folder and add all the provided files:

```
ghost-stealth-buyer/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── utils/
│       ├── CardanoWallet.js
│       ├── DEXIntegration.js
│       └── StealthEngine.js
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Blockfrost API (Required)

1. Sign up at [blockfrost.io](https://blockfrost.io)
2. Create a new project for Cardano Mainnet
3. Copy your project ID
4. Open `src/utils/CardanoWallet.js`
5. Replace `'mainnetYOUR_BLOCKFROST_PROJECT_ID_HERE'` with your actual project ID:

```javascript
this.blockfrostProjectId = 'mainnet1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0';
```

### 4. Install Cardano Wallet

Install one of these browser extensions:
- **Nami**: [Chrome Store](https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo)
- **Eternl**: [Chrome Store](https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka)
- **Flint**: [Chrome Store](https://chrome.google.com/webstore/detail/flint-wallet/hnfanknocfeofbddgcijnmhnfnkdnaad)

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

### Basic Trading

1. **Connect Wallet**: Click on your preferred wallet (Nami, Eternl, Flint)
2. **Enter Token**: Type token symbol (e.g., HOSKY, SNEK, WRT)
3. **Set Amount**: Enter ADA amount to spend
4. **Choose DEX**: Select Minswap, SundaeSwap, or WingRiders
5. **Execute**: Click "Execute Stealth Buy"

### Advanced Stealth Settings

Click "Show Advanced Settings" to customize:

- **Min/Max Chunk Size**: Control trade size ranges
- **Min/Max Delay**: Set timing between trades
- **Mode**: Choose Stealth (hidden) or Aggressive (fast)

### Stealth Features

- **Smart Chunking**: Splits large orders into random smaller pieces
- **Random Timing**: Adds human-like delays between trades
- **Pattern Avoidance**: Prevents algorithmic detection
- **Multi-DEX Support**: Distributes trades across platforms

## ⚙️ Configuration

### Network Settings

The app is configured for Cardano Mainnet. To use testnet:

1. Change Blockfrost URL to testnet
2. Update project ID to testnet version
3. Switch wallet to testnet mode

### DEX Integration Status

| DEX | Status | Features |
|-----|---------|----------|
| Minswap | ✅ Ready | Pool detection, price calculation |
| SundaeSwap | 🚧 Development | Basic integration |
| WingRiders | 🚧 Development | Basic integration |

## 🔧 Development

### Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # React entry point
├── index.css            # Global styles
└── utils/
    ├── CardanoWallet.js  # Wallet connection & balance
    ├── DEXIntegration.js # DEX trading logic
    └── StealthEngine.js  # Stealth algorithms
```

### Key Components

- **CardanoWallet**: Handles wallet connections and balance fetching
- **DEXIntegration**: Manages swaps across different DEXs
- **StealthEngine**: Implements anti-detection algorithms

### Adding New DEXs

1. Add swap function in `DEXIntegration.js`
2. Update DEX selector in `App.jsx`
3. Add pool detection logic
4. Implement transaction building

### Customizing Stealth Logic

Edit `StealthEngine.js` to modify:
- Chunk size algorithms
- Timing patterns
- Anti-detection measures

## 🛡️ Security

### Wallet Security

- Private keys never leave your browser
- App only requests transaction signing
- No seed phrases stored or transmitted

### API Security

- Blockfrost API key is safe to use client-side
- Only read operations for balance/UTXOs
- No sensitive data in requests

### Trading Security

- All transactions require wallet confirmation
- Slippage protection built-in
- Execution limits prevent large losses

## 🐛 Troubleshooting

### Common Issues

**Wallet won't connect:**
- Ensure wallet extension is installed and unlocked
- Try refreshing the page
- Check if wallet is on correct network (mainnet)

**Balance not showing:**
- Verify Blockfrost API key is correct
- Check internet connection
- Try different wallet address

**Trades failing:**
- Ensure sufficient ADA balance
- Check if token exists on selected DEX
- Reduce trade size if liquidity is low

**App won't start:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Debug Mode

Enable console logging by opening browser DevTools (F12) and checking the Console tab. All trading activities are logged there.

## 📊 Performance

### Optimization Tips

- **Chunk Size**: Smaller chunks = more stealth, larger chunks = faster execution
- **Delays**: Longer delays = better stealth, shorter delays = faster completion
- **DEX Selection**: Choose based on liquidity and fees

### Monitoring

The app provides real-time feedback on:
- Execution progress
- Transaction status
- Stealth effectiveness
- Network conditions

## 🔄 Updates

### Staying Updated

Check for updates to:
- DEX APIs and endpoints
- Cardano network parameters
- New wallet integrations
- Security improvements

### Version History

- **v1.0.0**: Initial release with basic stealth trading
- **v1.1.0**: Added advanced chunking algorithms
- **v1.2.0**: Multi-DEX support
- **v2.0.0**: Real-time integration with live trading

## 🆘 Support

### Getting Help

1. Check this README first
2. Look at browser console for error messages
3. Verify all setup steps completed
4. Check wallet and API configurations

### Known Limitations

- Currently simulation mode for safety
- Limited to major Cardano tokens
- Requires browser extension wallets
- No mobile app support yet

### Future Features

- [ ] Mobile wallet support
- [ ] Advanced order types
- [ ] Portfolio tracking
- [ ] Automated strategies
- [ ] Multi-chain support

---

## ⚠️ Disclaimer

This software is for educational and research purposes. Always:
- Test with small amounts first
- Understand the risks of DeFi trading
- Keep your seed phrases secure
- Use at your own risk

**Remember**: Past performance doesn't guarantee future results. Cryptocurrency trading involves substantial risk.