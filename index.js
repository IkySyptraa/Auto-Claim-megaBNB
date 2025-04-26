const axios = require('axios');
require('dotenv').config();

let walletAddresses = process.env.WALLET_ADDRESSES.split(',');

const ambilFaucetMegaBNB = async (walletAddresses, jumlah = 1) => {
  for (let walletAddress of walletAddresses) {
    console.log(`Mengambil faucet untuk wallet ${walletAddress}...`);
    for (let i = 0; i < jumlah; i++) {
      try {
        let response = await axios.post(`https://mbscan.io/airdrop`, {
          address: walletAddress.trim(),
        });

        if (response.status === 200) {
          console.log(`Faucet MegaBNB ke-${i + 1} berhasil diambil untuk wallet ${walletAddress}!`);
          console.log(response.data);
        } else {
          console.log(`Gagal mengambil faucet MegaBNB ke-${i + 1} untuk wallet ${walletAddress}:`, response.status);
        }
      } catch (error) {
        console.log(`Error mengambil faucet MegaBNB ke-${i + 1} untuk wallet ${walletAddress}:`, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // delay 5 detik
    }
  }
};

ambilFaucetMegaBNB(walletAddresses, 100000);