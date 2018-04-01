const SHA256 = require("crypto-js/sha256");
var id_p = 1000;
var id_h = 1;

class Patient {
	constructor(name, dob, number, address, provider, insurance_num) {
		id_p++;
		this.id = id_p;
		this.name = name;
		this.dob = dob;
		this.number = number;
		this.address = address;
		this.provider = provider;
		this.insurance_num = insurance_num;
		this.blockchain = [this.firstblock()];
		this.hospital;
	}
	copyConstructor(p1) {
		if(this.blockchain()){
			this.blockchain = p1.blockchain;
			id_p++;
		    this.id = id_p;
		    this.name = p1.name;
		    this.dob = p1.dob;
		    this.number = p1.number;
		    this.address = p1.address;
		    this.provider = p1.provider;
		    this.insurance_num = p1.insurance_num;
		}
		else
		{
			console.log("THE BLOCKCHAIN HAS BEEN BROKEN WHILE IN TRANSIT AND YOUR PRIVACY HAS BEEN COMPROMISED PLEASE NOTIFY THE PATIENT AT "+ this.allHospitals[h_index].patients[p_index].number);
			process.exit(55);
		}
		
		
		
		this.hospital;
	}

	firstblock(){
		var x = new Record("000", "000", "000", "000", "000");
		return new Block(x, "000");
	}

	getlastblock(){
		return this.blockchain[this.blockchain.length - 1];
	}

	addblock(record){
		//console.log(this.getlastblock().hash);
		var nb = new Block(record, this.getlastblock().hash);
		nb.hash = nb.calculatehash();
		this.blockchain.push(nb);
	}

	tamperNumber()
	{
	   this.blockchain[1].record.number = "+4444";
	}

	tamperNumberwithnewhash()
	{
		var rec = this.blockchain[1].record;
		rec.number = "*******";
		var nb = new Block(rec, this.getlastblock().hash);
		nb.hash =  nb.calculatehash();
		this.blockchain[1] = nb;
	}

	isblockchain(){
		if(this.blockchain.length === 0)
		{
			return true;
		}
		for(let i = 1; i<this.blockchain.length; i++)
		{
			const curr = this.blockchain[i];
			const prev = this.blockchain[i-1];
			if(curr.previous_hash !== prev.hash ){
				return false;
			}
			if(curr.hash !== curr.calculatehash()){
				return false;
			}
		}

		return true;
	}
}

class Hospital {
	constructor(name, number, address, username, password) {
		id_h++;
		this.id = id_h;
		this.name = name;
		this.number = number;
		this.address = address;
		this.username = username;
		this.password = password;
		this.patients = [];
	}
	receivePatient(p1) {
		var np = new Patient(p1);
		console.log(p1);
		this.patients.push(np);
	}
}

class Record {
	constructor(height, weight, bp, temp, notes) {
		this.height = height;
		this.weight = weight;
		this.bp = bp;
		this.temp = temp;
		this.notes = notes;
		this.date = Date().toString();
	}
}

class Block {
	constructor(record, previous_hash) {
		this.record = record;
		this.previous_hash = previous_hash;
		this.saftey =0;
		this.hash = this.calculatehash();
	}
	
	calculatehash(){
		return SHA256(JSON.stringify(this.record) + this.previous_hash ).toString();
	}
}

class System {
	constructor(h_username){
		this.h_username = h_username;
		this.allHospitals = [];
		var First = new Hospital("UCLA Medical Center", "310-825-9111", "757 Westwood Plaza, Los Angeles, CA 90095", "admin@ucla.edu", "ucla")
		this.allHospitals.push(First);
		var Second = new Hospital("UCI Medical Center", "714-456-7890", "Pavilion 4, 101 The City Dr S, Orange, CA 92868", "admin@uci.edu", "uci")		
		this.allHospitals.push(Second);
	}
	findRecord(username) {
		var total_records = this.allHospitals.length;
		for (let i = 0; i < total_records; i++) {
			if (this.allHospitals[i].username == username) {
				return i;
			}
		}
	}
	createPatient(name, dob, number, address, provider, insurance_num, h_username){
		var h_index = this.findRecord(h_username);
		var p1 = new Patient(name, dob, number, address, provider, insurance_num);
		this.allHospitals[h_index].patients.push(p1);
		return p1.id;
	}
	createRecord(id, height, weight, bp, temp, notes, h_username) {		
		var h_index = this.findRecord(h_username);
		var p_index = this.findPatient(id, h_username);
		var r1 = new Record(height, weight, bp, temp, notes);    //the record doesn't need ID, the ID is there to identify the patient
		this.allHospitals[h_index].patients[p_index].addblock(r1);
	}
	
	
	tamper(h_username, id, boool){
		var h_index = this.findRecord(h_username);
		var p_index = this.findPatient(id, h_username);
		if(boool){
			this.allHospitals[h_index].patients[p_index].tamperNumber();
		}
		else
		{
			this.allHospitals[h_index].patients[p_index].tamperNumberwithnewhash();
		}
	}

	sendRecord(recieveh_username, p_id, send_username){
		var p_index = this.findPatient(p_id, send_username);
		var h_index = this.findRecord(send_username);
		var recieveh_index = this.findRecord(recieveh_username);
		if(this.allHospitals[h_index].patients[p_index].isblockchain()){
		var p = new Patient(this.allHospitals[h_index].patients[p_index]);
		this.allHospitals[recieveh_index].receivePatient(p);
		}else{
			console.log("THE BLOCKCHAIN HAS BEEN BROKEN AND YOUR PRIVACY HAS BEEN COMPROMISED PLEASE NOTIFY THE PATIENT AT "+ this.allHospitals[h_index].patients[p_index].number);
			process.exit(55);
		}	
	}
	findPatient(patientId, h_username){
		//console.log(h_username);
		var h_index = this.findRecord(h_username);
		//console.log(h_index + "lllllllllllllllllllll");
		var total_records = this.allHospitals[h_index].patients.length;
		//console.log(this.allHospitals[h_index].patients.length);
		for (let i = 0; i < total_records; i++) {
			if (this.allHospitals[h_index].patients[i].id == patientId) {
				return i;
			}
		}
	}

}
var a = new System();
var xyz = a.createPatient("Eddie", "11-12-1998", "1234", "irvine", "kaiser", "43123123", "admin@ucla.edu");
a.createRecord("1001", "60", "130", "20/180","60","notes", "admin@ucla.edu");
a.createRecord("1001", "612222", "130", "20/180","60","hvjnmdfkhljcgfcjkglhhgkfjjfgkuhli;jogkufyjfkugi", "admin@ucla.edu");
//a.tamper("admin@ucla.edu", "1001", 1);  //Just tamper a record
//a.tamper("admin@ucla.edu", "1001", 0);  //tamper record with new keys/hashes
a.sendRecord("admin@uci.edu", "1001", "admin@ucla.edu")
console.log(a);