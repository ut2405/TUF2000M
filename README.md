# <TUF2000M CONVERT RAW DATA TO HUMAN READABLE DATA>
## Description
This is a full-stack project includes Node.js server and React web client, database located on MongoDB Cloud.
- A convinient way to get human readable value from a list of raw data (CURRENT SCOPE FIRST 100 REGISTRER ON MODBUS TABLE)
- Easy adding more MODBUS Register and cases.
  
## Cases can solve and description
1. LONG FORMAT:
This type includes 2 register number (NUMBER=2) {Example: Register 0021(Reg21:65480)- Register 0022(Reg22:65535)}
Convert logic: i) Convert Reg22 into binary (1111111111111111)
ii) Convert Reg21 into binary (1111111111001000)
iii) Combine Reg22 & Reg21:11111111111111111111111111001000
iv) Convert combine into long: 11111111111111111111111111001000 => -56
2. INTEGER FORMAT:
This type includes 1 register number (NUMBER=1) {Example: Register 0092(Reg92:806)}
Convert logic: i) Convert Reg92 into binary (0000001100100110)
ii) Take 8 low-bit from Reg92:00100110
iii) Convert 8 low-bit into inrteger:00100110 => 38
3. REAL4 FORTMAT:
This type includes 2 register number (NUMBER=2){Example: Register 0033(Reg33:15568)- Register 0034(Reg34:16611)}
Convert logic: i) Convert Reg34 into binary(0100000011100011)
ii) Convert Reg33 into binary(0011110011010000)
iii) Combine Reg34 & Reg33:01000000111000110011110011010000
iv) Convert combine into float(IEEE 754 floating point): 01000000111000110011110011010000 => 7.10117340087890625
4. BCD FORMAT(Special for date and time)
This type includes 3 register number(NUMBER=3){Example: Register 0053-0055(Reg53:6432 -Reg54:4386 -Reg55:5889)}
Convert logic: i) Convert each register into binary=> Reg53:0001100100100000 - Reg54:0001000100100010 - Reg55:0001011100000001
ii) Reg53 is for(MS) low bits first meaning 8 low bit for Hour, 8 high bits for Minus.
iii) Reg54 is for(DH) low bits first meaning 8 low bit for Sec, 8 high bits for Day.
iv) Reg55 is for(YM) low bits first meaning 8 low bit for Moth, 8 high bits for Year.
5. BIT FORMAT:
This type includes 1 register number(NUMBER=1){Example: Register 0072(Reg72:4)}
Convert logic: i) Convert Reg72 into binary(0000000000000100)
ii) Check index of bit 1 of Reg72 => bit2
iii) Find from the errors table Reg72 => poor received signal  
## Usage
Heroku deployed link: https://tuf2000m.herokuapp.com/ 
rawdt.txt can be dowload through this link: https://github.com/ut2405/TUF2000M/blob/main/rawdt.txt  
TO UPLOAD AND PARSE A SAMPLE *.txt
  1. Choose file
  2. Press Upload and wait for page refreshed.
  3. Press Parse to request parse data and save to DB.
  4. Press Fetch data to request full-package data parsed.
TO CLEAR RAW DATA ON DB
  1. Press Clean Raw dt
TO FETCH CURRENT DATA FROM DB
  1. Press Fetch Data
  
