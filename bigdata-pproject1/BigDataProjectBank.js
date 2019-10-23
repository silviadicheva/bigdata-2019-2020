use bank


var bankDepartments = [
	{
		name: 'Department Consumers',
		positions: [
			{
				id: 0,
				name: 'Consumer Credit Analyst'
			},
			{
				id: 1,
				name: 'Consumer Finance Assistant Manager'
			},
			{
				id: 2,
				name: 'Consumer Loans Processor'
			}
		]
	},
	{
		name: 'Department Investments',
		positions: [
			{
				id: 0,
				name: 'Investment Accounting Analyst'
			},
			{
				id: 1,
				name: 'Investment Management Operations Analyst'
			},
			{
				id: 2,
				name: 'Investment Management Specialist'
			}
		]
	},
	{
		name: 'Department Businesses',
		positions: [
			{
				id: 0,
				name: 'Business Banking Officer'
			},
			{
				id: 1,
				name: 'Business Intelligence Manager'
			},
			{
				id: 2,
				name: 'Business Banking Loan Administration Manager'
			}
		]
	}
];

for (i = 0; i < 3; i++) {
	db.departments.insert(bankDepartments[i]);
}

var generateFname = function(){
  var collection = ['Kostadin','Silvia','Elena','Plamen','Aleksandar','Tihomir','Galin','Maria'];
  
  var index = Math.floor(Math.random() * 8);
  return collection[index];
}

var generateSname = function(){
  var collection = ['Ivanov','Dicheva','Petrov','Tenev','Georgieva','Dinkov'];
  
  var index = Math.floor(Math.random() * 6);
  return collection[index];
}

var generateLname = function(){
  var collection = ['Dichev','Dinkov','Georgiev','Tenev'];
  
  var index = Math.floor(Math.random() * 4);
  return collection[index];
}

var generateAddress = function(){
  var streets = ['Ivan Dimov','Ivan Vazov','Svoboda','Georgi Dimitrov'];
  
  var streetIndex = Math.floor(Math.random() * 4);
  
  var streetNumbers = ['52','53','54'];
  
  var index = Math.floor(Math.random() * 3);
  
  return streetNumbers[index] + ' ' + streets[streetIndex];
}

var generatePhone = function(collection){
  var phones = ['0892007847','0898746453','0893487654','0893487434','0899987654',
                '0893487686','0893498765','0893480932'];
  
  var index = Math.floor(Math.random() * 8);	
  return phones[index];
}

var generateMail = function(name){
  return name.toLowerCase() + '@gmail.com';
}

var fillEmployees = function(){
    var employee = {};
    var depIndex;
    var positionIndex;
	
	for (i = 0; i < 10; i++) {
        depIndex = Math.floor(Math.random() * 3);
        positionIndex = Math.floor(Math.random() * 3);
		employee.firstName = generateFname();
		employee.lastName = generateLname();
		employee.additionalName = generateSname();
        employee.address = generateAddress();
        employee.phone = generatePhone();
        employee.email = generateMail(employee.firstName + employee.lastName);
        employee.department = bankDepartments [depIndex].name;
        employee.position = bankDepartments[depIndex].positions[positionIndex].name;

		db.employees.insert(employee);
	}
}

fillEmployees();

var fillClients = function(){
    var client = {};
  
	for (i = 0; i < 10; i++) {
		client.firstName = generateFname();
		client.lastName = generateLname();
		client.surName = generateSname();
        client.address = generateAddress();
        client.phone = generatePhone();
        client.email = generateMail(client.firstName + client.lastName);

		db.clients.insert(client);
	}
}

fillClients();

var generateAccount = function(client){
	var accounts = [
		'BG89TZSS91553456857895', 'BG29DEFA94401234512345', 'BG55TSDB01234686559774',
		'BG65STPB95478232368231', 'BG86TTBB94009295684699', 'BG48STSA93001236583985',
		'BG30DOOU87441936123743', 'BG87ERTR98768416512378'];
	
	var amounts = [
		6709.99, 8765.76, 800.43, 76.54, 980.45, 123.00,
		58.59, 321.78];
	
	var currencies = ['BGN','USD','EUR'];
	var accountIndex;
	var amountIndex;
	var currencyIndex;
	var account = {};
	
			accountIndex = Math.floor(Math.random() * 8);
			amountIndex = Math.floor(Math.random() * 8);
			currencyIndex = Math.floor(Math.random() * 3)
			account = {
				account: accounts[accountIndex],
				amount: amounts[amountIndex],
				currency: currencies[currencyIndex]
			};
		db.clients.update(
			{_id: client._id},
			{$addToSet: {"accounts": account}}
		)
}


var fillAccounts = function(){
	var accountsNumber;
	var clients = db.clients.find().toArray();
	var clientsLength = clients.length;
	var client = [];
	
	for (i = 0; i < clientsLength; i++) {
		generateAccount(clients[i]);
	}
}

fillAccounts();

//Бизнес заявки част 1

//1)листинг на имената на всички отдели в банката
db.departments.find({},{name: 1})

//2
//Добавя salary to employees collection
var addSalaryToEmployees = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"salary": Math.floor(Math.random() * 5000) + 1200}});
	}
}
addSalaryToEmployees();

//Извиква employees с salaries
db.employees.find({},{fName: 1, lName: 1, salary: 1})

//3)Визуализира емейлите
var listEmployeesNewEmail = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		print(employees[i].firstName + ' ' + employees[i].lastName + ' : ' + employees[i].firstName.toLowerCase() + '.' + employees[i].lastName.toLowerCase() + '@bankoftomarow.bg');
	}
} 

listEmployeesNewEmail();

//4)Добавяне на години опит на служителите
var addWorkExpirience = function(){
	var employees = db.employees.find().toArray();
	
	for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"workExpirience": Math.floor(Math.random() * 15)}});
	}
}

addWorkExpirience();

var printEmployeesWithMoreThanFiveYearWorkEpirience = function(){
    var employees = db.employees.find({workExpirience: {$gt: 5}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees')
    }
}

printEmployeesWithMoreThanFiveYearWorkEpirience();

//5) всички служители чиито първи имена започват с буквата S
var getEmployeesStartingWithS = function () {
    var employees = db.employees.find({firstName: {$regex: /^S/}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not employees')
    }
};

getEmployeesStartingWithS();

//6)Добавяне на място на раждане на служителите

var addPlaceOfBirth = function(){
	var placesOfBirthCollection = ['Bulgaria', 'Turkmenistan', 'Iraq', 'Germany', 'Norway'];
	var employees = db.employees.find().toArray();
	var placeOfBirthindex;
	
	for (i = 0; i < employees.length; i++) {
		placeOfBirthindex = Math.floor(Math.random() * 5);
		db.employees.update({_id:employees[i]._id}, {$set: {"placeOfBirth": placesOfBirthCollection[placeOfBirthindex]}});
	}
}

addPlaceOfBirth();

var getImigrants = function () {
    var employees = db.employees.find({placeOfBirth: {$ne: 'Bulgaria'}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees')
    }
}

getImigrants();

//7
db.employees.find({
	$or: [
		{firstName: /I/i},
		{lastName: /I/i},
		{additionName: /I/i}
	]
})



//Бизнес заявки част 3


//4)всички служители които имат заплата в интервала 2000 – 3000
var employeesWithIInTheirName = function () {
    var employees = db.employees.find({$and: [{"salary": {$gte: 2000}}, {"salary": {$lte: 3000}}]}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees')
    }
}

employeesWithIInTheirName();