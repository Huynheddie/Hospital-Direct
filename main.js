var id_p = 1000;
var id_h = 1;

class Patient {
	constructor(name, dob, number, address, provider, insurance_num) {
		this.id = id_p++;
		this.name = name;
		this.dob = dob;
		this.number = number;
		this.address = address;
		this.provider = provider;
		this.insurance_num = insurance_num;
		this.records[];
		this.hospitals[];
	}
}

class Hospital {
	constructor(name, number, address, username, password) {
		this.id = id_h++;
		this.name = name;
		this.number = number;
		this.address = address;
		this.username = username;
		this.password = password;
		this.patients[];
	}
}

class Record {
	constructor(id, height, weight, bp, temp, notes, date) {
		this.id = id;
		this.height = height;
		this.weight = weight;
		this.bp = bp;
		this.temp = temp;
		this.notes = notes;
		this.date = Date().toString();
	}
}

class Transaction {
	constructor(receiver, sender, patient, previous_hash) {
		this.receiver = receiver;
		this.sender = sender;
		this.patient = patient;
		this.hash = '';
	}
}

