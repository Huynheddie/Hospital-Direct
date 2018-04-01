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
		this.hospital;
	}
	constructor(p1) {
		this.id = id_p++;
		this.name = p1.name;
		this.dob = p1.dob;
		this.number = p1.number;
		this.address = p1.address;
		this.provider = p1.provider;
		this.insurance_num = p1.insurance_num;
		this.records[] = p1.records;
		this.hospital;
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
	receivePatient(p1) {
		Patient np = new Patient(p1);
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
	constructor(){
		this.allHospitals[];
		Hospital First = new Hospital("UCLA Medical Center", "310-825-9111", "757 Westwood Plaza, Los Angeles, CA 90095", "admin@ucla.edu", "ucla")
		this.allHospitals.push(First);
		Hospital Second = new Hospital("UCI Medical Center", "714-456-7890", "Pavilion 4, 101 The City Dr S, Orange, CA 92868", "admin@uci.edu", "uci")		
		this.allHospitals.push(Second);
	}
	createPatient(name, dob, number, address, provider, insurance_num, h_username){
		var h_index = findRecord(h_username);
		Patient p1 = new Patient(name, dob, number, address, provider, insurance_num);
		allHospitals[h_index].patients.push(p1);
	}
	createRecord(id, height, weight, bp, temp, notes, h_username, p_index) {
		var h_index = findRecord(h_username);
		Record r1 = new Record(id, height, weight, bp, temp, notes);
		allHospitals[h_index].patients[p_index].records.push(r1);
	}
	sendRecord(hospital_username, patient){
		var h_index = findRecord(h_username);
		allHospitals[h_index].receivePatient(patient);
	}
	findRecord(username) {
		var total_records = this.allHospitals.length;
		for (let i = 0; i < total_records; i++) {
			if (this.allHospitals[i].username === username) {
				return i;
			}
		}
	}
	findPatient(patientId, h_username){
		var h_index = findRecord(h_username);
		var total_records = this.allHospitals[h_index].patients.length;
		for (let i = 0; i < total_records; i++) {
			if (this.allHospitals[h_index].patients[i].id === patientId) {
				return i;
			}
		}
	}

}
