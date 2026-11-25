# 🍫 CHOCO CRAFT - Landing Page & Fulfillment System

โปรเจกต์เว็บไซต์ขายช็อกโกแลตแท่ง (2 SKUs) พร้อมระบบหลังบ้านสำหรับหยิบ แพ็ค และพิมพ์ใบปะหน้าพัสดุ เชื่อมต่อฐานข้อมูลด้วย Google Sheets

## โครงสร้างโปรเจกต์
- `index.html` - หน้า Landing Page สำหรับลูกค้าเลือกสินค้าและกรอกที่อยู่จัดส่ง
- `admin.html` - หน้าจัดการออเดอร์ (Picking List, อัปเดตสถานะแพ็คสินค้า, พิมพ์ใบจ่าหน้าพัสดุ)
- `images/` - โฟลเดอร์เก็บรูปภาพสินค้า (`dark-choc.jpg`, `milk-choc.jpg`)
- `Code.gs` - โค้ด Google Apps Script สำหรับเชื่อมต่อ Google Sheets

## วิธีติดตั้งและใช้งาน
1. สร้าง Google Sheet ชื่อแท็บ `Orders` และใส่หัวคอลัมน์ในแถวที่ 1 (`A1:I1`):
   `OrderID`, `Timestamp`, `CustomerName`, `Phone`, `Address`, `SKU1_DarkQty`, `SKU2_MilkQty`, `TotalPrice`, `Status`
2. นำโค้ดใน `Code.gs` ไปวางใน **Extensions > Apps Script** แล้ว Deploy เป็น **Web app** (เลือกสิทธิ์เข้าถึงเป็น **Anyone**)
3. คัดลอก Web App URL มาแทนที่ `YOUR_GOOGLE_SCRIPT_URL` ในไฟล์ `index.html` และ `admin.html`
4. อัปโหลดไฟล์ทั้งหมดขึ้น GitHub และเชื่อมต่อกับ Vercel เพื่อ Deploy
