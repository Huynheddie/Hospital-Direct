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
		this.records = [];
		this.hospital;
	}
	copyConstructor(p1) {
		id_p++;
		this.id = id_p;
		this.name = p1.name;
		this.dob = p1.dob;
		this.number = p1.number;
		this.address = p1.address;
		this.provider = p1.provider;
		this.insurance_num = p1.insurance_num;
		this.records = p1.records;
		this.hospital;
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
	constructor(id, height, weight, bp, temp, notes) {
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
		var r1 = new Record(id, height, weight, bp, temp, notes);
		this.allHospitals[h_index].patients[p_index].records.push(r1);
	}
	sendRecord(hospital_username, p_id){
		var receiving_index = this.findRecord(hospital_username);
		var h_index = this.findRecord(this.h_username);
		var p_index = this.findPatient(p_id, hospital_username);
		console.log(receiving_index, h_index, p_index);
		console.log(this.allHospitals);
		// this.allHospitals[receiving_index].receivePatient(this.allHospitals[h_index].patients[p_index]);
	}
	findPatient(patientId, h_username){
		var h_index = this.findRecord(h_username);
		var total_records = this.allHospitals[h_index].patients.length;
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
a.sendRecord("admin@uci.edu", xyz)
// console.log(JSON.stringify(a));