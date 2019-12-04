use stu_1601321004


var generateCar = function(){
    var collection = ['Mercedes','BMW','Peugeot','Audi','VW'];
    
    var index = Math.floor(Math.random() * 5);
    return collection[index];
  }


  var generateModel = function(){
    var collection = ['7458884','4558984','8759898','4759994','8457484'];
    
    var index = Math.floor(Math.random() * 5);
    return collection[index];
  }



  var fillModels = function(){
    var car = {};
    var CarIndex;
    var ModelIndex;
	
	for (i = 0; i < 10; i++) {
        CarIndex = Math.floor(Math.random() * 5);
        ModelIndex = Math.floor(Math.random() * 5);
		car.NameCar = generateCar();
		car.ModelCar = generateModel();

		db.models.insert(model);
	}
}


fillModels();



var CarSeats = function () {
    var cars = db.cars.find().toArray();
    for (i = 0; i < cars.length; i++) {
		db.cars.update({_id:cars[i]._id}, {$set: {"seats": Math.floor(Math.random() * 15)}});
	}
}
CarSeats();




//3)

var generateStock = function(){
    var collection = ['Tomatoes,'Cucumbers', 'Bananas', 'Apples'];
    
    var index = Math.floor(Math.random() * 4);
    return collection[index];
  }


var generateStockType = function(){
    var collection = ['Vegetables','Fruits'];
    
    var index = Math.floor(Math.random() * 2);
    return collection[index];
  }


  var generateQuantityStock = function(){
    var collection = ['400','350','250','600','500'];
    
    var index = Math.floor(Math.random() * 5);
    return collection[index];
  }



 var fillStocks = function(){
    var stock = {};
    var StockIndex;
    var StockType;
    var QuantityStockIndex;
  
	for (i = 0; i < 10; i++) {
        StockIndex = Math.floor(Math.random() * 4);
        StockTypeIndex = Math.floor(Math.random() * 2);
        QuantityStockIndex = Math.floor(Math.random() * 5);
		cargo.Stock = generateStock();
        cargo.StockType = generateStockType();
        cargo.QuantityStock = generateQuantityStock();

		db.stocks.insert(stock);
	}
}



//4)
db.cargo.find().pretty()



//5)
var generateAdditionalType = function(){
    var collection =['fruits','vegetables','meat','milk','dairy'];
    var index = Math.floor(Math.random() * 5);
    return collection[index];
  }

  
