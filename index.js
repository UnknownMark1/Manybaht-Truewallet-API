const axios = require('axios');
const tls = require("tls");

tls.DEFAULT_MIN_VERSION = "TLSv1.3";

async function redeemvouchers(phone_number, voucher_code) {
    voucher_code = voucher_code.replace('https://gift.truemoney.com/campaign/?v=','');

    if (!/^[a-z0-9]*$/i.test(voucher_code)) {
        return { status: 'FAIL', reason: 'Voucher only allows English alphabets or numbers.' };
    }

    if (voucher_code.length <= 0) {
        return { status: 'FAIL', reason: 'Voucher code cannot be empty.' };
    }

    const data = {
        mobile: phone_number,
        voucher_hash: voucher_code
    };

    try {
        const response = await axios({
            method: 'post',
            url: `https://gift.truemoney.com/campaign/vouchers/${voucher_code}/redeem`,
            data: data,
            headers: { 'Content-Type': 'application/json' }
        });

        const resjson = response.data;

        if (resjson.status.code === 'SUCCESS') {
            return {
                status: 'SUCCESS',
                amount: parseInt(resjson.data.voucher.redeemed_amount_baht)
            };
        } else {
            return {
                status: 'FAIL',
                reason: resjson.status.message
            };
        }
    } catch (error) {
        return {
            status: 'FAIL',
            reason: error.response?.data?.status?.message || error.message || 'Unknown error'
        };
    }
}

// ตัวอย่างการเรียกใช้
redeemvouchers("0812345678", "https://gift.truemoney.com/campaign/?v=XXXXXX")
    .then(console.log)
    .catch(console.error);
