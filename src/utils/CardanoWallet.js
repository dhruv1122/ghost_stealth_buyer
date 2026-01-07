/**
 * CardanoWallet.js - Real Cardano wallet integration
 * Handles wallet connections, balance fetching, and transaction utilities
 */

class CardanoWallet {
    constructor() {
      // Replace with your Blockfrost project ID
      this.blockfrostProjectId = '';
      this.blockfrostBaseUrl = 'https://cardano-mainnet.blockfrost.io/api/v0';
    }
  
    /**
     * Get real ADA balance for an address
     * @param {string} address - Cardano address
     * @returns {Promise<number>} Balance in ADA
     */
    async getBalance(address) {
      try {
        console.log(`📊 Fetching balance for address: ${address.slice(0, 20)}...`);
        
        // Try Blockfrost first
        const balance = await this.fetchBalanceBlockfrost(address);
        console.log(`✅ Balance fetched: ${balance} ADA`);
        return balance;
        
      } catch (error) {
        console.warn('⚠️ Blockfrost failed, trying Koios API...', error.message);
        
        try {
          // Fallback to Koios API
          const balance = await this.fetchBalanceKoios(address);
          console.log(`✅ Balance fetched via Koios: ${balance} ADA`);
          return balance;
          
        } catch (fallbackError) {
          console.error('❌ All balance fetch methods failed:', fallbackError);
          throw new Error('Unable to fetch wallet balance. Please check your internet connection.');
        }
      }
    }
  
    /**
     * Fetch balance using Blockfrost API
     * @param {string} address 
     * @returns {Promise<number>}
     */
    async fetchBalanceBlockfrost(address) {
      const response = await fetch(`${this.blockfrostBaseUrl}/addresses/${address}`, {
        headers: {
          'project_id': this.blockfrostProjectId
        }
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Blockfrost API error: ${error.message || response.statusText}`);
      }
  
      const data = await response.json();
      const lovelaceAmount = data.amount.find(asset => asset.unit === 'lovelace');
      
      if (!lovelaceAmount) {
        throw new Error('No ADA balance found in response');
      }
  
      return parseInt(lovelaceAmount.quantity) / 1000000; // Convert lovelace to ADA
    }
  
    /**
     * Fetch balance using Koios API (fallback)
     * @param {string} address 
     * @returns {Promise<number>}
     */
    async fetchBalanceKoios(address) {
      const response = await fetch('https://api.koios.rest/api/v0/address_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_addresses": [address]
        })
      });
  
      if (!response.ok) {
        throw new Error(`Koios API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      
      if (!data || !data[0] || !data[0].balance) {
        throw new Error('No balance data found in Koios response');
      }
  
      return parseInt(data[0].balance) / 1000000; // Convert lovelace to ADA
    }
  
    /**
     * Get UTXOs for an address
     * @param {string} address 
     * @returns {Promise<Array>}
     */
    async getUtxos(address) {
      try {
        const response = await fetch(`${this.blockfrostBaseUrl}/addresses/${address}/utxos`, {
          headers: {
            'project_id': this.blockfrostProjectId
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch UTXOs: ${response.statusText}`);
        }
  
        const utxos = await response.json();
        console.log(`📦 Fetched ${utxos.length} UTXOs for address`);
        return utxos;
  
      } catch (error) {
        console.error('❌ UTXO fetch failed:', error);
        return [];
      }
    }
  
    /**
     * Submit transaction to Cardano network
     * @param {string} txCbor - Transaction in CBOR format
     * @returns {Promise<string>} Transaction hash
     */
    async submitTransaction(txCbor) {
      try {
        console.log('📤 Submitting transaction to network...');
        
        const response = await fetch(`${this.blockfrostBaseUrl}/tx/submit`, {
          method: 'POST',
          headers: {
            'project_id': this.blockfrostProjectId,
            'Content-Type': 'application/cbor'
          },
          body: txCbor
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Transaction submission failed: ${error.message || response.statusText}`);
        }
  
        const result = await response.json();
        console.log(`✅ Transaction submitted successfully: ${result}`);
        return result;
  
      } catch (error) {
        console.error('❌ Transaction submission failed:', error);
        throw error;
      }
    }
  
    /**
     * Get current network parameters
     * @returns {Promise<Object>}
     */
    async getNetworkParameters() {
      try {
        const response = await fetch(`${this.blockfrostBaseUrl}/epochs/latest/parameters`, {
          headers: {
            'project_id': this.blockfrostProjectId
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch network parameters: ${response.statusText}`);
        }
  
        return await response.json();
  
      } catch (error) {
        console.error('❌ Failed to fetch network parameters:', error);
        
        // Return default parameters as fallback
        return {
          min_fee_a: 44,
          min_fee_b: 155381,
          max_tx_size: 16384,
          max_val_size: 5000,
          utxo_cost_per_word: 34482,
          min_utxo: 1000000 // 1 ADA in lovelace
        };
      }
    }
  
    /**
     * Calculate minimum transaction fee
     * @param {number} txSize - Transaction size in bytes
     * @returns {number} Fee in lovelace
     */
    calculateMinFee(txSize, networkParams = null) {
      const params = networkParams || {
        min_fee_a: 44,
        min_fee_b: 155381
      };
  
      return params.min_fee_a * txSize + params.min_fee_b;
    }
  
    /**
     * Format ADA amount for display
     * @param {number} lovelace - Amount in lovelace
     * @returns {string} Formatted ADA amount
     */
    formatADA(lovelace) {
      const ada = lovelace / 1000000;
      return `${ada.toFixed(6)} ADA`;
    }
  
    /**
     * Convert ADA to lovelace
     * @param {number} ada - Amount in ADA
     * @returns {number} Amount in lovelace
     */
    adaToLovelace(ada) {
      return Math.floor(ada * 1000000);
    }
  
    /**
     * Convert lovelace to ADA
     * @param {number} lovelace - Amount in lovelace
     * @returns {number} Amount in ADA
     */
    lovelaceToAda(lovelace) {
      return lovelace / 1000000;
    }
  
    /**
     * Validate Cardano address
     * @param {string} address 
     * @returns {boolean}
     */
    isValidAddress(address) {
      // Basic validation - should start with addr1 for mainnet
      return typeof address === 'string' && 
             address.length > 50 && 
             address.startsWith('addr1');
    }
  
    /**
     * Get transaction details
     * @param {string} txHash 
     * @returns {Promise<Object>}
     */
    async getTransaction(txHash) {
      try {
        const response = await fetch(`${this.blockfrostBaseUrl}/txs/${txHash}`, {
          headers: {
            'project_id': this.blockfrostProjectId
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch transaction: ${response.statusText}`);
        }
  
        return await response.json();
  
      } catch (error) {
        console.error('❌ Failed to fetch transaction:', error);
        throw error;
      }
    }
  }
  
  export default CardanoWallet;