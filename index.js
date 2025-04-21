var truewallet = require('./apis/truewallet');

//ตัวอย่าง
truewallet.redeemvouchers(process.env.PHONE_NUMBER, 'โค้ด/ลิงก์')
.then(res => {
    console.log(res);
});

/*
ตัวอย่างการตอบกลับ
{ status: 'SUCCESS', amount: จำนวนเงินที่ได้รับ }
{ status: 'FAIL/ERROR', reason: เหตุผลที่ไม่สำเร็จ }
*/
